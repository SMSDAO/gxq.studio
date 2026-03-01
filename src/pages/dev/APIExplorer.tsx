import { useState } from 'react'
import { Play, Copy, ChevronDown, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const ENDPOINTS = [
  {
    group: 'Swap',
    color: 'emerald',
    items: [
      { method: 'GET', path: '/api/v1/swap/quote', desc: 'Get best swap quote across providers', params: '?tokenIn=ETH&tokenOut=USDC&amount=1' },
      { method: 'POST', path: '/api/v1/swap/execute', desc: 'Execute a swap transaction', params: '' },
    ],
  },
  {
    group: 'Flash Loans',
    color: 'amber',
    items: [
      { method: 'GET', path: '/api/v1/flash-loans/providers', desc: 'List available flash loan providers', params: '' },
      { method: 'POST', path: '/api/v1/flash-loans/execute', desc: 'Execute a flash loan', params: '' },
    ],
  },
  {
    group: 'Contracts',
    color: 'brand',
    items: [
      { method: 'POST', path: '/api/v1/contracts/generate', desc: 'AI-generate a smart contract', params: '' },
      { method: 'POST', path: '/api/v1/contracts/audit', desc: 'AI-audit a smart contract', params: '' },
      { method: 'POST', path: '/api/v1/contracts/deploy', desc: 'Deploy a contract to chain', params: '' },
    ],
  },
]

const methodColor: Record<string, string> = {
  GET: 'text-emerald-400 bg-emerald-500/10',
  POST: 'text-brand-400 bg-brand-500/10',
  PUT: 'text-amber-400 bg-amber-500/10',
  DELETE: 'text-red-400 bg-red-500/10',
}

export function APIExplorer() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const toggle = (key: string) => setExpanded(p => p === key ? null : key)

  const tryEndpoint = async (path: string) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setResponse(JSON.stringify({ status: 'ok', data: { message: 'Demo response', path }, timestamp: new Date().toISOString() }, null, 2))
    setLoading(false)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100">API Explorer</h1>
        <p className="text-sm text-gray-500 mt-0.5">Explore and test the gxq.studio REST API</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 space-y-4">
          {ENDPOINTS.map(group => (
            <Card key={group.group}>
              <CardHeader>
                <CardTitle>{group.group}</CardTitle>
                <Badge variant={group.color as 'brand' | 'info' | 'success' | 'warning'}>{group.items.length} endpoints</Badge>
              </CardHeader>
              <div className="divide-y divide-surface-600/30">
                {group.items.map(ep => {
                  const key = ep.path
                  const isOpen = expanded === key
                  return (
                    <div key={key}>
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-700/50 transition-colors text-left"
                        onClick={() => toggle(key)}
                      >
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-bold ${methodColor[ep.method]}`}>
                          {ep.method}
                        </span>
                        <code className="text-xs text-gray-300 flex-1">{ep.path}</code>
                        {isOpen ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 space-y-3">
                          <p className="text-sm text-gray-400">{ep.desc}</p>
                          {ep.params && (
                            <code className="block text-xs bg-surface-700 rounded p-2 text-gray-400">
                              {ep.path}{ep.params}
                            </code>
                          )}
                          <Button
                            size="sm"
                            icon={<Play size={12} />}
                            loading={loading}
                            onClick={() => tryEndpoint(ep.path)}
                          >
                            Try it
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Response</CardTitle>
              {response && <Button size="sm" variant="ghost" icon={<Copy size={12} />} onClick={() => navigator.clipboard.writeText(response ?? '')} />}
            </CardHeader>
            <CardContent className="p-0">
              {response ? (
                <pre className="p-4 text-xs font-mono text-emerald-400 overflow-auto max-h-96">
                  {response}
                </pre>
              ) : (
                <div className="p-8 text-center text-gray-600 text-sm">
                  Select an endpoint and click "Try it" to see the response
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
