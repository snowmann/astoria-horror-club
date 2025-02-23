import { isAuthor } from '@/access/isAuthor'
import { canPublish } from '@/access/canPublish'
import { isAdmin } from '@/access/isAdmin'
import type { CollectionConfig, PayloadRequest } from 'payload'
import { getNextYearDate, toTitleCase } from '@/app/(payload)/utils.ts/collectionUtils'
import { SUBSCRIPTIONS_LIST } from '@/app/(payload)/constants/subscriptionsList'

export const Emails: CollectionConfig = {
  slug: 'emails',
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
      name: 'subject',
      type: 'text',
      required: true,
    },
    { name: 'body', type: 'richText' },
    {
      name: 'html',
      type: 'code',
      hidden: true,
      admin: {
        language: 'html',
      },
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
      name: 'sendDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          minDate: new Date(),
          maxDate: getNextYearDate(),
        },
      },
    },
    {
      name: 'recipients',
      type: 'select',
      options: [
        { label: 'All', value: 'all' },
        ...SUBSCRIPTIONS_LIST.map((sub) => ({ label: toTitleCase(sub), value: sub })),
      ],
      required: true,
      hasMany: true,
    },
  ],
}
