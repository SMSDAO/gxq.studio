import { Globe, Webhook, Rocket, ScrollText, Activity, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ActivityChart } from '@/components/charts/ActivityChart'

const apiCallData = [
  { label: 'Mon', value: 12400 }, { label: 'Tue', value: 15600 }, { label: 'Wed', value: 13200 },
  { label: 'Thu', value: 18900 }, { label: 'Fri', value: 22100 }, { label: 'Sat', value: 16800 },
  { label: 'Sun', value: 19450 },
]

const recentDeploys = [
  { id: '1', name: 'api-gateway', env: 'production', status: 'running', version: 'v2.4.1', time: '2h ago' },
  { id: '2', name: 'swap-router', env: 'production', status: 'running', version: 'v1.8.0', time: '5h ago' },
  { id: '3', name: 'flash-loan-executor', env: 'staging', status: 'deploying', version: 'v0.9.3', time: '12m ago' },
  { id: '4', name: 'contract-analyzer', env: 'development', status: 'failed', version: 'v0.2.1', time: '1d ago' },
]

const statusVariant: Record<string, 'success' | 'brand' | 'warning' | 'danger'> = {
  running: 'success',
  deploying: 'brand',
  stopped: 'warning',
  failed: 'danger',
}

export function DevDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-100">Developer Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Monitor APIs, webhooks, and deployments</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard label="API Calls (24h)" value="118.5K" change={12.3} changeLabel="24h" icon={<Globe size={18} />} color="brand" />
        <StatsCard label="Active Webhooks" value="23" change={4.3} changeLabel="7d" icon={<Webhook size={18} />} color="emerald" />
        <StatsCard label="Deployments (7d)" value="18" change={-5} changeLabel="7d" icon={<Rocket size={18} />} color="amber" />
        <StatsCard label="Error Rate" value="0.12%" change={-2.1} changeLabel="24h" icon={<Activity size={18} />} color="sky" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>API Calls (7d)</CardTitle>
            <Badge variant="brand">118.5K today</Badge>
          </CardHeader>
          <CardContent>
            <ActivityChart data={apiCallData} color="#0ea5e9" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Quick Links</CardTitle></CardHeader>
          <CardContent className="space-y-2.5">
            {[
              { label: 'API Explorer', path: '/dev/api', icon: Globe },
              { label: 'Webhooks', path: '/dev/webhooks', icon: Webhook },
              { label: 'Deployments', path: '/dev/deployments', icon: Rocket },
              { label: 'System Logs', path: '/dev/logs', icon: ScrollText },
            ].map(item => (
              <Link key={item.path} to={item.path}>
                <div className="flex items-center gap-3 rounded-lg border border-surface-600/50 bg-surface-700/50 px-3 py-2.5 hover:border-brand-500/40 transition-colors">
                  <item.icon size={15} className="text-brand-400" />
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp size={15} className="text-gray-500" />
            <CardTitle>Recent Deployments</CardTitle>
          </div>
          <Link to="/dev/deployments">
            <Button size="sm" variant="ghost">View all</Button>
          </Link>
        </CardHeader>
        <div className="divide-y divide-surface-600/30">
          {recentDeploys.map(d => (
            <div key={d.id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-200">{d.name}</p>
                <p className="text-xs text-gray-500">{d.version} · {d.time}</p>
              </div>
              <Badge variant={statusVariant[d.status]}>{d.status}</Badge>
              <Badge variant={d.env === 'production' ? 'brand' : d.env === 'staging' ? 'info' : 'default'}>
                {d.env}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
