import { describe, expect, it } from 'vitest'
import { canPublish } from './canPublish'
import type { AccessArgs } from 'payload'

describe('canPublish', () => {
  it('should allow access for admin users', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['admin'],
          collection: 'users',
        },
      },
    } as never

    expect(canPublish(mockParams)).toBe(true)
  })

  it('should allow access for editor users', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['editor'],
          collection: 'users',
        },
      },
    } as never

    expect(canPublish(mockParams)).toBe(true)
  })

  it('should deny access for users without admin or editor role', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['viewer'],
          collection: 'users',
        },
      },
    } as never

    expect(canPublish(mockParams)).toBe(false)
  })

  it('should deny access when no user is present', () => {
    const mockParams: AccessArgs = {
      req: {
        user: null,
      },
    } as never

    expect(canPublish(mockParams)).toBe(false)
  })

  it('should handle multiple roles', () => {
    const mockParams: AccessArgs = {
      req: {
        user: {
          role: ['viewer', 'editor'],
          collection: 'users',
        },
      },
    } as never

    expect(canPublish(mockParams)).toBe(true)
  })
})
