'use server'

import { getStripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { bundles } from '@/lib/extensions'

export async function startCheckoutSession(productId: string, currency: string = 'usd') {
  const stripe = await getStripe()
  
  // Ensure currency is lowercase for Stripe
  const stripeCurrency = currency.toLowerCase()

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

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      locale: 'en',
      adaptive_pricing: {
        enabled: false,
      },
      line_items: [
        {
          price_data: {
            currency: stripeCurrency,
            product_data: {
              name: name,
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
      },
      redirect_on_completion: 'always',
      return_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    })

    if (!session.client_secret) {
      console.error("Stripe Session missing client_secret");
      throw new Error("Failed to create checkout session")
    }

    return session.client_secret
  } catch (error: any) {
    console.error("STRIPE SESSION ERROR:", error.message);
    if (error.raw) {
        console.error("STRIPE RAW ERROR:", JSON.stringify(error.raw, null, 2));
    }
    throw error;
  }
}
