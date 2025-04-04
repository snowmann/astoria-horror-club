import { describe, it, expect, vi } from 'vitest'
import { GET } from '@/app/(frontend)/api/boo/route'
import { NextRequest, NextResponse } from 'next/server'
import { STATUS_CODES } from '@/app/constants'

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status,
    })),
  },
}))

// Mock your constants
vi.mock('@/app/constants', () => ({
  STATUS_CODES: {
    OK: 200,
  },
}))

describe('GET /api/your-route', () => {
  it('returns a successful response with "boo" message', async () => {
    // Create a mock NextRequest
    const mockRequest = {
      // Add any required request properties here
    } as NextRequest

    // Call the route handler
    const response = await GET(mockRequest)

    // Verify the response
    expect(NextResponse.json).toHaveBeenCalledWith({ message: 'boo' }, { status: STATUS_CODES.OK })

    // Check the response data
    const data = await response.json()
    expect(data).toEqual({ message: 'boo' })
    expect(response.status).toBe(200)
  })

  it('returns the correct status code', async () => {
    const mockRequest = {} as NextRequest
    const response = await GET(mockRequest)
    expect(response.status).toBe(STATUS_CODES.OK)
  })
})
