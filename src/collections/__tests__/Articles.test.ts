import { describe, it, expect } from 'vitest'
import { Articles } from '../Articles'
import type { CollectionConfig, Field } from 'payload'

type TextField = Field & { name: string; required?: boolean; type: 'text' }
type TextareaField = Field & { name: string; type: 'textarea' }
type RichTextEditorConfig = { toolbar: string[]; plugins?: string[] } // Example configuration type
type RichTextField = Field & {
  name: string
  required?: boolean
  type: 'richText'
  editor: RichTextEditorConfig
}
type RelationshipField = Field & {
  name: string
  type: 'relationship'
  relationTo: string
  admin?: { readOnly?: boolean }
  defaultValue?: (req: { req: { user: { id: string } | null } }) => string | null
}

describe('Articles Collection', () => {
  describe('Collection Configuration', () => {
    it('should have the correct slug', () => {
      expect(Articles.slug).toBe('articles')
    })

    it('should have drafts enabled', () => {
      const versions = (Articles as CollectionConfig).versions
      expect(typeof versions === 'object' && versions?.drafts).toBe(true)
    })

    it('should have required fields', () => {
      const fields = (Articles as CollectionConfig).fields
      const titleField = fields.find(
        (field) => 'name' in field && field.name === 'title',
      ) as TextField
      const contentField = fields.find(
        (field) => 'name' in field && field.name === 'content',
      ) as RichTextField

      expect(titleField?.required).toBe(true)
      expect(contentField?.required).toBe(true)
    })

    it('should have correct admin configuration', () => {
      expect(Articles.admin?.useAsTitle).toBe('title')
      expect(Articles.admin?.components?.edit?.PublishButton).toBe(
        'src/app/(payload)/components/PublishButton',
      )
    })

    it('should have all required fields with correct types', () => {
      const fields = (Articles as CollectionConfig).fields
      const titleField = fields.find(
        (field) => 'name' in field && field.name === 'title',
      ) as TextField
      const subtitleField = fields.find(
        (field) => 'name' in field && field.name === 'subtitle',
      ) as TextareaField
      const contentField = fields.find(
        (field) => 'name' in field && field.name === 'content',
      ) as RichTextField
      const authorField = fields.find(
        (field) => 'name' in field && field.name === 'author',
      ) as RelationshipField

      expect(titleField?.type).toBe('text')
      expect(subtitleField?.type).toBe('textarea')
      expect(contentField?.type).toBe('richText')
      expect(authorField?.type).toBe('relationship')
    })

    it('should have correct author field configuration', () => {
      const fields = (Articles as CollectionConfig).fields
      const authorField = fields.find(
        (field) => 'name' in field && field.name === 'author',
      ) as RelationshipField

      expect(authorField?.relationTo).toBe('users')
      expect(authorField?.admin?.readOnly).toBe(true)

      // Test the defaultValue function with user
      const mockReqWithUser = { req: { user: { id: 'test-user-id' } } }
      const defaultValueWithUser = authorField?.defaultValue?.(mockReqWithUser)
      expect(defaultValueWithUser).toBe('test-user-id')

      // Test the defaultValue function without user
      const mockReqWithoutUser = { req: { user: null } }
      const defaultValueWithoutUser = authorField?.defaultValue?.(mockReqWithoutUser)
      expect(defaultValueWithoutUser).toBeNull()
    })

    it('should have correct rich text editor configuration', () => {
      const fields = (Articles as CollectionConfig).fields
      const contentField = fields.find(
        (field) => 'name' in field && field.name === 'content',
      ) as RichTextField

      expect(contentField?.editor).toBeDefined()
      // Note: We can't easily test the actual editor configuration as it's a complex object
      // But we can verify it exists and has the expected type
    })

    it('should have correct field requirements', () => {
      const fields = (Articles as CollectionConfig).fields
      const subtitleField = fields.find(
        (field) => 'name' in field && field.name === 'subtitle',
      ) as TextareaField

      expect(subtitleField?.required).toBeFalsy()
    })
  })

  describe('Access Control', () => {
    const mockReq = {
      user: {
        id: 'test-user-id',
        role: ['editor'],
      },
    } as { user: { id: string; role: string[] } }

    it('should handle unauthenticated users', () => {
      const access = (Articles as CollectionConfig).access
      if (!access?.read) throw new Error('Access read is undefined')

      const unauthenticatedReq = { req: { user: null } }
      const result = access.read(unauthenticatedReq)
      expect(result).toBe(false)
    })

    it('should allow authors to read articles', () => {
      const access = (Articles as CollectionConfig).access
      if (!access?.read) throw new Error('Access read is undefined')
      const result = access.read({ req: mockReq })
      expect(result).toBe(true)
    })

    it('should allow authors to create articles', () => {
      const access = (Articles as CollectionConfig).access
      if (!access?.create) throw new Error('Access create is undefined')
      const result = access.create({ req: mockReq })
      expect(result).toBe(true)
    })

    it('should only allow admins to delete articles', () => {
      const access = (Articles as CollectionConfig).access
      if (!access?.delete) throw new Error('Access delete is undefined')

      const adminReq = { ...mockReq, user: { ...mockReq.user, role: ['admin'] } }
      const authorReq = { ...mockReq, user: { ...mockReq.user, role: ['editor'] } }
      const noRoleReq = { ...mockReq, user: { ...mockReq.user, role: [] } }

      const adminResult = access.delete({ req: adminReq })
      const authorResult = access.delete({ req: authorReq })
      const noRoleResult = access.delete({ req: noRoleReq })

      expect(adminResult).toBe(true)
      expect(authorResult).toBe(false)
      expect(noRoleResult).toBe(false)
    })

    it('should allow updates based on role and draft status', () => {
      const access = (Articles as CollectionConfig).access
      if (!access?.update) throw new Error('Access update is undefined')

      const adminReq = { ...mockReq, user: { ...mockReq.user, role: ['admin'] } }
      const editorReq = { ...mockReq, user: { ...mockReq.user, role: ['editor'] } }
      const contributorReq = { ...mockReq, user: { ...mockReq.user, role: ['contributor'] } }
      const noRoleReq = { ...mockReq, user: { ...mockReq.user, role: [] } }

      const adminResult = access.update({ req: adminReq })
      const editorResult = access.update({ req: editorReq })
      const contributorResult = access.update({ req: contributorReq })
      const noRoleResult = access.update({ req: noRoleReq })

      expect(adminResult).toBe(true)
      expect(editorResult).toBe(true)
      expect(contributorResult).toEqual({
        or: [
          {
            _status: {
              equals: 'draft',
            },
          },
        ],
      })
      expect(noRoleResult).toEqual({
        or: [
          {
            _status: {
              equals: 'draft',
            },
          },
        ],
      })
    })
  })
})
