import { useState } from 'react'
import { Download, Filter, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const LOG_LEVELS = ['all', 'info', 'warn', 'error', 'debug']

const LOGS = [
  { id: '1', level: 'info', service: 'api-gateway', message: 'Request received: GET /api/v1/swap/quote', timestamp: new Date(Date.now() - 5000).toISOString() },
  { id: '2', level: 'info', service: 'swap-router', message: 'Best route found: Uniswap V3 → $2145.23', timestamp: new Date(Date.now() - 8000).toISOString() },
  { id: '3', level: 'warn', service: 'flash-loan-executor', message: 'High latency detected on Aave provider: 2.3s', timestamp: new Date(Date.now() - 15000).toISOString() },
  { id: '4', level: 'error', service: 'contract-analyzer', message: 'Failed to connect to compilation service: ECONNREFUSED', timestamp: new Date(Date.now() - 60000).toISOString() },
  { id: '5', level: 'info', service: 'api-gateway', message: 'POST /api/v1/swap/execute - 200 OK - 342ms', timestamp: new Date(Date.now() - 90000).toISOString() },
  { id: '6', level: 'debug', service: 'swap-router', message: 'Fetching quotes from 40 providers in parallel', timestamp: new Date(Date.now() - 120000).toISOString() },
  { id: '7', level: 'info', service: 'template-marketplace', message: 'Template "Flash Arb Bot" downloaded by user abc123', timestamp: new Date(Date.now() - 180000).toISOString() },
  { id: '8', level: 'warn', service: 'api-gateway', message: 'Rate limit exceeded for IP 192.168.1.100', timestamp: new Date(Date.now() - 240000).toISOString() },
  { id: '9', level: 'error', service: 'contract-analyzer', message: 'Solidity compilation failed: TypeError line 42', timestamp: new Date(Date.now() - 300000).toISOString() },
  { id: '10', level: 'info', service: 'farcaster-frames', message: 'Frame interaction processed: swap action', timestamp: new Date(Date.now() - 360000).toISOString() },
]

const levelColor: Record<string, string> = {
  info: 'text-sky-400',
  warn: 'text-amber-400',
  error: 'text-red-400',
  debug: 'text-gray-500',
}
const levelBg: Record<string, 'info' | 'warning' | 'danger' | 'default'> = {
  info: 'info',
  warn: 'warning',
  error: 'danger',
  debug: 'default',
}

export function Logs() {
  const [level, setLevel] = useState('all')

  const filtered = LOGS.filter(l => level === 'all' || l.level === level)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">System Logs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real-time log viewer</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" icon={<RefreshCw size={13} />} />
          <Button variant="outline" size="sm" icon={<Download size={13} />}>Export</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-gray-500" />
        {LOG_LEVELS.map(l => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-3 py-1 rounded-full text-xs font-medium border capitalize transition-colors ${
              level === l
                ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                : 'border-surface-600 text-gray-400 hover:border-surface-500'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <Card>
        <div className="font-mono text-xs divide-y divide-surface-700/50">
          {filtered.map(log => (
            <div key={log.id} className="flex items-start gap-4 px-4 py-2.5 hover:bg-surface-700/30 transition-colors">
              <span className="text-gray-600 shrink-0 mt-0.5">
                {new Date(log.timestamp).toLocaleTimeString()}
              </span>
              <Badge variant={levelBg[log.level]} className="shrink-0 mt-0.5">{log.level}</Badge>
              <span className="text-brand-400/70 shrink-0">[{log.service}]</span>
              <span className={`flex-1 ${levelColor[log.level]}`}>{log.message}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
