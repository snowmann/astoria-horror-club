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
      if (isOrganizer({ req })) {
        return true // Organizers can see all events
      }
      return {
        _status: {
          equals: 'published', // Others can only see published events
        },
      }
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
    { name: 'description', type: 'textarea', required: true },
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
      type: 'ui',
      label: 'Ticket Price',
      admin: { components: { Field: '../app/(payload)/components/PriceField' } },
    },
    { name: 'link', type: 'text' },
  ],
}
