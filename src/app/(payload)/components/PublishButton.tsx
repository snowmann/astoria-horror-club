'use client'
import { PublishButton as DefaultPublishButton } from '@payloadcms/ui'
import React from 'react'
import type { User } from '../../../payload-types'
import { useAuth } from '@payloadcms/ui'

const CustomPublishButton = () => {
  const { user } = useAuth<User>()

  if (!user || (!user.role.includes('admin') && !user.role.includes('editor'))) {
    return null
  }

  return (
    <div>
      <DefaultPublishButton />
    </div>
  )
}

export default CustomPublishButton
