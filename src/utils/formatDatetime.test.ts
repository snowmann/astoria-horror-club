import { describe, it, expect, vi, afterAll, beforeAll } from 'vitest'
import { formatDatetime } from './formatDatetime'

describe('formatDatetime', () => {
  // Mock Date and timezone behavior for consistent testing
  beforeAll(() => {
    vi.useFakeTimers()
    // Set system timezone to UTC to avoid local timezone differences
    vi.setSystemTime(new Date('2023-11-15T12:34:56Z'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('formats a Date object correctly', () => {
    const date = new Date('2023-11-15T12:34:56Z') // Wed in UTC
    const result = formatDatetime(date)
    expect(result).toMatch(/^[A-Za-z]{3}, \d{1,2} @ \d{1,2}:\d{2} [AP]M$/)
    expect(result).toBe('Wed, 15 @ 7:34 AM') // EST is UTC-5 in November
  })

  it('formats a date string correctly', () => {
    const dateString = '2023-11-15T12:34:56Z'
    const result = formatDatetime(dateString)
    expect(result).toBe('Wed, 15 @ 7:34 AM')
  })

  it('handles midnight correctly', () => {
    const midnight = new Date('2023-11-16T05:00:00Z') // 12:00 AM EST
    const result = formatDatetime(midnight)
    expect(result).toBe('Thu, 16 @ 12:00 AM')
  })

  it('handles noon correctly', () => {
    const noon = new Date('2023-11-16T17:00:00Z') // 12:00 PM EST
    const result = formatDatetime(noon)
    expect(result).toBe('Thu, 16 @ 12:00 PM')
  })

  it('handles single-digit minutes correctly', () => {
    const time = new Date('2023-11-15T12:09:56Z')
    const result = formatDatetime(time)
    expect(result).toBe('Wed, 15 @ 7:09 AM')
  })

  it('handles different timezones correctly', () => {
    // This test assumes the function is hardcoded to America/New_York
    const date = new Date('2023-06-15T12:34:56Z') // EDT is UTC-4
    const result = formatDatetime(date)
    expect(result).toBe('Thu, 15 @ 8:34 AM')
  })
})
