'use client'
import { PublishButton } from '@payloadcms/ui'
import React from 'react'
import type { User } from '../../../payload-types'
import { useAuth } from '@payloadcms/ui'

const CustomPublishButton = () => {
  const { user } = useAuth<User>()

  if (!user || (!user.role.includes('admin') && !user.role.includes('editor'))) {
    return null
  }

  return <PublishButton />
}

export default CustomPublishButton
