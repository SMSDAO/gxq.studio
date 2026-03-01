import { useState } from 'react'
import { Sparkles, Copy, Download, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const TEMPLATES = [
  { id: 'erc20', label: 'ERC-20 Token' },
  { id: 'erc721', label: 'ERC-721 NFT' },
  { id: 'flashloan', label: 'Flash Loan' },
  { id: 'multisig', label: 'Multisig Wallet' },
]

const SAMPLE_CONTRACT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GXQToken
 * @dev ERC-20 token with minting and burning capabilities
 */
contract GXQToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10**18;

    constructor() ERC20("GXQ Token", "GXQ") Ownable(msg.sender) {
        _mint(msg.sender, 10_000_000 * 10**18);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}`

export function ContractBuilder() {
  const [prompt, setPrompt] = useState('')
  const [template, setTemplate] = useState('erc20')
  const [generating, setGenerating] = useState(false)
  const [code] = useState(SAMPLE_CONTRACT)

  const handleGenerate = async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 2000))
    setGenerating(false)
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-100">AI Contract Builder</h1>
        <p className="text-sm text-gray-500 mt-0.5">Generate, audit, and deploy smart contracts with AI</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Build Contract</CardTitle>
            <Badge variant="brand">AI Powered</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-1.5 block">Template</label>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                      template === t.id
                        ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                        : 'border-surface-600 bg-surface-700 text-gray-400 hover:border-surface-500'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Describe your contract</label>
              <textarea
                className="rounded-lg border border-surface-600 bg-surface-700 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                rows={4}
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="e.g. Create a staking contract that allows users to stake ETH and earn 5% APY, with a 7-day lock period..."
              />
            </div>

            <Button
              className="w-full justify-center"
              loading={generating}
              icon={<Sparkles size={14} />}
              onClick={handleGenerate}
            >
              Generate Contract
            </Button>
          </CardContent>
        </Card>

        {/* Code output */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Contract</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" icon={<Copy size={12} />} onClick={() => navigator.clipboard.writeText(code)} />
              <Button size="sm" variant="ghost" icon={<Download size={12} />} />
              <Button size="sm" icon={<Play size={12} />}>Deploy</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="overflow-x-auto p-4 text-xs font-mono text-gray-300 leading-relaxed max-h-96 overflow-y-auto">
              <code className="language-solidity">{code}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
