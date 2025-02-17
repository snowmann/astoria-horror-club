import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

export default function AritclesFeed() {
  return <h1>Articles Go Here</h1>
}
