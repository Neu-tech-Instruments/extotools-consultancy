'use client'

import { useCallback } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { startCheckoutSession } from '@/app/actions/stripe'

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout({ productId }: { productId: string }) {
  // Callback to fetch the client secret from our Server Action
  const fetchClientSecret = useCallback(
    (): Promise<string> => startCheckoutSession(productId),
    [productId]
  )

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="my-8 min-h-[600px] bg-white rounded-xl p-4 shadow-sm">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
