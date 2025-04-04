import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Alert from './Alert'

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  CircleX: () => <div data-testid="circle-x-icon" />,
  CircleCheck: () => <div data-testid="circle-check-icon" />,
  CircleAlert: () => <div data-testid="circle-alert-icon" />,
}))

// Mock ShadCN components
vi.mock('@/components/ui/alert', () => ({
  Alert: ({ children, variant, className }: any) => (
    <div data-testid="base-alert" data-variant={variant} className={className}>
      {children}
    </div>
  ),
  AlertTitle: ({ children }: any) => <div data-testid="alert-title">{children}</div>,
  AlertDescription: ({ children }: any) => <div data-testid="alert-description">{children}</div>,
}))

describe('Alert Component', () => {
  const testProps = {
    title: 'Test Title',
    description: 'Test description message',
    variant: 'nuetral' as const,
  }

  describe('AlertIcon', () => {
    it('matches snapshot for each variant', () => {
      const { container: nuetral } = render(<Alert {...testProps} />)
      expect(nuetral).toMatchSnapshot()

      const { container: destructive } = render(<Alert {...testProps} variant="destructive" />)
      expect(destructive).toMatchSnapshot()

      const { container: success } = render(<Alert {...testProps} variant="success" />)
      expect(success).toMatchSnapshot()
    })

    it('renders CircleX for destructive variant', () => {
      render(<Alert {...testProps} variant="destructive" />)
      expect(screen.getByTestId('circle-x-icon')).toBeDefined()
    })

    it('renders CircleCheck for success variant', () => {
      render(<Alert {...testProps} variant="success" />)
      expect(screen.getByTestId('circle-check-icon')).toBeDefined()
    })

    it('renders CircleAlert for nuetral variant', () => {
      render(<Alert {...testProps} variant="nuetral" />)
      expect(screen.getByTestId('circle-alert-icon')).toBeDefined()
    })

    it('renders CircleAlert for default variant', () => {
      render(<Alert {...testProps} variant={undefined} />)
      expect(screen.getByTestId('circle-alert-icon')).toBeDefined()
    })
  })

  describe('Alert', () => {
    it('renders with default props', () => {
      render(<Alert {...testProps} />)

      const baseAlert = screen.getByTestId('base-alert')
      expect(baseAlert).toBeDefined()
      expect(baseAlert.dataset.variant).toBe('default')

      expect(screen.getByText('Test Title')).toBeDefined()
      expect(screen.getByText('Test description message')).toBeDefined()
      expect(screen.getByTestId('circle-alert-icon')).toBeDefined()
    })

    it('applies destructive variant correctly', () => {
      render(<Alert {...testProps} variant="destructive" />)

      expect(screen.getByTestId('circle-x-icon')).toBeDefined()
    })

    it('applies success variant correctly', () => {
      render(<Alert {...testProps} variant="success" />)

      expect(screen.getByTestId('circle-check-icon')).toBeDefined()
    })
  })
})
