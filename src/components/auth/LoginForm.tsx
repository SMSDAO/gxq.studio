import { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid credentials. Try admin@, dev@, or user@ with any password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="admin@gxq.studio"
        value={email}
        onChange={e => setEmail(e.target.value)}
        leftIcon={<Mail size={14} />}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={e => setPassword(e.target.value)}
        leftIcon={<Lock size={14} />}
        required
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <Button type="submit" loading={loading} className="w-full justify-center" icon={<ArrowRight size={14} />}>
        Sign In
      </Button>
      <p className="text-xs text-center text-gray-500">
        Demo: use <span className="text-brand-400">admin@</span>, <span className="text-brand-400">dev@</span>, or <span className="text-brand-400">user@gxq.studio</span> with any password
      </p>
    </form>
  )
}
