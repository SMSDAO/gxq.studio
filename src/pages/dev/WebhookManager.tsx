import { useState } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import type { Webhook } from '@/types'

const MOCK_WEBHOOKS: Webhook[] = [
  { id: '1', url: 'https://api.myapp.com/webhooks/swap', events: ['swap.executed', 'swap.failed'], is_active: true, success_count: 1284, failure_count: 3, created_at: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: '2', url: 'https://notify.example.com/gxq', events: ['flash-loan.executed'], is_active: true, success_count: 89, failure_count: 0, created_at: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: '3', url: 'https://logs.corp.io/webhook', events: ['user.created', 'user.deleted'], is_active: false, success_count: 45, failure_count: 12, created_at: new Date(Date.now() - 86400000 * 7).toISOString() },
]

const EVENTS = ['swap.executed', 'swap.failed', 'flash-loan.executed', 'user.created', 'user.deleted', 'contract.deployed']

export function WebhookManager() {
  const [webhooks, setWebhooks] = useState(MOCK_WEBHOOKS)
  const [addOpen, setAddOpen] = useState(false)
  const [newUrl, setNewUrl] = useState('')

  const toggleActive = (id: string) => {
    setWebhooks(prev => prev.map(w => w.id === id ? { ...w, is_active: !w.is_active } : w))
  }

  const remove = (id: string) => {
    setWebhooks(prev => prev.filter(w => w.id !== id))
  }

  const addWebhook = () => {
    if (!newUrl) return
    const wh: Webhook = {
      id: Date.now().toString(),
      url: newUrl,
      events: ['swap.executed'],
      is_active: true,
      success_count: 0,
      failure_count: 0,
      created_at: new Date().toISOString(),
    }
    setWebhooks(prev => [...prev, wh])
    setNewUrl('')
    setAddOpen(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-100">Webhook Manager</h1>
          <p className="text-sm text-gray-500 mt-0.5">{webhooks.filter(w => w.is_active).length} active webhooks</p>
        </div>
        <Button icon={<Plus size={13} />} size="sm" onClick={() => setAddOpen(true)}>Add Webhook</Button>
      </div>

      <div className="space-y-3">
        {webhooks.map(wh => (
          <Card key={wh.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-sm text-gray-200 font-mono truncate max-w-xs">{wh.url}</code>
                    <Badge variant={wh.is_active ? 'success' : 'warning'}>{wh.is_active ? 'Active' : 'Paused'}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {wh.events.map(e => (
                      <Badge key={e} variant="default">{e}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>✓ {wh.success_count} success</span>
                    <span className={wh.failure_count > 0 ? 'text-red-400' : ''}>✗ {wh.failure_count} failed</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleActive(wh.id)} className="text-gray-500 hover:text-brand-400 transition-colors">
                    {wh.is_active ? <ToggleRight size={20} className="text-brand-400" /> : <ToggleLeft size={20} />}
                  </button>
                  <button onClick={() => remove(wh.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add Webhook">
        <div className="space-y-4">
          <Input label="Endpoint URL" value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="https://your-server.com/webhook" />
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1.5 block">Events</label>
            <div className="space-y-1.5">
              {EVENTS.map(ev => (
                <label key={ev} className="flex items-center gap-2 text-sm text-gray-400">
                  <input type="checkbox" className="accent-brand-500" defaultChecked={ev === 'swap.executed'} />
                  {ev}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={addWebhook}>Add Webhook</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
