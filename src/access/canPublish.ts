import type { Access } from 'payload'

export const canPublish: Access = ({ req: { user } }) => {
  if (user?.role.includes('admin') || user?.role.includes('editor')) {
    return true
  }

  return false
}
