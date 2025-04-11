import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SubscriberForm from './SubscriberForm'
import type { CreateContactResponse } from './SubscriberForm'
import { CreateContactResponseSuccess } from 'resend'

const mockSuccessResponse: CreateContactResponse = {
  success: true,
  data: { id: '123' } as CreateContactResponseSuccess,
  error: null,
}

const mockErrorResponse: CreateContactResponse = {
  success: false,
  data: null,
  error: {
    message: 'API Error',
    name: 'missing_required_field',
  },
}

describe('SubscriberForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  it('matches snapshot', () => {
    const { container } = render(<SubscriberForm />)
    expect(container).toMatchSnapshot()
  })

  it('renders the form with all fields', () => {
    render(<SubscriberForm />)

    expect(screen.getByText('Subscribe to Our Newsletter')).toBeDefined()
    expect(screen.getByText('Keep up to date with events, articles, and more.')).toBeDefined()
    expect(screen.getByLabelText('First Name')).toBeDefined()
    expect(screen.getByLabelText('Last Name')).toBeDefined()
    expect(screen.getByLabelText('Email')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeDefined()
  })

  it('shows validation errors when form is submitted empty', async () => {
    render(<SubscriberForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(screen.getAllByText('Required')).toHaveLength(2)
      expect(screen.getByText('Invalid email address.')).toBeDefined()
    })
  })

  it('shows email validation error when invalid email is entered', async () => {
    render(<SubscriberForm />)

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(screen.getByText('Invalid email address.')).toBeDefined()
    })
  })

  it('submits the form successfully', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    } as Response)

    render(<SubscriberForm />)

    fireEvent.input(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.input(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
        }),
      })

      expect(screen.getByText('You have been subscribed to our newletter')).toBeDefined()
      expect(screen.queryByRole('button', { name: 'Subscribe' })).toBeNull()
    })
  })

  it('shows error message when API fails', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockErrorResponse),
    } as Response)

    render(<SubscriberForm />)

    fireEvent.input(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.input(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(screen.getByText('API Error')).toBeDefined()
    })
  })

  it('hides the form after successful submission', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockSuccessResponse),
    } as Response)

    render(<SubscriberForm />)

    fireEvent.input(screen.getByLabelText('First Name'), {
      target: { value: 'John' },
    })
    fireEvent.input(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    })
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }))

    await waitFor(() => {
      expect(screen.queryByLabelText('First Name')).not.toBeUndefined()
    })
  })
})
