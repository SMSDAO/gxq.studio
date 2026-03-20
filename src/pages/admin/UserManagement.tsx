import { useState } from 'react'
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import type { User } from '@/types'
import { timeAgo } from '@/lib/utils'

const MOCK_USERS: User[] = [
  { id: '1', email: 'admin@gxq.studio', display_name: 'Admin User', role: 'admin', created_at: new Date(Date.now() - 86400000 * 30).toISOString(), is_active: true },
  { id: '2', email: 'dev@gxq.studio', display_name: 'Dev User', role: 'dev', created_at: new Date(Date.now() - 86400000 * 20).toISOString(), is_active: true },
  { id: '3', email: 'alice@example.com', display_name: 'Alice Johnson', role: 'user', created_at: new Date(Date.now() - 86400000 * 10).toISOString(), is_active: true },
  { id: '4', email: 'bob@example.com', display_name: 'Bob Chen', role: 'dev', created_at: new Date(Date.now() - 86400000 * 5).toISOString(), is_active: true },
  { id: '5', email: 'carol@example.com', display_name: 'Carol White', role: 'user', created_at: new Date(Date.now() - 86400000 * 2).toISOString(), is_active: false },
  { id: '6', email: 'dave@example.com', display_name: 'Dave Kumar', role: 'user', created_at: new Date(Date.now() - 86400000 * 1).toISOString(), is_active: true },
]

const roleVariant: Record<string, 'brand' | 'info' | 'success'> = {
  admin: 'brand',
  dev: 'info',
  user: 'success',
}

export function UserManagement() {
  const [users, setUsers] = useState(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)

  const filtered = users.filter(u =>
    u.display_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleDelete = (user: User) => {
    setUsers(prev => prev.filter(u => u.id !== user.id))
    setDeleteTarget(null)
  }

  const columns = [
    {
      key: 'display_name', header: 'Name',
      render: (u: User) => (
        <div>
          <p className="font-medium text-gray-200">{u.display_name}</p>
          <p className="text-xs text-gray-500">{u.email}</p>
        </div>
      ),
    },
    {
      key: 'role', header: 'Role',
      render: (u: User) => <Badge variant={roleVariant[u.role]}>{u.role}</Badge>,
    },
    {
      key: 'is_active', header: 'Status',
      render: (u: User) => <Badge variant={u.is_active ? 'success' : 'warning'}>{u.is_active ? 'Active' : 'Inactive'}</Badge>,
    },
    {
      key: 'created_at', header: 'Joined',
      render: (u: User) => <span className="text-gray-500">{timeAgo(u.created_at)}</span>,
    },
    {
      key: 'actions', header: '',
      render: (u: User) => (
        <div className="flex items-center gap-1 justify-end">
          <Button size="sm" variant="ghost" icon={<Edit size={12} />} />
          <Button size="sm" variant="ghost" icon={<Trash2 size={12} />} onClick={() => setDeleteTarget(u)} className="hover:text-red-400" />
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">{users.length} total users</p>
        </div>
        <Button icon={<UserPlus size={13} />} size="sm">Invite User</Button>
      </div>

      <Card>
        <div className="p-4 border-b border-surface-600/50">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            leftIcon={<Search size={14} />}
            className="max-w-sm"
          />
        </div>
        <Table columns={columns} data={filtered} keyField="id" emptyMessage="No users found" />
      </Card>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete User">
        <p className="text-sm text-gray-400 mb-5">
          Are you sure you want to delete <strong className="text-gray-200">{deleteTarget?.display_name}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" size="sm" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={() => deleteTarget && handleDelete(deleteTarget)}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
