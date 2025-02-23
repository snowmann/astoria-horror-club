import { SUBSCRIPTIONS_LIST } from '@/app/(payload)/constants/subscriptionsList'
import type { CollectionConfig, Field } from 'payload'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  fields: [
    { name: 'subscriber', type: 'relationship', relationTo: 'subscribers' },
    ...SUBSCRIPTIONS_LIST.map((sub) => ({ name: sub, type: 'checkbox' }) as Field),
  ],
}
