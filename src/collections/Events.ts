import { isAdmin } from '@/access/isAdmin'
import { isOrganizer } from '@/access/isOrganizer'
import type { CollectionConfig, PayloadRequest } from 'payload'
import { getBaseURL } from '@/lib/utils'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }: { req: PayloadRequest }) => {
      return isOrganizer({ req })
    },
    create: ({ req }: { req: PayloadRequest }) => {
      return isOrganizer({ req })
    },
    delete: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    update: ({ req }: { req: PayloadRequest }) => {
      if (isOrganizer({ req })) return true
      return {
        or: [
          {
            _status: {
              equals: 'draft',
            },
          },
        ],
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Heart of Gold', value: 'heartOfGold' },
        { label: 'Focal Point Beer Co.', value: 'focalPoint' },
        { label: 'The Shillelagh Tavern', value: 'shilTavern' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      label: 'Ticket Price',
      admin: {
        description: 'If a price is set, this event will require ticket purchase through Stripe',
      },
    },
    {
      name: 'ticketLimit',
      type: 'number',
      label: 'Number of Tickets Available',
      admin: {
        condition: (data) => Boolean(data.price),
        description: 'Maximum number of tickets that can be sold for this event',
      },
      validate: (value: number | null | undefined, { data }: { data: { price?: number } }) => {
        if (data.price && (value === null || value === undefined)) {
          return 'Ticket limit is required for paid events'
        }
        return true
      },
    },
    {
      name: 'stripeProductID',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data.price),
      },
    },
    {
      name: 'stripePriceID',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data.price),
      },
    },
    {
      name: 'stripePaymentLinkURL',
      type: 'text',
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data.price),
        description: 'Stripe payment link URL for ticket purchases',
      },
    },
    { name: 'link', type: 'text' },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Only create Stripe config for published events with a price and no existing Stripe IDs
        if (data._status === 'published' && data.price && !data.stripeProductID) {
          try {
            // Create Stripe product
            const productParams = new URLSearchParams({
              name: data.title,
              description: data.content,
            })

            const productResponse = await fetch('https://api.stripe.com/v1/products', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
              },
              body: productParams,
            })

            if (!productResponse.ok) {
              const errorData = await productResponse.json()
              throw new Error(
                `Failed to create Stripe product: ${errorData.error?.message || 'Unknown error'}`,
              )
            }

            const product = await productResponse.json()

            // Create Stripe price
            const priceResponse = await fetch('https://api.stripe.com/v1/prices', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
              },
              body: new URLSearchParams({
                product: product.id,
                unit_amount: (data.price * 100).toString(),
                currency: 'usd',
              }),
            })

            if (!priceResponse.ok) {
              const errorData = await priceResponse.json()
              console.error('Failed to create Stripe price:', errorData)
              throw new Error(
                `Failed to create Stripe price: ${errorData.error?.message || 'Unknown error'}`,
              )
            }

            const price = await priceResponse.json()

            // Create payment link
            const paymentLinkResponse = await fetch('https://api.stripe.com/v1/payment_links', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
              },
              body: new URLSearchParams({
                'line_items[0][price]': price.id,
                'line_items[0][quantity]': '1',
                'line_items[0][adjustable_quantity][enabled]': 'true',
                'line_items[0][adjustable_quantity][minimum]': '1',
                'line_items[0][adjustable_quantity][maximum]': '5',
                'metadata[event_id]': data.id,
                'metadata[ticket_limit]': data.ticketLimit.toString(),
                'after_completion[type]': 'redirect',
                // TODO: Redirect back to the event page after purchase
                'after_completion[redirect][url]': `${getBaseURL()}/events/success`,
              }),
            })

            if (!paymentLinkResponse.ok) {
              const errorData = await paymentLinkResponse.json()
              console.error('Failed to create Stripe payment link:', errorData)
              throw new Error(
                `Failed to create Stripe payment link: ${errorData.error?.message || 'Unknown error'}`,
              )
            }

            const paymentLink = await paymentLinkResponse.json()

            // Update the data with Stripe IDs
            data.stripeProductID = product.id
            data.stripePriceID = price.id
            data.stripePaymentLinkURL = paymentLink.url
          } catch (error) {
            console.error('Error in Stripe configuration:', error)
            // Don't throw the error here - we want to keep the event in the DB
            // even if Stripe configuration fails
          }
        }

        // Validate required fields when publishing
        if (data._status === 'published') {
          const missingFields = []
          if (!data.title) missingFields.push('title')
          if (!data.content) missingFields.push('content')
          if (!data.date) missingFields.push('date')
          if (!data.location) missingFields.push('location')

          if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
          }
        }

        return data
      },
    ],
  },
}
