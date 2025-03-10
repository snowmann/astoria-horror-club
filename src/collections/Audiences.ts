import { isAdmin } from '@/access/isAdmin'
import { beforeAudienceValidateHook } from '@/app/(payload)/hooks/audiences/beforeAudienceValidateHook'
import type { CollectionConfig, PayloadRequest } from 'payload'

export const Audiences: CollectionConfig = {
  slug: 'audiences',
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    beforeValidate: [beforeAudienceValidateHook],
  },
  access: {
    read: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    create: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    delete: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    update: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'resendId',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
    },
  ],
}
