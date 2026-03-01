import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  color?: string
}

export function StatsCard({ label, value, change, changeLabel, icon, color = 'brand' }: StatsCardProps) {
  const isPositive = (change ?? 0) >= 0
  const colorMap: Record<string, string> = {
    brand: 'bg-brand-500/10 text-brand-400',
    emerald: 'bg-emerald-500/10 text-emerald-400',
    amber: 'bg-amber-500/10 text-amber-400',
    purple: 'bg-purple-500/10 text-purple-400',
    sky: 'bg-sky-500/10 text-sky-400',
  }

  return (
    <div className="rounded-xl border border-surface-600/50 bg-surface-800 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="mt-1 text-2xl font-bold text-gray-100">{value}</p>
          {change !== undefined && (
            <div className={cn('mt-1 flex items-center gap-1 text-xs', isPositive ? 'text-emerald-400' : 'text-red-400')}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{isPositive ? '+' : ''}{change}%</span>
              {changeLabel && <span className="text-gray-500">{changeLabel}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', colorMap[color] ?? colorMap.brand)}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
