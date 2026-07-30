/**
 * Generate native French audio for all listening test questions using OpenAI TTS.
 * 
 * Usage:
 *   1. Set OPENAI_API_KEY in .env.local
 *   2. Run: npx tsx scripts/generate-listening-audio.ts
 * 
 * Outputs MP3 files to public/audio/listening/ and generates an SQL file
 * to update audio_url in the database.
 */

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yqeyxmpuftcaujsuyyyj.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY is required. Set it in .env.local')
  process.exit(1)
}

// TEF-appropriate French voices from OpenAI
// Options: alloy, echo, fable, onyx, nova, shimmer
const TTS_VOICE = 'nova' // Warm, natural female voice — good for listening exams
const TTS_MODEL = 'tts-1' // or 'tts-1-hd' for higher quality (costs more)

async function generateAudio(text: string, filename: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: TTS_MODEL,
      voice: TTS_VOICE,
      input: text,
      speed: 0.95, // Slightly slower for exam clarity
      response_format: 'mp3',
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI TTS failed: ${response.statusText}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  const outputPath = path.join('public', 'audio', 'listening', filename)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, buffer)
  
  console.log(`  ✅ Generated: ${filename}`)
  return `/audio/listening/${filename}`
}

async function main() {
  console.log('🎧 Generating native French listening audio...\n')
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  
  // Fetch all listening test questions that don't have audio yet
  const { data: questions, error } = await supabase
    .from('test_questions')
    .select(`
      id,
      question_text,
      audio_url,
      test_id,
      mock_tests!inner(module, exam_type)
    `)
    .eq('mock_tests.module', 'listening')
    .eq('mock_tests.exam_type', 'tef')
    .is('audio_url', null)

  if (error) {
    console.error('Failed to fetch questions:', error.message)
    console.log('Continuing with local seed files...')
    return
  }

  if (!questions || questions.length === 0) {
    console.log('No questions need audio generation. All listening questions have audio_url set.')
    return
  }

  console.log(`Found ${questions.length} listening questions without audio.\n`)

  const updates: { id: string; audio_url: string }[] = []

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i]
    // Extract the script text (before "Question :")
    const scriptMatch = q.question_text.match(/^([\s\S]*?)(?:Question\s*:)/i)
    const scriptText = scriptMatch ? scriptMatch[1].trim() : q.question_text
    
    console.log(`[${i + 1}/${questions.length}] ${scriptText.substring(0, 60)}...`)
    
    try {
      const filename = `tef_listening_${q.test_id.substring(0, 8)}_q${i}.mp3`
      const audioUrl = await generateAudio(scriptText, filename)
      updates.push({ id: q.id, audio_url: audioUrl })
    } catch (err: any) {
      console.error(`  ❌ Failed: ${err.message}`)
    }
  }

  // Generate SQL update file
  if (updates.length > 0) {
    const sql = updates.map(u => 
      `UPDATE public.test_questions SET audio_url = '${u.audio_url}' WHERE id = '${u.id}';`
    ).join('\n')
    
    fs.writeFileSync('seed/update_audio_urls.sql', 
      `-- Run this in Supabase SQL Editor to update audio URLs\n${sql}\n`
    )
    
    console.log(`\n📝 Generated seed/update_audio_urls.sql with ${updates.length} updates`)
    console.log('Run this in Supabase SQL Editor to link the audio files.')
  }

  console.log('\n✅ Audio generation complete!')
  console.log('Files are in public/audio/listening/ — deploy them with your site.')
}

main().catch(console.error)
