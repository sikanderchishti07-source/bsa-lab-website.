import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Animated GC-MS style chromatogram:
 * - smooth Gaussian peaks with glow, plus a faint reference-standard channel
 * - axes with mono tick labels and a dotted grid
 * - a scanning cursor whose glowing head rides the trace, with a live RT / counts readout
 * - peaks light up and reveal compound labels as the cursor passes
 * - an oscilloscope-style noise baseline that keeps moving
 */
const W = 460
const H = 150
const PAD = { l: 34, r: 10, t: 22, b: 22 }
const IW = W - PAD.l - PAD.r
const IH = H - PAD.t - PAD.b

const peaks = [
  { rt: 1.6, h: 0.42, w: 0.09, name: 'Benzene' },
  { rt: 3.1, h: 0.66, w: 0.1, name: 'Toluene' },
  { rt: 4.7, h: 0.28, w: 0.08, name: 'Ethylbenzene' },
  { rt: 5.6, h: 0.95, w: 0.11, name: 'm/p-Xylene' },
  { rt: 7.4, h: 0.38, w: 0.09, name: 'o-Xylene' },
  { rt: 9.8, h: 0.58, w: 0.12, name: 'Naphthalene' },
]
const RT_MAX = 12

const signal = (rt: number) => peaks.reduce((s, p) => s + p.h * Math.exp(-((rt - p.rt) ** 2) / (2 * p.w ** 2)), 0)
const xOf = (rt: number) => PAD.l + (rt / RT_MAX) * IW
const yOf = (v: number) => PAD.t + IH - v * IH * 0.92

