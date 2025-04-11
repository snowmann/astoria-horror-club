import { getPayloadClient } from '@/get-payload'
import { NextResponse } from 'next/server'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await getPayloadClient()
    const { quantity = 1 } = await req.json()

    // Get the event
    const event = await payload.findByID({
      collection: 'events',
      id: params.id,
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    if (!event.price || !event.stripePriceID) {
      return NextResponse.json({ error: 'This event does not require tickets' }, { status: 400 })
    }

    // Check ticket availability through Stripe
    const priceResponse = await fetch(`https://api.stripe.com/v1/prices/${event.stripePriceID}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    })

    const price = await priceResponse.json()

    if (price.inventory?.quantity === 0) {
      return NextResponse.json({ error: 'This event is sold out' }, { status: 400 })
    }

    if (price.inventory?.quantity < quantity) {
      return NextResponse.json(
        { error: `Only ${price.inventory.quantity} tickets remaining` },
        { status: 400 },
      )
    }

    // Create a payment intent
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
      body: new URLSearchParams({
        amount: (event.price * quantity * 100).toString(),
        currency: 'usd',
        automatic_payment_methods: JSON.stringify({ enabled: true }),
        metadata: JSON.stringify({
          eventId: event.id,
          quantity: quantity.toString(),
        }),
      }),
    })

    const paymentIntent = await response.json()

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}
