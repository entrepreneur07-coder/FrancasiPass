import Stripe from 'stripe'

let _stripe: Stripe | null = null

function createStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    // During build, return a minimal instance to avoid runtime errors
    return new Stripe('sk_test_dummy', { apiVersion: '2026-05-27.dahlia' as any })
  }
  return new Stripe(secretKey, {
    apiVersion: '2026-05-27.dahlia' as any,
    appInfo: {
      name: 'FrancaisPass',
      version: '0.1.0',
    },
  })
}

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = createStripe()
  }
  return _stripe
}

// Lazy accessor — doesn't initialize until first property read
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return getStripe()[prop as keyof Stripe]
  }
})