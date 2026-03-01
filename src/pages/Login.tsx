import { Hexagon } from 'lucide-react'
import { LoginForm } from '@/components/auth/LoginForm'
import { WalletConnect } from '@/components/auth/WalletConnect'

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-900 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 mb-3">
            <Hexagon className="text-brand-400" size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-100">Welcome to gxq.studio</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to access your dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-surface-600/50 bg-surface-800 p-6 space-y-5">
          <LoginForm />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-600" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-800 px-3 text-xs text-gray-500">or continue with</span>
            </div>
          </div>

          <WalletConnect />
        </div>
      </div>
    </div>
  )
}
