import { getPayload as getPayloadClient } from 'payload'
import config from './payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  }
}

export const getPayload = async () => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayloadClient({
      config,
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.client
}
