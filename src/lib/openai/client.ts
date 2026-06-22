import OpenAI from 'openai'
import { WRITING_EVALUATION_SYSTEM_PROMPT, SPEAKING_EVALUATION_SYSTEM_PROMPT } from './prompts'

function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    // Return a mock client during build/SSR when API key isn't available
    return new OpenAI({ apiKey: 'sk-dummy-build-key' })
  }
  return new OpenAI({ apiKey })
}

export async function getChatCompletion(messages: any[]) {
  const openai = getOpenAI()
  return await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
  })
}

export async function evaluateWriting(submission: string, prompt: string) {
  const openai = getOpenAI()
  const userPrompt = `Prompt: ${prompt}\n\nSubmission: ${submission}`

  return await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: WRITING_EVALUATION_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    response_format: { type: 'json_object' }
  })
}

export async function evaluateSpeaking(transcript: string, prompt: string) {
  const openai = getOpenAI()
  const userPrompt = `Prompt: ${prompt}\n\nTranscript: ${transcript}`

  return await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SPEAKING_EVALUATION_SYSTEM_PROMPT },
      { role: 'user', content: userPrompt }
    ],
    response_format: { type: 'json_object' }
  })
}
