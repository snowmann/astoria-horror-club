import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        readOnly: true,
      },
      defaultValue: ({ req }) => (req.user ? req.user.id : null),
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'published_at',
      type: 'date',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'created_at',
      type: 'date',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'updated_at',
      type: 'date',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'archived',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
