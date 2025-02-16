import type { CollectionConfig } from 'payload'

export const Event: CollectionConfig = {
  slug: 'event',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
