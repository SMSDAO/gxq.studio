import { useState } from 'react'
import { ArrowDown, Settings2, TrendingUp, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatsCard } from '@/components/ui/StatsCard'

const TOKENS = ['ETH', 'USDC', 'WBTC', 'MATIC', 'ARB', 'OP', 'LINK', 'UNI']
const PROVIDERS = ['Uniswap V3', '1inch', 'Paraswap', 'Curve', 'Balancer']

const routes = [
  { provider: 'Uniswap V3', price: '2,145.23', fee: '0.3%', saving: '$12.40', best: true },
  { provider: '1inch', price: '2,143.10', fee: '0%', saving: '$10.27', best: false },
  { provider: 'Paraswap', price: '2,141.88', fee: '0.1%', saving: '$9.05', best: false },
]

export function SwapInterface() {
  const [tokenIn, setTokenIn] = useState('ETH')
  const [tokenOut, setTokenOut] = useState('USDC')
  const [amountIn, setAmountIn] = useState('1')
  const [loading, setLoading] = useState(false)

  const handleSwap = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    alert('Swap simulated! (demo only)')
  }

  const flip = () => {
    setTokenIn(tokenOut)
    setTokenOut(tokenIn)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100">Swap</h1>
        <p className="text-sm text-gray-500 mt-0.5">Best-price routing across 40+ DEX providers</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard label="Active Providers" value="40+" icon={<Zap size={18} />} color="brand" />
        <StatsCard label="24h Volume" value="$2.4M" change={5.2} changeLabel="24h" icon={<TrendingUp size={18} />} color="emerald" />
        <StatsCard label="Avg Savings" value="0.8%" change={0.2} changeLabel="vs direct" icon={<Settings2 size={18} />} color="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Swap card */}
        <Card>
          <CardHeader><CardTitle>Swap Tokens</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {/* Token In */}
            <div className="rounded-lg border border-surface-600 bg-surface-700 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">From</span>
                <span className="text-xs text-gray-500">Balance: 2.45 {tokenIn}</span>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  value={amountIn}
                  onChange={e => setAmountIn(e.target.value)}
                  type="number"
                  className="border-0 bg-transparent text-lg font-semibold p-0 focus:ring-0"
                  placeholder="0.0"
                />
                <select
                  value={tokenIn}
                  onChange={e => setTokenIn(e.target.value)}
                  className="rounded-lg border border-surface-500 bg-surface-600 px-2 py-1 text-sm text-gray-200 focus:outline-none"
                >
                  {TOKENS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Flip */}
            <div className="flex justify-center">
              <button
                onClick={flip}
                className="p-1.5 rounded-full border border-surface-600 bg-surface-700 hover:border-brand-500 text-gray-400 hover:text-brand-400 transition-colors"
              >
                <ArrowDown size={16} />
              </button>
            </div>

            {/* Token Out */}
            <div className="rounded-lg border border-surface-600 bg-surface-700 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">To</span>
                <span className="text-xs text-gray-500">Balance: 4,280 {tokenOut}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-1 text-lg font-semibold text-gray-100">
                  {(parseFloat(amountIn || '0') * 2145.23).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <select
                  value={tokenOut}
                  onChange={e => setTokenOut(e.target.value)}
                  className="rounded-lg border border-surface-500 bg-surface-600 px-2 py-1 text-sm text-gray-200 focus:outline-none"
                >
                  {TOKENS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <Button className="w-full justify-center" loading={loading} onClick={handleSwap}>
              Swap {amountIn} {tokenIn} → {tokenOut}
            </Button>
          </CardContent>
        </Card>

        {/* Route comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Route Comparison</CardTitle>
            <Badge variant="brand">{PROVIDERS.length} routes</Badge>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {routes.map(r => (
              <div
                key={r.provider}
                className={`rounded-lg border p-3 ${r.best ? 'border-brand-500/50 bg-brand-500/5' : 'border-surface-600/50 bg-surface-700/30'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-200">{r.provider}</span>
                  {r.best && <Badge variant="brand">Best Price</Badge>}
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
                  <span>Price: <span className="text-gray-300">${r.price}</span></span>
                  <span>Fee: <span className="text-gray-300">{r.fee}</span></span>
                  <span>Save: <span className="text-emerald-400">{r.saving}</span></span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
