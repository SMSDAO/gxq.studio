import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithWallet: (address: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Mock users for demo purposes
const MOCK_USERS: Record<string, User> = {
  admin: {
    id: '1',
    email: 'admin@gxq.studio',
    display_name: 'Admin User',
    role: 'admin',
    created_at: new Date().toISOString(),
    is_active: true,
    wallet_address: '0xAdm1n...1234',
  },
  dev: {
    id: '2',
    email: 'dev@gxq.studio',
    display_name: 'Dev User',
    role: 'dev',
    created_at: new Date().toISOString(),
    is_active: true,
    wallet_address: '0xDev...5678',
  },
  user: {
    id: '3',
    email: 'user@gxq.studio',
    display_name: 'Regular User',
    role: 'user',
    created_at: new Date().toISOString(),
    is_active: true,
    wallet_address: '0xUser...9012',
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('gxq_user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('gxq_user')
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, _password: string) => {
    const prefix = email.split('@')[0]
    const mockUser = MOCK_USERS[prefix] ?? MOCK_USERS.user
    const authed = { ...mockUser, email }
    setUser(authed)
    localStorage.setItem('gxq_user', JSON.stringify(authed))
  }

  const signInWithWallet = async (address: string) => {
    const mockUser: User = {
      id: address,
      email: `${address.slice(0, 6)}@wallet.gxq.studio`,
      display_name: `${address.slice(0, 6)}...${address.slice(-4)}`,
      wallet_address: address,
      role: 'user',
      created_at: new Date().toISOString(),
      is_active: true,
    }
    setUser(mockUser)
    localStorage.setItem('gxq_user', JSON.stringify(mockUser))
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('gxq_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signInWithWallet, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
