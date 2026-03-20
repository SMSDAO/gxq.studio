import { Link } from 'react-router-dom'
import {
  ArrowLeftRight, Zap, Code2, Store, Shield, Globe,
  ChevronRight, Hexagon, Github, Twitter, Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const features = [
  { icon: ArrowLeftRight, title: '40+ DEX Routing', desc: 'Best-price routing across Uniswap, Curve, Balancer, SushiSwap and 40+ more providers.', color: 'text-brand-400', bg: 'bg-brand-500/10' },
  { icon: Zap, title: 'Flash Loans', desc: 'Zero-collateral flash loans with built-in arbitrage and liquidation strategies.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Code2, title: 'AI Contract Builder', desc: 'Generate, audit, and deploy smart contracts with AI assistance.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Store, title: 'Template Marketplace', desc: 'Browse, publish, and monetize DeFi strategy templates.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { icon: Shield, title: 'Multi-tenant SaaS', desc: 'Full role-based access control with Admin, Dev, and User permission tiers.', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { icon: Globe, title: 'Farcaster Frames', desc: 'Embed DeFi actions directly in Farcaster social feeds.', color: 'text-pink-400', bg: 'bg-pink-500/10' },
]

const stats = [
  { label: 'DEX Providers', value: '40+' },
  { label: 'Chains Supported', value: '7' },
  { label: 'Templates', value: '200+' },
  { label: 'Uptime', value: '99.9%' },
]

export function Landing() {
  return (
    <div className="min-h-screen bg-surface-900 text-gray-100 overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-40 border-b border-surface-700/50 bg-surface-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <Hexagon className="text-brand-400" size={22} />
            <span className="font-bold text-gray-100">gxq<span className="text-brand-400">.studio</span></span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://github.com/SMSDAO/gxq.studio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-200 transition-colors">
              <Github size={18} />
            </a>
            <Link to="/login">
              <Button size="sm">Launch App</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="brand" className="mb-6">v1.0.0 — Production Ready</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            The DeFi Infrastructure<br />
            <span className="gradient-text">Platform</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Complete monorepo featuring wallet authentication, best-price routing across 40+ DEX providers,
            flash loans, AI contract builder, template marketplace, and Farcaster Frames.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/login">
              <Button size="lg" icon={<ChevronRight size={16} />}>
                Get Started
              </Button>
            </Link>
            <a href="https://github.com/SMSDAO/gxq.studio" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" icon={<Github size={16} />}>
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-surface-700/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-gray-100">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">Everything you need</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              A complete, production-ready platform built for DeFi developers and traders.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(f => (
              <div key={f.title} className="rounded-xl border border-surface-600/50 bg-surface-800 p-6 hover:border-brand-500/40 transition-colors group">
                <div className={`inline-flex p-2.5 rounded-lg ${f.bg} mb-4`}>
                  <f.icon className={f.color} size={20} />
                </div>
                <h3 className="font-semibold text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-2xl border border-brand-500/30 bg-brand-500/5 p-10">
            <Star className="text-brand-400 mx-auto mb-4" size={32} />
            <h2 className="text-2xl font-bold text-gray-100 mb-3">Ready to build?</h2>
            <p className="text-gray-400 mb-6">Start building on the most complete DeFi infrastructure platform.</p>
            <Link to="/login">
              <Button size="lg" icon={<ChevronRight size={16} />}>Launch App</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-700/50 py-8 px-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Hexagon className="text-brand-400" size={18} />
            <span className="text-sm text-gray-500">gxq.studio © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <a href="https://github.com/SMSDAO/gxq.studio" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Github size={16} />
            </a>
            <a href="https://twitter.com/gxqstudio" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
              <Twitter size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
