'use server'

import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { bundles } from '@/lib/extensions'

export async function startCheckoutSession(productId: string) {
  const stripe = await getStripe()

  let name = ""
  let description = ""
  let price = 0

  // 1. Try finding as an Extension in DB
  const extension = await prisma.extension.findUnique({
    where: { id: productId }
  })

  if (extension) {
    name = extension.name
    description = extension.description || ""
    price = extension.price
  } else {
    // 2. Try finding as a Bundle in static config
    const bundle = bundles.find(b => b.id === productId)
    if (bundle) {
      name = bundle.name
      description = bundle.description
      price = bundle.price
    }
  }

  if (!name) {
    throw new Error("Product not found")
  }

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: name,
            description: description || undefined,
          },
          unit_amount: Math.round(price * 100),
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    metadata: {
        productId: productId,
        isBundle: String(!!bundles.find(b => b.id === productId))
    }
  })

  if (!session.client_secret) {
    throw new Error("Failed to create checkout session")
  }

  return session.client_secret
}
