import { isAdmin } from '@/access/isAdmin'
import { isOrganizer } from '@/access/isOrganizer'
import type { CollectionConfig, PayloadRequest } from 'payload'

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
      name: 'ticketsSold',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        condition: (data) => Boolean(data.price),
      },
    },
    { name: 'link', type: 'text' },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === 'create' && data.price) {
          // Create Stripe product
          const productResponse = await fetch('https://api.stripe.com/v1/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            },
            body: new URLSearchParams({
              name: data.title,
              description: data.content,
              metadata: JSON.stringify({
                eventId: data.id,
              }),
            }),
          })

          const product = await productResponse.json()

          // Create Stripe price with inventory
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
              inventory: JSON.stringify({
                type: 'finite',
                quantity: data.ticketLimit || 100, // Default to 100 if not specified
              }),
            }),
          })

          const price = await priceResponse.json()

          return {
            ...data,
            stripeProductID: product.id,
            stripePriceID: price.id,
          }
        }

        return data
      },
    ],
  },
}
