import { describe, it, expect, vi } from 'vitest'
import { cn, getBaseURL, getBlobUrl, getLocationString } from './utils'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Mock environment variables
vi.stubGlobal('process', {
  env: {
    AHC_BASE_URL: 'https://test.example.com',
  },
})

// Mock clsx and twMerge for the cn function tests
vi.mock('clsx', () => ({
  clsx: vi.fn((...inputs) => inputs.join(' ')),
}))

vi.mock('tailwind-merge', () => ({
  twMerge: vi.fn((input) => `merged-${input}`),
}))

describe('Utility Functions', () => {
  describe('cn() - className merger', () => {
    it('combines class names using clsx and twMerge', () => {
      const result = cn('class1', 'class2')
      expect(clsx).toHaveBeenCalledWith(['class1', 'class2'])
      expect(twMerge).toHaveBeenCalledWith('class1,class2')
      expect(result).toBe('merged-class1,class2')
    })

    it('handles empty inputs', () => {
      const result = cn()
      expect(result).toBe('merged-')
    })
  })

  describe('getBaseURL()', () => {
    it('returns environment variable when set', () => {
      const url = getBaseURL()
      expect(url).toBe('https://test.example.com')
    })

    it('returns localhost URL when env var is not set', () => {
      vi.stubGlobal('process', { env: {} })
      const url = getBaseURL()
      expect(url).toBe('http://localhost:3000')
    })
  })

  describe('getBlobUrl()', () => {
    it('constructs correct blob URL', () => {
      const result = getBlobUrl('test-image.jpg')
      expect(result).toBe('https://fzuxxxhgqwm9izz9.public.blob.vercel-storage.com/test-image.jpg')
    })

    it('handles empty string', () => {
      const result = getBlobUrl('')
      expect(result).toBe('https://fzuxxxhgqwm9izz9.public.blob.vercel-storage.com/')
    })
  })

  describe('getLocationString()', () => {
    it('returns correct string for heartOfGold', () => {
      expect(getLocationString('heartOfGold')).toBe('Heart of Gold')
    })

    it('returns correct string for focalPoint', () => {
      expect(getLocationString('focalPoint')).toBe('Focal Point Beer Co.')
    })

    it('returns correct string for shilTavern', () => {
      expect(getLocationString('shilTavern')).toBe('The Shillelagh Tavern')
    })

    it('returns undefined for invalid location', () => {
      // Note: TypeScript would prevent this in actual usage
      expect(getLocationString('invalid' as never)).toBeUndefined()
    })
  })
})
