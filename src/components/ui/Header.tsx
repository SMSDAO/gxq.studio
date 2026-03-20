import { Bell, Search, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Badge } from './Badge'
import type { Role } from '@/types/roles'

const roleBadge: Record<Role, { label: string; variant: 'brand' | 'info' | 'success' }> = {
  admin: { label: 'Admin', variant: 'brand' },
  dev: { label: 'Dev', variant: 'info' },
  user: { label: 'User', variant: 'success' },
}

interface HeaderProps {
  title?: string
}

export function Header({ title }: HeaderProps) {
  const { user, signOut } = useAuth()

  const badge = user?.role ? roleBadge[user.role] : null

  return (
    <header className="flex items-center justify-between px-6 py-3.5 border-b border-surface-600/50 bg-surface-900">
      <div className="flex items-center gap-3">
        {title && <h1 className="text-sm font-semibold text-gray-100">{title}</h1>}
        <div className="hidden sm:flex items-center gap-2 bg-surface-700 rounded-lg px-3 py-1.5 text-xs text-gray-500">
          <Search size={13} />
          <span>Search...</span>
          <span className="ml-2 border border-surface-500 rounded px-1 text-[10px]">⌘K</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative text-gray-500 hover:text-gray-300 transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-surface-600">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
            {user?.display_name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-gray-200">{user?.display_name ?? 'Unknown'}</p>
            {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
          </div>
          <ChevronDown size={14} className="text-gray-500" />
        </div>
        <button onClick={signOut} className="text-gray-500 hover:text-red-400 transition-colors" title="Sign out">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  )
}
