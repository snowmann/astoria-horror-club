import type { CollectionConfig, PayloadRequest } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    create: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    read: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    update: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    delete: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // ensures data is not stored in DB
            delete siblingData['fullName']
          },
        ],
        afterRead: [
          ({ data }) => {
            return `${data?.firstName} ${data?.lastName}`
          },
        ],
      },
    },
    { name: 'email', type: 'text', required: true },
    {
      name: 'subscriptions',
      type: 'join',
      collection: 'subscriptions',
      on: 'subscriber',
      admin: { defaultColumns: ['events', 'articles'] },
    },
  ],
}
