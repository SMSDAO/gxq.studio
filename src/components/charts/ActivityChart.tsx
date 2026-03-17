interface DataPoint {
  label: string
  value: number
}

interface ActivityChartProps {
  data: DataPoint[]
  color?: string
  height?: number
}

export function ActivityChart({ data, color = '#0ea5e9', height = 80 }: ActivityChartProps) {
  if (data.length === 0) return null

  // Guard against max === 0 (all-zero data) to avoid NaN from division
  const max = Math.max(...data.map(d => d.value)) || 1
  const width = 500
  const padX = 8
  const padY = 8
  const chartH = height - padY * 2
  const chartW = width - padX * 2
  // Guard against divide-by-zero when there is only one data point
  const step = data.length > 1 ? chartW / (data.length - 1) : chartW

  const points = data.map((d, i) => {
    const x = padX + i * step
    const y = padY + chartH - (d.value / max) * chartH
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`
  const areaD = `${pathD} L ${padX + (data.length - 1) * step},${padY + chartH} L ${padX},${padY + chartH} Z`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#areaGrad)" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={padX + i * step}
          cy={padY + chartH - (d.value / max) * chartH}
          r="3"
          fill={color}
          opacity="0.8"
        />
      ))}
    </svg>
  )
}
