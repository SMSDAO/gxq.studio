import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-900 px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-brand-500/30">404</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-100">Page not found</h1>
        <p className="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="outline" icon={<Home size={14} />}>Home</Button>
          </Link>
          <Button variant="ghost" icon={<ArrowLeft size={14} />} onClick={() => history.back()}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}
