import { useState } from 'react'
import { Zap, AlertTriangle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { StatsCard } from '@/components/ui/StatsCard'

const strategies = [
  { id: 'arb', name: 'DEX Arbitrage', desc: 'Exploit price differences between DEX pairs', risk: 'medium', profit: '~0.5%' },
  { id: 'liq', name: 'Liquidation', desc: 'Liquidate undercollateralized positions', risk: 'low', profit: '~5-10%' },
  { id: 'colswap', name: 'Collateral Swap', desc: 'Swap collateral without closing position', risk: 'low', profit: 'N/A' },
]

export function FlashLoans() {
  const [amount, setAmount] = useState('10')
  const [token, setToken] = useState('ETH')
  const [strategy, setStrategy] = useState('arb')
  const [loading, setLoading] = useState(false)

  const handleExecute = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    alert('Flash loan simulated! (demo only)')
  }

  const riskVariant: Record<string, 'success' | 'warning' | 'danger'> = {
    low: 'success', medium: 'warning', high: 'danger',
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100">Flash Loans</h1>
        <p className="text-sm text-gray-500 mt-0.5">Zero-collateral loans repaid in a single transaction</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatsCard label="Max Flash Loan" value="50,000 ETH" icon={<Zap size={18} />} color="amber" />
        <StatsCard label="Your Loans (30d)" value="18" change={28.5} changeLabel="30d" icon={<TrendingUp size={18} />} color="brand" />
        <StatsCard label="Protocol Fee" value="0.09%" icon={<AlertTriangle size={18} />} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader><CardTitle>Configure Flash Loan</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                label="Amount"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="flex-1"
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-300">Token</label>
                <select
                  value={token}
                  onChange={e => setToken(e.target.value)}
                  className="rounded-lg border border-surface-600 bg-surface-700 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {['ETH', 'USDC', 'DAI', 'WBTC'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Strategy</label>
              <div className="space-y-2">
                {strategies.map(s => (
                  <label key={s.id} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="strategy"
                      value={s.id}
                      checked={strategy === s.id}
                      onChange={() => setStrategy(s.id)}
                      className="mt-1 accent-brand-500"
                    />
                    <div className="flex-1 rounded-lg border border-surface-600 bg-surface-700/50 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-200">{s.name}</span>
                        <Badge variant={riskVariant[s.risk]}>{s.risk} risk</Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2">
              <AlertTriangle size={14} className="text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-300">Flash loans must be repaid within the same transaction. Ensure your strategy is profitable after fees.</p>
            </div>

            <Button className="w-full justify-center" loading={loading} onClick={handleExecute} icon={<Zap size={14} />}>
              Execute Flash Loan
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Loan Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Borrow Amount', value: `${amount} ${token}` },
                { label: 'Protocol Fee (0.09%)', value: `${(parseFloat(amount || '0') * 0.0009).toFixed(4)} ${token}` },
                { label: 'Repay Amount', value: `${(parseFloat(amount || '0') * 1.0009).toFixed(4)} ${token}` },
                { label: 'Strategy', value: strategies.find(s => s.id === strategy)?.name ?? '' },
                { label: 'Est. Profit', value: strategies.find(s => s.id === strategy)?.profit ?? 'N/A' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between py-2 border-b border-surface-600/30 last:border-0">
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm font-medium text-gray-200">{row.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
