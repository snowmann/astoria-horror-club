import type { CollectionConfig, PayloadRequest } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'fullName',
  },
  auth: true,
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
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Editor', value: 'editor' },
        { label: 'Organizer', value: 'organizer' },
        { label: 'User', value: 'user' },
      ],
      hasMany: true,
      required: true,
      defaultValue: 'user',
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

    // Email added by default
    // Add more fields as needed
  ],
}
