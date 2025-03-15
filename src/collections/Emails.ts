import { isAuthor } from '@/access/isAuthor'
import { canPublish } from '@/access/canPublish'
import { isAdmin } from '@/access/isAdmin'
import type { CollectionConfig, PayloadRequest } from 'payload'
import { getNextYearDate } from '@/app/utils.ts/utils'
import { beforeEmailValidation } from '@/app/(payload)/hooks/emails/beforeEmailValidation'
import { beforeEmailDelete } from '@/app/(payload)/hooks/emails/beforeEmailDelete'

export const Emails: CollectionConfig = {
  slug: 'emails',
  admin: {
    useAsTitle: 'subject',
    components: {
      edit: {
        PublishButton: 'src/app/(payload)/components/PublishButton',
      },
    },
  },
  hooks: {
    beforeValidate: [beforeEmailValidation],
    beforeDelete: [beforeEmailDelete],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
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
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'relationship',
      relationTo: ['articles', 'events'],
      required: true,
    },
    {
      name: 'sendDatetime',
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
      name: 'audience',
      type: 'relationship',
      relationTo: 'audiences',
      required: true,
    },
    {
      name: 'resendId',
      type: 'text',
      hidden: true,
    },
  ],
}
