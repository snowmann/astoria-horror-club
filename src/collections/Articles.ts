import { isAuthor } from '@/access/isAuthor'
import { canPublish } from '@/access/canPublish'
import { isAdmin } from '@/access/isAdmin'
import type { CollectionConfig, PayloadRequest } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    components: {
      edit: {
        PublishButton: '../app/(payload)/components/PublishButton',
      },
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }: { req: PayloadRequest }) => {
      return isAuthor({ req })
    },
    create: ({ req }: { req: PayloadRequest }) => {
      return isAuthor({ req })
    },
    delete: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    update: ({ req }: { req: PayloadRequest }) => {
      if (canPublish({ req })) return true
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
  ],
}
