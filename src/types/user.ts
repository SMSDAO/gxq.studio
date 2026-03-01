import type { Role } from './roles'

export interface User {
  id: string
  email: string
  wallet_address?: string
  display_name?: string
  avatar_url?: string
  role: Role
  created_at: string
  last_seen_at?: string
  is_active: boolean
}

export interface UserProfile extends User {
  bio?: string
  github_url?: string
  twitter_url?: string
  total_swaps: number
  total_volume_usd: number
}
