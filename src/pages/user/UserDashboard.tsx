import { ArrowLeftRight, Zap, Code2, Store, TrendingUp, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ActivityChart } from '@/components/charts/ActivityChart'
import { useAuth } from '@/contexts/AuthContext'
import { formatCurrency, timeAgo } from '@/lib/utils'

const portfolioChart = [
  { label: 'M', value: 18000 }, { label: 'T', value: 19200 }, { label: 'W', value: 17800 },
  { label: 'T', value: 21000 }, { label: 'F', value: 20500 }, { label: 'S', value: 22100 },
  { label: 'S', value: 24350 },
]

const recentTx = [
  { id: '1', type: 'swap', desc: 'ETH → USDC', amount: 2150.5, status: 'success', time: new Date(Date.now() - 1800000).toISOString() },
  { id: '2', type: 'flash-loan', desc: 'Flash Loan 50 ETH', amount: 85000, status: 'success', time: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', type: 'swap', desc: 'USDC → WBTC', amount: 5000, status: 'success', time: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', type: 'swap', desc: 'MATIC → ETH', amount: 320, status: 'failed', time: new Date(Date.now() - 172800000).toISOString() },
]

const featuredTemplates = [
  { id: '1', name: 'Flash Arb Bot', category: 'DeFi', stars: 234, downloads: 1820 },
  { id: '2', name: 'Yield Optimizer', category: 'Yield', stars: 189, downloads: 945 },
  { id: '3', name: 'NFT Sniper', category: 'NFT', stars: 156, downloads: 723 },
]

export function UserDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-100">
          Welcome back, {user?.display_name ?? 'Trader'} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">Here's your portfolio overview</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard label="Portfolio Value" value="$24,350" change={9.3} changeLabel="7d" icon={<TrendingUp size={18} />} color="emerald" />
        <StatsCard label="Total Swaps" value="142" change={5.2} changeLabel="30d" icon={<ArrowLeftRight size={18} />} color="brand" />
        <StatsCard label="Flash Loans" value="18" change={28.5} changeLabel="30d" icon={<Zap size={18} />} color="amber" />
        <StatsCard label="Contracts Built" value="7" change={0} changeLabel="30d" icon={<Code2 size={18} />} color="purple" />
      </div>

      {/* Portfolio chart + quick actions */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Value (7d)</CardTitle>
            <Badge variant="success">+9.3%</Badge>
          </CardHeader>
          <CardContent>
            <div className="mb-2">
              <span className="text-2xl font-bold text-gray-100">{formatCurrency(24350)}</span>
            </div>
            <ActivityChart data={portfolioChart} color="#10b981" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-2.5">
            {[
              { label: 'Swap Tokens', path: '/swap', icon: ArrowLeftRight, color: 'text-brand-400' },
              { label: 'Flash Loan', path: '/flash-loans', icon: Zap, color: 'text-amber-400' },
              { label: 'Build Contract', path: '/contracts', icon: Code2, color: 'text-emerald-400' },
              { label: 'Browse Templates', path: '/templates', icon: Store, color: 'text-purple-400' },
            ].map(item => (
              <Link key={item.path} to={item.path}>
                <div className="flex items-center gap-3 rounded-lg border border-surface-600/50 bg-surface-700/50 px-3 py-2.5 hover:border-brand-500/40 transition-colors">
                  <item.icon size={15} className={item.color} />
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Transactions + templates */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-gray-500" />
              <CardTitle>Recent Transactions</CardTitle>
            </div>
          </CardHeader>
          <div className="divide-y divide-surface-600/30">
            {recentTx.map(tx => (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-3">
                <div className={`p-1.5 rounded ${tx.type === 'swap' ? 'bg-brand-500/10' : 'bg-amber-500/10'}`}>
                  {tx.type === 'swap' ? <ArrowLeftRight size={14} className="text-brand-400" /> : <Zap size={14} className="text-amber-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-200">{tx.desc}</p>
                  <p className="text-xs text-gray-500">{timeAgo(tx.time)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-200">{formatCurrency(tx.amount)}</p>
                  <Badge variant={tx.status === 'success' ? 'success' : 'danger'}>{tx.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Featured Templates</CardTitle>
            <Link to="/templates"><Button size="sm" variant="ghost">All</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {featuredTemplates.map(t => (
              <div key={t.id} className="rounded-lg border border-surface-600/50 bg-surface-700/30 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-200">{t.name}</p>
                  <Badge variant="default">{t.category}</Badge>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>⭐ {t.stars}</span>
                  <span>↓ {t.downloads}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
