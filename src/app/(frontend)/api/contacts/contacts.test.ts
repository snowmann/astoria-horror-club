import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/(frontend)/api/contacts/route'
import { NextRequest } from 'next/server'

// Create mock Resend client
const createMockResend = () => ({
  audiences: {
    list: vi.fn(),
  },
  contacts: {
    create: vi.fn(),
  },
})

// Mock modules
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data, init) => ({
      json: () => Promise.resolve(data),
      status: init?.status,
    })),
  },
}))

const mockResend = createMockResend()
vi.mock('resend', () => ({
  Resend: vi.fn(() => mockResend),
}))

vi.mock('@/app/constants', () => ({
  STATUS_CODES: {
    BadRequest: 400,
    Created: 201,
    InternalServerError: 500,
    ServiceUnavailable: 503,
  },
}))

describe('POST /api/contacts', () => {
  let mockRequest: Request

  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('RESEND_FULL_API_KEY', 'test-key')

    // Reset mock Resend implementation
    mockResend.audiences.list.mockReset()
    mockResend.contacts.create.mockReset()

    // Create mock request
    mockRequest = {
      json: vi.fn(),
      headers: new Headers(),
      method: 'POST',
      url: 'http://localhost:3000/api/contacts',
    } as unknown as Request
  })

  describe('Request Validation', () => {
    it('should return 400 if firstName is missing', async () => {
      vi.mocked(mockRequest.json).mockResolvedValue({ lastName: 'Doe', email: 'test@example.com' })
      const response = await POST(mockRequest as NextRequest)
      expect(response.status).toBe(400)
    })

    // Add other validation tests...
  })

  describe('Resend API Integration', () => {
    beforeEach(() => {
      vi.mocked(mockRequest.json).mockResolvedValue({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      })
    })

    it('should return 503 if audience list fails', async () => {
      mockResend.audiences.list.mockResolvedValue({
        error: { message: 'API Error' },
        data: null,
      })

      const response = await POST(mockRequest as NextRequest)
      expect(response.status).toBe(503)
    })

    // Add other API integration tests...
  })

  describe('Error Handling', () => {
    it('should handle Error instances', async () => {
      vi.mocked(mockRequest.json).mockRejectedValue(new Error('Database error'))
      const response = await POST(mockRequest as NextRequest)
      expect(response.status).toBe(500)
    })

    // Add other error handling tests...
  })
})
