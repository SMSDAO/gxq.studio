import { useState } from 'react'
import { Wallet } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'

export function WalletConnect() {
  const [loading, setLoading] = useState(false)
  const { signInWithWallet } = useAuth()
  const navigate = useNavigate()

  const handleConnect = async () => {
    setLoading(true)
    try {
      // Simulate wallet connection with mock address
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 42).padStart(40, '0')
      await signInWithWallet(mockAddress)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      loading={loading}
      onClick={handleConnect}
      icon={<Wallet size={14} />}
      className="w-full justify-center"
    >
      Connect Wallet
    </Button>
  )
}
