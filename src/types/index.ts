export type { Role } from './roles'
export type { User, UserProfile } from './user'

export interface Transaction {
  id: string
  type: 'swap' | 'flash-loan' | 'deployment'
  status: 'pending' | 'success' | 'failed'
  amount_usd: number
  token_in?: string
  token_out?: string
  tx_hash?: string
  created_at: string
}

export interface Template {
  id: string
  name: string
  description: string
  category: string
  downloads: number
  stars: number
  author: string
  tags: string[]
  price_usd: number
  created_at: string
}

export interface ApiKey {
  id: string
  name: string
  key_prefix: string
  scopes: string[]
  created_at: string
  last_used_at?: string
}

export interface Webhook {
  id: string
  url: string
  events: string[]
  is_active: boolean
  success_count: number
  failure_count: number
  created_at: string
}

export interface Deployment {
  id: string
  name: string
  environment: 'production' | 'staging' | 'development'
  status: 'running' | 'failed' | 'stopped' | 'deploying'
  version: string
  deployed_at: string
}

export interface StatsMetric {
  label: string
  value: string | number
  change: number
  changeLabel: string
  icon: string
  color: string
}
