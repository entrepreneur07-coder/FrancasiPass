import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  // Get subscription status
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status, price_id')
    .eq('user_id', user.id)
    .in('status', ['active', 'trialing'])
    .maybeSingle()

  return NextResponse.json({ 
    user: {
      ...user,
      is_premium: !!subscription,
      subscription_status: subscription?.status || null,
      price_id: subscription?.price_id || null
    } 
  })
}
