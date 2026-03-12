'use client'

import { useCallback, useMemo } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { startCheckoutSession } from '@/app/actions/stripe'
import { useCurrency } from '@/context/CurrencyContext'

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout({ productId }: { productId: string }) {
  const { currency, isLoading } = useCurrency()

  // Callback to fetch the client secret from our Server Action
  const fetchClientSecret = useCallback(
    (): Promise<string> => startCheckoutSession(productId, currency),
    [productId, currency]
  )

  const options = useMemo(() => ({
    fetchClientSecret,
  }), [fetchClientSecret]);

  if (isLoading) {
    return (
      <div className="my-8 min-h-[600px] flex items-center justify-center bg-white p-4 shadow-sm">
        <div className="animate-pulse text-[var(--primary)] font-bold">DETECTING REGION...</div>
      </div>
    )
  }

  return (
    <div id="checkout" className="my-8 min-h-[600px] bg-white p-4 shadow-sm">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
