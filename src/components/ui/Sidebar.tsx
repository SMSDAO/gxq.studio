import { NavLink } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard, ArrowLeftRight, Zap, Code2, Store, User,
  Terminal, Globe, Webhook, Rocket, ScrollText,
  Shield, Users, KeyRound, Settings, ClipboardList,
  ChevronLeft, ChevronRight, Hexagon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/useRole'
import type { Role } from '@/types/roles'

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, ArrowLeftRight, Zap, Code2, Store, User,
  Terminal, Globe, Webhook, Rocket, ScrollText,
  Shield, Users, KeyRound, Settings, ClipboardList,
}

interface NavItem {
  label: string
  path: string
  icon: string
}

interface NavSection {
  title: string
  items: NavItem[]
  roles: Role[]
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'User',
    roles: ['user', 'dev', 'admin'],
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
      { label: 'Swap', path: '/swap', icon: 'ArrowLeftRight' },
      { label: 'Flash Loans', path: '/flash-loans', icon: 'Zap' },
      { label: 'Contracts', path: '/contracts', icon: 'Code2' },
      { label: 'Templates', path: '/templates', icon: 'Store' },
      { label: 'Profile', path: '/profile', icon: 'User' },
    ],
  },
  {
    title: 'Developer',
    roles: ['dev', 'admin'],
    items: [
      { label: 'Dev Dashboard', path: '/dev', icon: 'Terminal' },
      { label: 'API Explorer', path: '/dev/api', icon: 'Globe' },
      { label: 'Webhooks', path: '/dev/webhooks', icon: 'Webhook' },
      { label: 'Deployments', path: '/dev/deployments', icon: 'Rocket' },
      { label: 'Logs', path: '/dev/logs', icon: 'ScrollText' },
    ],
  },
  {
    title: 'Admin',
    roles: ['admin'],
    items: [
      { label: 'Admin Panel', path: '/admin', icon: 'Shield' },
      { label: 'Users', path: '/admin/users', icon: 'Users' },
      { label: 'Roles', path: '/admin/roles', icon: 'KeyRound' },
      { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
      { label: 'Audit Log', path: '/admin/audit', icon: 'ClipboardList' },
    ],
  },
]

interface SidebarProps {
  collapsed?: boolean
  onCollapse?: (v: boolean) => void
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const { role } = useRole()

  const visibleSections = NAV_SECTIONS.filter(s => role && s.roles.includes(role))

  return (
    <aside
      className={cn(
        'flex flex-col h-full border-r border-surface-600/50 bg-surface-900 transition-all duration-300',
        collapsed ? 'w-14' : 'w-56',
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-2.5 px-4 py-5 border-b border-surface-600/50', collapsed && 'justify-center px-0')}>
        <Hexagon className="text-brand-400 shrink-0" size={24} />
        {!collapsed && (
          <span className="font-bold text-gray-100 text-lg tracking-tight">gxq<span className="text-brand-400">.studio</span></span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-6 px-2">
        {visibleSections.map(section => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map(item => {
                const Icon = iconMap[item.icon]
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === '/dev' || item.path === '/admin' || item.path === '/dashboard'}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-brand-500/10 text-brand-400'
                            : 'text-gray-400 hover:bg-surface-700 hover:text-gray-100',
                          collapsed && 'justify-center px-0 py-2.5',
                        )
                      }
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon size={16} className="shrink-0" />
                      {!collapsed && item.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      {onCollapse && (
        <button
          onClick={() => onCollapse(!collapsed)}
          className="flex items-center justify-center p-3 border-t border-surface-600/50 text-gray-500 hover:text-gray-300 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      )}
    </aside>
  )
}
