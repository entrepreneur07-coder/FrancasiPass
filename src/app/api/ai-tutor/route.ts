import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getChatCompletion } from '@/lib/openai/client'
import { AI_TUTOR_SYSTEM_PROMPT } from '@/lib/openai/prompts'

export async function POST(request: Request) {
  try {
    const { messages, conversation_id } = await request.json()
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const fullMessages = [
      { role: 'system', content: AI_TUTOR_SYSTEM_PROMPT },
      ...messages
    ]

    const response = await getChatCompletion(fullMessages)
    const aiMessage = response.choices[0].message

    // Update or create conversation in DB
    if (conversation_id) {
      const { error: updateError } = await supabase.from('ai_tutor_conversations').update({
        messages: [...messages, aiMessage],
        updated_at: new Date().toISOString()
      }).eq('id', conversation_id)
      
      if (updateError) console.error('Error updating conversation:', updateError)
    } else {
      const { error: insertError } = await supabase.from('ai_tutor_conversations').insert({
        user_id: user.id,
        messages: [...messages, aiMessage],
        context_type: 'general_practice'
      })

      if (insertError) console.error('Error inserting conversation:', insertError)
    }

    return NextResponse.json({ message: aiMessage })
  } catch (error: any) {
    console.error('AI Tutor POST Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('ai_tutor_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ conversations: data })
  } catch (error: any) {
    console.error('AI Tutor GET Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

