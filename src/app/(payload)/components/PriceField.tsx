'use client'

import { CheckboxInput, FieldLabel, NumberField } from '@payloadcms/ui'
import { useState } from 'react'

type Props = { path: string } & Record<string, unknown>

const PriceField = ({ path }: Props) => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div
      style={{
        marginBottom: 'var(--spacing-field)',
      }}
    >
      <div style={{ marginBottom: 'var(--spacing-field)' }}>
        <FieldLabel label="Ticket Pricing" />
        <CheckboxInput
          label="Event is ticketed"
          checked={isChecked}
          onToggle={() => setIsChecked(!isChecked)}
        />
      </div>
      {isChecked && (
        <div>
          <FieldLabel label="Price" />
          <NumberField path={path} field={{ name: 'price' }} />
        </div>
      )}
    </div>
  )
}

export default PriceField
