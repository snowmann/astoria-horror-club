import { isAdmin } from '@/access/isAdmin'
import { isOrganizer } from '@/access/isOrganizer'
import type { CollectionConfig, PayloadRequest } from 'payload'

// Array - for repeating content, supports nested fields
// Blocks - for block-based content, supports nested fields
// Checkbox - saves boolean true / false values
// Code - renders a code editor interface that saves a string
// Date - renders a date picker and saves a timestamp
// Email - ensures the value is a properly formatted email address
// Group - nests fields within a keyed object
// JSON - renders a JSON editor interface that saves a JSON object
// Number - saves numeric values
// Point - for location data, saves geometric coordinates
// Radio - renders a radio button group that allows only one value to be selected
// Relationship - assign relationships to other collections
// Rich Text - renders a fully extensible rich text editor
// Select - renders a dropdown / picklist style value selector
// Tabs (Named) - similar to group, but renders nested fields within a tabbed layout
// Text - simple text input that saves a string
// Textarea - similar to text, but allows for multi-line input
// Upload - allows local file and image upload

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }: { req: PayloadRequest }) => {
      return isOrganizer({ req })
    },
    create: ({ req }: { req: PayloadRequest }) => {
      return isOrganizer({ req })
    },
    delete: ({ req }: { req: PayloadRequest }) => {
      return isAdmin({ req })
    },
    update: ({ req }: { req: PayloadRequest }) => {
      if (isOrganizer({ req })) return true
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
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        { label: 'Heart of Gold', value: 'heartOfGold' },
        { label: 'Focal Point Beer Co.', value: 'focalPoint' },
        { label: 'The Shillelagh Tavern', value: 'shilTavern' },
      ],
    },
    {
      name: 'price',
      type: 'ui',
      label: 'Ticket Price',
      admin: { components: { Field: '../app/(payload)/components/PriceField' } },
    },
    { name: 'link', type: 'text' },
  ],
}