export function GCTrace() {
  const reduced = useReducedMotion()
  const cursor = useRef<SVGGElement>(null)
  const head = useRef<SVGCircleElement>(null)
  const readRt = useRef<HTMLSpanElement>(null)
  const readCt = useRef<HTMLSpanElement>(null)
  const noise = useRef<SVGPathElement>(null)
  const labelRefs = useRef<(SVGGElement | null)[]>([])

  const { path, area, ref } = useMemo(() => {
    const pts: string[] = []
    const refPts: string[] = []
    for (let i = 0; i <= 360; i++) {
      const rt = (i / 360) * RT_MAX
      const v = signal(rt) + 0.012 * Math.sin(i * 1.7) + 0.008 * Math.sin(i * 4.3)
      pts.push(`${xOf(rt).toFixed(1)},${yOf(Math.max(0, v) + 0.02).toFixed(1)}`)
      const rv = signal(rt + 0.12) * 0.55
      refPts.push(`${xOf(rt).toFixed(1)},${yOf(rv + 0.02).toFixed(1)}`)
    }
    const p = 'M' + pts.join(' L')
    return { path: p, area: `${p} L${xOf(RT_MAX)},${PAD.t + IH} L${PAD.l},${PAD.t + IH}Z`, ref: 'M' + refPts.join(' L') }
  }, [])

  useEffect(() => {
    if (reduced) return
    let raf = 0
    const start = performance.now() + 2600 // wait for the draw-in
    const period = 6500
    const tick = (now: number) => {
      const t = Math.max(0, now - start)
      const rt = ((t % period) / period) * RT_MAX
      const v = signal(rt) + 0.02
      const x = xOf(rt)
      cursor.current?.setAttribute('transform', `translate(${x} 0)`)
      head.current?.setAttribute('cy', String(yOf(v)))
      if (readRt.current) readRt.current.textContent = rt.toFixed(2).padStart(5, '0')
      if (readCt.current) readCt.current.textContent = (v * 1.32e5).toExponential(2)
      peaks.forEach((p, i) => {
        const g = labelRefs.current[i]
        if (g) g.style.opacity = rt >= p.rt - 0.05 ? '1' : '0.15'
      })
      // moving baseline noise (oscilloscope feel)
      if (noise.current) {
        let d = ''
        for (let i = 0; i <= 92; i++) {
          const nx = PAD.l + (i / 92) * IW
          const ny = PAD.t + IH - 2 + Math.sin(i * 0.9 + now / 140) * 1.4 + Math.sin(i * 2.3 + now / 90) * 0.9
          d += `${i ? 'L' : 'M'}${nx.toFixed(1)},${ny.toFixed(1)} `
        }
        noise.current.setAttribute('d', d)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const xTicks = [0, 2, 4, 6, 8, 10, 12]
  const yTicks = [0, 0.5, 1]

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#06102a]/80" dir="ltr">
      {/* header strip */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-1.5 font-mono text-[10px] text-white/50">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-500" />
          GC-MS · CH1 TIC
          <span className="text-aqua-300/80">· CH2 REF</span>
        </span>
        <span>
          RT <span ref={readRt} className="text-white/85">00.00</span> min · <span ref={readCt} className="text-lime-500">0.00e+0</span>
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="gcFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#86B42E" stopOpacity=".38" />
            <stop offset="1" stopColor="#86B42E" stopOpacity="0" />
          </linearGradient>
          <filter id="gcGlow" x="-10%" y="-30%" width="120%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="gcCursor" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#5B93D1" stopOpacity="0" />
            <stop offset=".5" stopColor="#5B93D1" stopOpacity=".9" />
            <stop offset="1" stopColor="#5B93D1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        {xTicks.map((t) => (
          <g key={`x${t}`}>
            <line x1={xOf(t)} x2={xOf(t)} y1={PAD.t} y2={PAD.t + IH} stroke="rgba(255,255,255,.06)" strokeDasharray="2 3" />
            <text x={xOf(t)} y={H - 7} textAnchor="middle" className="fill-white/35 font-mono" fontSize="8">{t}</text>
          </g>
        ))}
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={PAD.l} x2={W - PAD.r} y1={yOf(t)} y2={yOf(t)} stroke="rgba(255,255,255,.06)" strokeDasharray="2 3" />
            <text x={PAD.l - 6} y={yOf(t) + 3} textAnchor="end" className="fill-white/35 font-mono" fontSize="8">{t === 0 ? '0' : `${(t * 1.3).toFixed(1)}e5`}</text>
          </g>
        ))}
        <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={PAD.t + IH} stroke="rgba(255,255,255,.18)" />
        <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + IH} y2={PAD.t + IH} stroke="rgba(255,255,255,.18)" />

        {/* reference channel */}
        <motion.path d={ref} fill="none" stroke="#5B93D1" strokeOpacity=".45" strokeWidth="1" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 2.2, ease: 'linear' }} />
        {/* live baseline noise */}
        {!reduced && <path ref={noise} fill="none" stroke="#86B42E" strokeOpacity=".25" strokeWidth=".8" />}
        {/* main trace */}
        <motion.path d={area} fill="url(#gcFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6, duration: 0.8 }} />
        <motion.path d={path} fill="none" stroke="#9fd14a" strokeWidth="1.6" strokeLinejoin="round" filter="url(#gcGlow)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 2, ease: 'linear' }} />

        {/* peak labels */}
        {peaks.map((p, i) => {
          const x = xOf(p.rt)
          const y = yOf(p.h + 0.02)
          return (
            <motion.g key={p.name} ref={(el) => { labelRefs.current[i] = el }} initial={{ opacity: 0 }} animate={{ opacity: reduced ? 1 : 0.15 }} transition={{ delay: 2.8 + i * 0.1 }} style={{ transition: 'opacity .35s' }}>
              <line x1={x} x2={x} y1={y - 3} y2={y - 9} stroke="#86B42E" strokeWidth=".8" />
              <circle cx={x} cy={y} r="2" fill="#86B42E" />
              <text x={x} y={y - 12} textAnchor="middle" className="fill-white font-mono" fontSize="7.5">{p.name}</text>
            </motion.g>
          )
        })}

        {/* scanning cursor */}
        {!reduced && (
          <g ref={cursor} transform={`translate(${PAD.l} 0)`}>
            <rect x="-14" y={PAD.t} width="14" height={IH} fill="url(#gcCursor)" opacity=".12" />
            <line x1="0" x2="0" y1={PAD.t} y2={PAD.t + IH} stroke="url(#gcCursor)" strokeWidth="1.2" />
            <circle ref={head} cx="0" cy={PAD.t + IH} r="3.4" fill="#fff" stroke="#86B42E" strokeWidth="2" filter="url(#gcGlow)" />
          </g>
        )}
        <text x={W - PAD.r} y={PAD.t - 8} textAnchor="end" className="fill-white/35 font-mono" fontSize="8">RT (min)</text>
      </svg>
    </div>
  )
}
