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
      required: true,
      validate: async (value: any, { req }: { req: any }) => {
        if (!value) return 'Author is required'

        const user = await req.payload.findByID({
          collection: 'users',
          id: value,
        })

        if (!user) return 'User not found'

        const validRoles = ['admin', 'contributor', 'editor']
        if (!validRoles.includes(user.role)) {
          return 'Author must have the role of admin, contributor, or editor'
        }

        return true
      },
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
