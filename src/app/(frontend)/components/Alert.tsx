import { Alert as BaseAlert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleX, CircleCheck, CircleAlert } from 'lucide-react'

export type Props = {
  title: string
  description: string
  variant?: 'success' | 'destructive' | 'nuetral'
  styles?: string
}

function AlertIcon({ variant }: Pick<Props, 'variant'>) {
  switch (variant) {
    case 'destructive':
      return <CircleX className="h-4 w-4" />
    case 'success':
      return <CircleCheck className="h-4 w-4" />
    default:
      return <CircleAlert className="h-4 w-4" />
  }
}

/**
 *
 * @param props
 * @param props.title string - the title of the alert message
 * @param props.description string - The message being delivered
 * @param props.variant string - The type of message to be shown: 'success' | 'destructive' | 'nuetral'
 * @param props.styles OPTIONAL | string - tailwind styles
 * @returns Customized Alert component wrapped around ShadCN component
 */
export default function Alert({ description, title, variant, styles }: Props) {
  return (
    <BaseAlert variant={variant === 'destructive' ? 'destructive' : 'default'} className={styles}>
      <AlertIcon variant={variant} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </BaseAlert>
  )
}
