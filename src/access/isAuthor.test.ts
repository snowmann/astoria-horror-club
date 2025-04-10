import { describe, expect, it } from 'vitest'
import { isAuthor } from './isAuthor'
import type { AccessArgs } from 'payload'

describe('isAuthor', () => {
  // Test cases for allowed roles
  it.each(['admin', 'contributor', 'editor'])('should return true for %s role', (role) => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: [role],
          collection: 'users',
        },
      },
    } as never
    expect(isAuthor(mockParams)).toBe(true)
  })

  // Test cases for disallowed roles
  it.each(['viewer', 'subscriber', 'guest'])('should return false for %s role', (role) => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: [role],
          collection: 'users',
        },
      },
    } as never
    expect(isAuthor(mockParams)).toBe(false)
  })

  // Edge cases
  it('should return true when user has multiple allowed roles', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['contributor', 'editor'],
          collection: 'users',
        },
      },
    } as never
    expect(isAuthor(mockParams)).toBe(true)
  })

  it('should return true when user has one allowed among multiple roles', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['viewer', 'editor', 'guest'],
          collection: 'users',
        },
      },
    } as never
    expect(isAuthor(mockParams)).toBe(true)
  })

  it('should return false when no user exists', () => {
    const mockParams: AccessArgs = {
      req: {
        user: null,
      },
    } as never
    expect(isAuthor(mockParams)).toBe(false)
  })

  it('should return false for undefined user', () => {
    const mockParams = { req: {} } as never
    expect(isAuthor(mockParams)).toBe(false)
  })

  it('should return false for user with empty roles array', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: [],
          collection: 'users',
        },
      },
    } as never
    expect(isAuthor(mockParams)).toBe(false)
  })
})
