import type { Access } from 'payload'

export const isOrganizer: Access = ({ req: { user } }) => {
  return user ? user.role.includes('admin') || user.role.includes('organizer') : false
}
