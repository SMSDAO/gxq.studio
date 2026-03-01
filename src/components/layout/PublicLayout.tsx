import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-surface-900">
      <Outlet />
    </div>
  )
}
