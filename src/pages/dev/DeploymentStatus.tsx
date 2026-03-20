import { RefreshCw, Rocket } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StatsCard } from '@/components/ui/StatsCard'

const DEPLOYMENTS = [
  { id: '1', name: 'api-gateway', version: 'v2.4.1', environment: 'production', status: 'running', cpu: '12%', memory: '256MB', deployed_at: '2h ago', uptime: '99.9%' },
  { id: '2', name: 'swap-router', version: 'v1.8.0', environment: 'production', status: 'running', cpu: '8%', memory: '128MB', deployed_at: '5h ago', uptime: '99.8%' },
  { id: '3', name: 'flash-loan-executor', version: 'v0.9.3', environment: 'staging', status: 'deploying', cpu: '0%', memory: '0MB', deployed_at: '12m ago', uptime: 'N/A' },
  { id: '4', name: 'contract-analyzer', version: 'v0.2.1', environment: 'development', status: 'failed', cpu: '0%', memory: '0MB', deployed_at: '1d ago', uptime: 'N/A' },
  { id: '5', name: 'template-marketplace', version: 'v1.2.0', environment: 'production', status: 'running', cpu: '5%', memory: '192MB', deployed_at: '3d ago', uptime: '100%' },
  { id: '6', name: 'farcaster-frames', version: 'v0.5.0', environment: 'staging', status: 'stopped', cpu: '0%', memory: '0MB', deployed_at: '1w ago', uptime: 'N/A' },
]

const statusVariant: Record<string, 'success' | 'brand' | 'warning' | 'danger'> = {
  running: 'success',
  deploying: 'brand',
  stopped: 'warning',
  failed: 'danger',
}

const envVariant: Record<string, 'brand' | 'info' | 'default'> = {
  production: 'brand',
  staging: 'info',
  development: 'default',
}

export function DeploymentStatus() {
  const running = DEPLOYMENTS.filter(d => d.status === 'running').length
  const failed = DEPLOYMENTS.filter(d => d.status === 'failed').length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">Deployments</h1>
          <p className="text-sm text-gray-500 mt-0.5">{DEPLOYMENTS.length} total services</p>
        </div>
        <Button variant="outline" size="sm" icon={<RefreshCw size={13} />}>Refresh</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard label="Running" value={running} icon={<Rocket size={18} />} color="emerald" />
        <StatsCard label="Deploying" value={DEPLOYMENTS.filter(d => d.status === 'deploying').length} icon={<RefreshCw size={18} />} color="brand" />
        <StatsCard label="Failed" value={failed} icon={<Rocket size={18} />} color="amber" />
      </div>

      <div className="space-y-3">
        {DEPLOYMENTS.map(d => (
          <Card key={d.id}>
            <div className="flex items-center gap-4 px-5 py-4">
              <div className={`w-2 h-2 rounded-full shrink-0 ${d.status === 'running' ? 'bg-emerald-400 animate-pulse' : d.status === 'deploying' ? 'bg-brand-400 animate-pulse' : d.status === 'failed' ? 'bg-red-400' : 'bg-gray-600'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-gray-200">{d.name}</span>
                  <code className="text-xs text-gray-500 font-mono">{d.version}</code>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-gray-500 flex-wrap">
                  <span>CPU: {d.cpu}</span>
                  <span>Mem: {d.memory}</span>
                  <span>Uptime: {d.uptime}</span>
                  <span>Deployed: {d.deployed_at}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={envVariant[d.environment]}>{d.environment}</Badge>
                <Badge variant={statusVariant[d.status]}>{d.status}</Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
