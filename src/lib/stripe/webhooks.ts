import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string
  const userEmail = session.customer_details?.email

  // Update user profile with customer ID and subscription info
  // This is where you'd use the admin client
}

export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Update subscription status in your database
}

export async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Mark subscription as canceled/inactive
}
