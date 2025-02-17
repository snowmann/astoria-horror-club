import type { Access } from 'payload'

export const isAuthor: Access = ({ req: { user } }) => {
  return user
    ? user.role.includes('admin') ||
        user.role.includes('contributor') ||
        user.role.includes('editor')
    : false
}
