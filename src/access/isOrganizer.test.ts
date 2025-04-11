import { describe, expect, it } from 'vitest'
import { isOrganizer } from './isOrganizer'
import type { AccessArgs } from 'payload'

describe('isOrganizer', () => {
  // Test factory function
  const createMockContext = (roles?: string[] | null): AccessArgs =>
    ({
      req: {
        user: roles ? { role: roles, collection: 'users' } : null,
      },
    }) as never

  // Positive cases - should return true
  describe('should return true for', () => {
    it.each(['admin', 'organizer'])('%s role', (role) => {
      expect(isOrganizer(createMockContext([role]))).toBe(true)
    })

    it('both admin and organizer roles', () => {
      expect(isOrganizer(createMockContext(['admin', 'organizer']))).toBe(true)
    })

    it('organizer among other roles', () => {
      expect(isOrganizer(createMockContext(['editor', 'organizer', 'viewer']))).toBe(true)
    })
  })

  // Negative cases - should return false
  describe('should return false for', () => {
    it.each(['editor', 'viewer', 'contributor'])('%s role', (role) => {
      expect(isOrganizer(createMockContext([role]))).toBe(false)
    })

    it('empty roles array', () => {
      expect(isOrganizer(createMockContext([]))).toBe(false)
    })

    it('null user', () => {
      expect(isOrganizer(createMockContext(null))).toBe(false)
    })

    it('undefined user', () => {
      expect(isOrganizer({ req: {} } as never)).toBe(false)
    })
  })
})
