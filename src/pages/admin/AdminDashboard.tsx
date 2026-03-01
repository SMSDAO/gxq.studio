import { Users, Activity, DollarSign, Shield, UserPlus, Settings } from 'lucide-react'
import { StatsCard } from '@/components/ui/StatsCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ActivityChart } from '@/components/charts/ActivityChart'
import { Table } from '@/components/ui/Table'
import { Link } from 'react-router-dom'
import { timeAgo } from '@/lib/utils'

const stats = [
  { label: 'Total Users', value: '2,847', change: 12.5, changeLabel: 'vs last month', icon: <Users size={18} />, color: 'brand' },
  { label: 'Active Sessions', value: '342', change: 8.1, changeLabel: 'vs yesterday', icon: <Activity size={18} />, color: 'emerald' },
  { label: 'Monthly Revenue', value: '$48,290', change: 23.4, changeLabel: 'vs last month', icon: <DollarSign size={18} />, color: 'amber' },
  { label: 'Security Score', value: '98/100', change: 2, changeLabel: 'vs last audit', icon: <Shield size={18} />, color: 'sky' },
]

const growthData = [
  { label: 'Jan', value: 800 }, { label: 'Feb', value: 1100 }, { label: 'Mar', value: 900 },
  { label: 'Apr', value: 1400 }, { label: 'May', value: 1800 }, { label: 'Jun', value: 2100 },
  { label: 'Jul', value: 2400 }, { label: 'Aug', value: 2847 },
]

const recentUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'active', joined: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', name: 'Bob Chen', email: 'bob@example.com', role: 'dev', status: 'active', joined: new Date(Date.now() - 7200000).toISOString() },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'user', status: 'inactive', joined: new Date(Date.now() - 86400000).toISOString() },
  { id: '4', name: 'Dave Kumar', email: 'dave@example.com', role: 'dev', status: 'active', joined: new Date(Date.now() - 172800000).toISOString() },
  { id: '5', name: 'Eve Martinez', email: 'eve@example.com', role: 'user', status: 'active', joined: new Date(Date.now() - 259200000).toISOString() },
]

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email', className: 'hidden sm:table-cell' },
  {
    key: 'role', header: 'Role',
    render: (row: typeof recentUsers[0]) => (
      <Badge variant={row.role === 'dev' ? 'info' : 'default'}>{row.role}</Badge>
    ),
  },
  {
    key: 'status', header: 'Status',
    render: (row: typeof recentUsers[0]) => (
      <Badge variant={row.status === 'active' ? 'success' : 'warning'}>{row.status}</Badge>
    ),
  },
  {
    key: 'joined', header: 'Joined',
    render: (row: typeof recentUsers[0]) => timeAgo(row.joined),
  },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/users">
            <Button size="sm" icon={<UserPlus size={13} />}>Add User</Button>
          </Link>
          <Link to="/admin/settings">
            <Button size="sm" variant="outline" icon={<Settings size={13} />}>Settings</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Chart + recent */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <Badge variant="success">+12.5%</Badge>
          </CardHeader>
          <CardContent>
            <ActivityChart data={growthData} />
            <div className="flex justify-between mt-3">
              {growthData.map(d => (
                <span key={d.label} className="text-xs text-gray-600">{d.label}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {[
              { label: 'Manage Users', path: '/admin/users', icon: Users },
              { label: 'Role Permissions', path: '/admin/roles', icon: Shield },
              { label: 'System Settings', path: '/admin/settings', icon: Settings },
              { label: 'View Audit Log', path: '/admin/audit', icon: Activity },
            ].map(item => (
              <Link key={item.path} to={item.path}>
                <div className="flex items-center gap-3 rounded-lg border border-surface-600/50 bg-surface-700/50 px-3 py-2.5 hover:border-brand-500/40 transition-colors">
                  <item.icon size={15} className="text-brand-400" />
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent users */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <Link to="/admin/users">
            <Button size="sm" variant="ghost">View all</Button>
          </Link>
        </CardHeader>
        <Table columns={columns} data={recentUsers} keyField="id" />
      </Card>
    </div>
  )
}
