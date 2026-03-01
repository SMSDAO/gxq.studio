export const APP_NAME = 'gxq.studio'
export const APP_VERSION = '1.0.0'

export const DEX_PROVIDERS = [
  'Uniswap', 'SushiSwap', 'Curve', 'Balancer', 'PancakeSwap',
  '1inch', 'Paraswap', 'dYdX', 'GMX', 'Trader Joe',
  'Velodrome', 'Aerodrome', 'Camelot', 'Ramses', 'Thena',
  'Quickswap', 'Kyber', 'DODO', 'Zyberswap', 'Meshswap',
] as const

export const CHAIN_IDS = {
  ETHEREUM: 1,
  POLYGON: 137,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  BASE: 8453,
  BNB: 56,
  AVALANCHE: 43114,
} as const

export const NAV_ITEMS = {
  user: [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Swap', path: '/swap', icon: 'ArrowLeftRight' },
    { label: 'Flash Loans', path: '/flash-loans', icon: 'Zap' },
    { label: 'Contract Builder', path: '/contracts', icon: 'Code2' },
    { label: 'Templates', path: '/templates', icon: 'Store' },
    { label: 'Profile', path: '/profile', icon: 'User' },
  ],
  dev: [
    { label: 'Dev Dashboard', path: '/dev', icon: 'Terminal' },
    { label: 'API Explorer', path: '/dev/api', icon: 'Globe' },
    { label: 'Webhooks', path: '/dev/webhooks', icon: 'Webhook' },
    { label: 'Deployments', path: '/dev/deployments', icon: 'Rocket' },
    { label: 'Logs', path: '/dev/logs', icon: 'ScrollText' },
  ],
  admin: [
    { label: 'Admin Dashboard', path: '/admin', icon: 'Shield' },
    { label: 'Users', path: '/admin/users', icon: 'Users' },
    { label: 'Roles', path: '/admin/roles', icon: 'KeyRound' },
    { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
    { label: 'Audit Log', path: '/admin/audit', icon: 'ClipboardList' },
  ],
} as const
