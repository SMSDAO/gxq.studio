import { useAuth } from '@/contexts/AuthContext'
import type { Role } from '@/types/roles'
import { ROLE_PERMISSIONS } from '@/types/roles'

export function useRole() {
  const { user } = useAuth()

  const role = user?.role ?? null

  const hasRole = (r: Role) => role === r

  const hasAnyRole = (...roles: Role[]) => roles.some(r => r === role)

  const can = (resource: string, action: 'read' | 'write' | 'delete' | 'manage') => {
    if (!role) return false
    const perms = ROLE_PERMISSIONS[role]
    const perm = perms.find(p => p.resource === resource)
    return perm?.actions.includes(action) ?? false
  }

  const isAdmin = role === 'admin'
  const isDev = role === 'dev' || role === 'admin'
  const isUser = !!role

  return { role, hasRole, hasAnyRole, can, isAdmin, isDev, isUser }
}
