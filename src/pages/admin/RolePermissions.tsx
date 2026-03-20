import type { ReactNode } from 'react'
import { Shield, Eye, Pencil, Trash2, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ROLE_PERMISSIONS } from '@/types/roles'
import type { Role } from '@/types/roles'

const roleInfo: Record<Role, { color: 'brand' | 'info' | 'success'; desc: string }> = {
  admin: { color: 'brand', desc: 'Full platform access including user management, settings, and audit logs.' },
  dev: { color: 'info', desc: 'Access to all user features plus API explorer, webhooks, deployments, and logs.' },
  user: { color: 'success', desc: 'Standard access to swap, flash loans, contract builder, and templates.' },
}

const actionIcons: Record<string, ReactNode> = {
  read: <Eye size={11} />,
  write: <Pencil size={11} />,
  delete: <Trash2 size={11} />,
  manage: <Shield size={11} />,
}

export function RolePermissions() {
  const roles: Role[] = ['admin', 'dev', 'user']

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">Role Permissions</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage role definitions and access control</p>
        </div>
        <Button icon={<Plus size={13} />} size="sm" variant="outline">New Role</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {roles.map(role => (
          <Card key={role}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-brand-400" />
                <CardTitle className="capitalize">{role}</CardTitle>
              </div>
              <Badge variant={roleInfo[role].color}>{ROLE_PERMISSIONS[role].length} resources</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-4">{roleInfo[role].desc}</p>
              <div className="space-y-2">
                {ROLE_PERMISSIONS[role].map(perm => (
                  <div key={perm.resource} className="flex items-center justify-between py-1.5 border-b border-surface-600/30 last:border-0">
                    <span className="text-xs text-gray-400 capitalize">{perm.resource}</span>
                    <div className="flex items-center gap-1">
                      {perm.actions.map(action => (
                        <span
                          key={action}
                          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-surface-700 text-gray-400 border border-surface-600"
                          title={action}
                        >
                          {actionIcons[action]}
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
