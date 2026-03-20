import { useState } from 'react'
import { Search, Star, Download, Tag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Template } from '@/types'

const MOCK_TEMPLATES: Template[] = [
  { id: '1', name: 'Flash Arbitrage Bot', description: 'Multi-DEX flash loan arbitrage with automatic route detection', category: 'DeFi', downloads: 1820, stars: 234, author: 'defi_dev', tags: ['flash-loan', 'arbitrage', 'uniswap'], price_usd: 0, created_at: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: '2', name: 'Yield Optimizer', description: 'Auto-compounding yield strategy across Aave and Compound', category: 'Yield', downloads: 945, stars: 189, author: 'yield_master', tags: ['yield', 'aave', 'compound'], price_usd: 0, created_at: new Date(Date.now() - 86400000 * 20).toISOString() },
  { id: '3', name: 'NFT Sniper', description: 'Automated NFT floor price sniping with rarity analysis', category: 'NFT', downloads: 723, stars: 156, author: 'nft_hunter', tags: ['nft', 'opensea', 'blur'], price_usd: 29, created_at: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: '4', name: 'MEV Bundle Builder', description: 'Construct MEV bundles for Flashbots submission', category: 'MEV', downloads: 512, stars: 128, author: 'mev_pro', tags: ['mev', 'flashbots', 'bundle'], price_usd: 49, created_at: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: '5', name: 'LP Manager', description: 'Automated liquidity position management for Uniswap V3', category: 'DeFi', downloads: 634, stars: 112, author: 'lp_expert', tags: ['uniswap-v3', 'liquidity', 'range'], price_usd: 0, created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '6', name: 'Options Vault', description: 'On-chain covered call vault with Lyra protocol integration', category: 'Options', downloads: 289, stars: 87, author: 'options_trader', tags: ['options', 'lyra', 'vault'], price_usd: 99, created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
]

const CATEGORIES = ['All', 'DeFi', 'Yield', 'NFT', 'MEV', 'Options']

export function Templates() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = MOCK_TEMPLATES.filter(t =>
    (category === 'All' || t.category === category) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100">Template Marketplace</h1>
        <p className="text-sm text-gray-500 mt-0.5">Browse and deploy production-ready DeFi strategies</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Input
          placeholder="Search templates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          leftIcon={<Search size={14} />}
          className="sm:max-w-xs"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                category === c
                  ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                  : 'border-surface-600 text-gray-400 hover:border-surface-500'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(t => (
          <Card key={t.id} className="flex flex-col hover:border-brand-500/40 transition-colors">
            <CardContent className="flex flex-col flex-1 gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-100">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">by {t.author}</p>
                </div>
                <Badge variant="default">{t.category}</Badge>
              </div>
              <p className="text-sm text-gray-400 flex-1">{t.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {t.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-[10px] text-gray-500 bg-surface-700 border border-surface-600 rounded px-1.5 py-0.5">
                    <Tag size={9} /> {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-surface-600/30">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Star size={11} /> {t.stars}</span>
                  <span className="flex items-center gap-1"><Download size={11} /> {t.downloads}</span>
                </div>
                <Button size="sm" variant={t.price_usd === 0 ? 'primary' : 'outline'}>
                  {t.price_usd === 0 ? 'Free' : `$${t.price_usd}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
