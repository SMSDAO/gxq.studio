export type Role = 'admin' | 'user' | 'dev'

export const ROLES = {
  ADMIN: 'admin' as const,
  USER: 'user' as const,
  DEV: 'dev' as const,
}

export interface Permission {
  resource: string
  actions: ('read' | 'write' | 'delete' | 'manage')[]
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    { resource: 'users', actions: ['read', 'write', 'delete', 'manage'] },
    { resource: 'roles', actions: ['read', 'write', 'delete', 'manage'] },
    { resource: 'settings', actions: ['read', 'write', 'manage'] },
    { resource: 'audit', actions: ['read'] },
    { resource: 'swap', actions: ['read', 'write'] },
    { resource: 'flash-loans', actions: ['read', 'write'] },
    { resource: 'contracts', actions: ['read', 'write', 'delete'] },
    { resource: 'templates', actions: ['read', 'write', 'delete', 'manage'] },
    { resource: 'api', actions: ['read', 'write', 'manage'] },
    { resource: 'webhooks', actions: ['read', 'write', 'delete', 'manage'] },
    { resource: 'deployments', actions: ['read', 'manage'] },
    { resource: 'logs', actions: ['read'] },
  ],
  dev: [
    { resource: 'swap', actions: ['read', 'write'] },
    { resource: 'flash-loans', actions: ['read', 'write'] },
    { resource: 'contracts', actions: ['read', 'write', 'delete'] },
    { resource: 'templates', actions: ['read', 'write'] },
    { resource: 'api', actions: ['read', 'write'] },
    { resource: 'webhooks', actions: ['read', 'write', 'delete'] },
    { resource: 'deployments', actions: ['read'] },
    { resource: 'logs', actions: ['read'] },
  ],
  user: [
    { resource: 'swap', actions: ['read', 'write'] },
    { resource: 'flash-loans', actions: ['read', 'write'] },
    { resource: 'contracts', actions: ['read', 'write'] },
    { resource: 'templates', actions: ['read'] },
  ],
}
