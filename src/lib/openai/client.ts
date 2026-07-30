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
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey === 'sk-dummy') {
    return {
      choices: [{
        message: {
          content: JSON.stringify({
            grammar_score: 8,
            coherence_score: 8,
            vocabulary_score: 8,
            task_response_score: 8,
            feedback: "Ceci est un feedback généré automatiquement (mode démo). Votre texte est bien structuré et répond aux attentes.",
            overall_clb: 8
          })
        }
      }]
    } as any
  }

  const openai = getOpenAI()
  const userPrompt = `Prompt: ${prompt}\n\nSubmission: ${submission}`

  try {
    return await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: WRITING_EVALUATION_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    })
  } catch (error) {
    console.error('OpenAI Writing Evaluation Error:', error)
    return {
      choices: [{
        message: {
          content: JSON.stringify({
            grammar_score: 0,
            coherence_score: 0,
            vocabulary_score: 0,
            task_response_score: 0,
            feedback: "Erreur lors de l'évaluation automatique. Veuillez réessayer plus tard.",
            overall_clb: 0
          })
        }
      }]
    } as any
  }
}

export async function evaluateSpeaking(transcript: string, prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey === 'sk-dummy') {
    return {
      choices: [{
        message: {
          content: JSON.stringify({
            pronunciation_score: 8,
            fluency_score: 8,
            grammar_score: 8,
            vocabulary_score: 8,
            feedback: "Ceci est un feedback généré automatiquement (mode démo). Votre expression est fluide et claire.",
            overall_clb: 8
          })
        }
      }]
    } as any
  }

  const openai = getOpenAI()
  const userPrompt = `Prompt: ${prompt}\n\nTranscript: ${transcript}`

  try {
    return await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SPEAKING_EVALUATION_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    })
  } catch (error) {
    console.error('OpenAI Speaking Evaluation Error:', error)
    return {
      choices: [{
        message: {
          content: JSON.stringify({
            pronunciation_score: 0,
            fluency_score: 0,
            grammar_score: 0,
            vocabulary_score: 0,
            feedback: "Erreur lors de l'évaluation automatique. Veuillez réessayer plus tard.",
            overall_clb: 0
          })
        }
      }]
    } as any
  }
}
