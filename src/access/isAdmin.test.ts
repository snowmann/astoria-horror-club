import { describe, expect, it } from 'vitest'
import { isAdmin } from './isAdmin'
import type { AccessArgs } from 'payload'

describe('isAdmin', () => {
  it('should return true for admin user', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['admin'],
          collection: 'users',
        },
      },
    } as never

    expect(isAdmin(mockParams)).toBe(true)
  })

  it('should return false for non-admin user', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['editor'],
          collection: 'users',
        },
      },
    } as never

    expect(isAdmin(mockParams)).toBe(false)
  })

  it('should return false when user has multiple roles without admin', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['editor', 'viewer'],
          collection: 'users',
        },
      },
    } as never

    expect(isAdmin(mockParams)).toBe(false)
  })

  it('should return true when user has admin among multiple roles', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['editor', 'admin'],
          collection: 'users',
        },
      },
    } as never

    expect(isAdmin(mockParams)).toBe(true)
  })

  it('should return false when no user exists', () => {
    const mockParams: AccessArgs = {
      req: {
        user: null,
      },
    } as never

    expect(isAdmin(mockParams)).toBe(false)
  })

  it('should return false for undefined user', () => {
    const mockParams = { req: {} } as never
    expect(isAdmin(mockParams)).toBe(false)
  })

  it('should return false for empty roles array', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: [],
          collection: 'users',
        },
      },
    } as never

    expect(isAdmin(mockParams)).toBe(false)
  })
})
