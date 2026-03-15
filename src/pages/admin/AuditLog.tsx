import type { ReactNode } from 'react'
import { Shield, User, Settings, KeyRound, Activity, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { timeAgo } from '@/lib/utils'

const AUDIT_EVENTS = [
  { id: '1', actor: 'admin@gxq.studio', action: 'User created', resource: 'users', severity: 'info', timestamp: new Date(Date.now() - 600000).toISOString() },
  { id: '2', actor: 'admin@gxq.studio', action: 'Role updated', resource: 'roles', severity: 'warning', timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: '3', actor: 'dev@gxq.studio', action: 'API key created', resource: 'api', severity: 'info', timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: '4', actor: 'admin@gxq.studio', action: 'Settings changed', resource: 'settings', severity: 'warning', timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: '5', actor: 'user@gxq.studio', action: 'Login attempt failed', resource: 'auth', severity: 'danger', timestamp: new Date(Date.now() - 10800000).toISOString() },
  { id: '6', actor: 'dev@gxq.studio', action: 'Webhook deployed', resource: 'webhooks', severity: 'info', timestamp: new Date(Date.now() - 21600000).toISOString() },
  { id: '7', actor: 'admin@gxq.studio', action: 'User deleted', resource: 'users', severity: 'danger', timestamp: new Date(Date.now() - 86400000).toISOString() },
]

const resourceIcons: Record<string, ReactNode> = {
  users: <User size={13} />,
  roles: <KeyRound size={13} />,
  settings: <Settings size={13} />,
  api: <Activity size={13} />,
  auth: <Shield size={13} />,
  webhooks: <Activity size={13} />,
}

const severityVariant: Record<string, 'info' | 'warning' | 'danger'> = {
  info: 'info',
  warning: 'warning',
  danger: 'danger',
}

export function AuditLog() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">Audit Log</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track all platform activity</p>
        </div>
        <Button variant="outline" size="sm" icon={<Download size={13} />}>Export</Button>
      </div>

      <Card>
        <div className="divide-y divide-surface-600/30">
          {AUDIT_EVENTS.map(event => (
            <div key={event.id} className="flex items-start gap-4 px-5 py-3.5 hover:bg-surface-700/30 transition-colors">
              <div className="mt-0.5 p-1.5 rounded bg-surface-700 text-gray-400">
                {resourceIcons[event.resource] ?? <Activity size={13} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-200">{event.action}</span>
                  <Badge variant={severityVariant[event.severity] ?? 'info'}>{event.severity}</Badge>
                  <Badge variant="default" className="hidden sm:inline-flex">{event.resource}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{event.actor}</p>
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">{timeAgo(event.timestamp)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
