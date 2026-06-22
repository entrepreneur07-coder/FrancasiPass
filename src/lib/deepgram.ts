/**
 * Deepgram speech-to-text integration for FrancaisPass speaking module.
 * Uses Deepgram's REST API for transcribing French speech audio.
 * 
 * To enable: set DEEPGRAM_API_KEY in .env.local
 * Sign up at https://deepgram.com
 */

const DEEPGRAM_API_URL = 'https://api.deepgram.com/v1/listen'

export async function transcribeAudio(audioUrl: string): Promise<string> {
  const apiKey = process.env.DEEPGRAM_API_KEY

  if (!apiKey) {
    console.warn('DEEPGRAM_API_KEY not set — returning mock transcription')
    return '[Transcription unavailable: Deepgram API key not configured]'
  }

  const response = await fetch(DEEPGRAM_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: audioUrl,
      model: 'nova-2',
      language: 'fr',
      smart_format: true,
    }),
  })

  if (!response.ok) {
    throw new Error(`Deepgram API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.results?.channels?.[0]?.alternatives?.[0]?.transcript || ''
}

export async function transcribeAudioBuffer(audioBuffer: ArrayBuffer): Promise<string> {
  const apiKey = process.env.DEEPGRAM_API_KEY

  if (!apiKey) {
    console.warn('DEEPGRAM_API_KEY not set — returning mock transcription')
    return '[Transcription unavailable: Deepgram API key not configured]'
  }

  const response = await fetch(`${DEEPGRAM_API_URL}?model=nova-2&language=fr&smart_format=true`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'audio/webm',
    },
    body: audioBuffer,
  })

  if (!response.ok) {
    throw new Error(`Deepgram API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.results?.channels?.[0]?.alternatives?.[0]?.transcript || ''
}