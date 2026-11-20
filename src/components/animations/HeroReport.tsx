import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import { Activity, Cpu, FlaskConical, MapPin, ShieldCheck } from 'lucide-react'
import { LeafMark } from '../brand/Logo'
import { useL } from '../../lib/i18n-helpers'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Hero visual: a dark "live analysis" instrument panel.
 * - chromatogram trace that draws itself with a scanning line
 * - parameter readouts that count up, with segmented bars, shimmer and a limit marker
 * - HUD corner brackets, grid, scan-line sweep, LIVE indicator
 * Values are illustrative only (labelled on the panel).
 */
const rows = [
  { p: 'pH', v: 7.4, dec: 1, u: '', pct: 52, lim: 75 },
  { p: 'BOD₅', v: 18, dec: 0, u: 'mg/L', pct: 36, lim: 60 },
  { p: 'COD', v: 42, dec: 0, u: 'mg/L', pct: 28, lim: 70 },
  { p: 'TSS', v: 12, dec: 0, u: 'mg/L', pct: 24, lim: 55 },
  { p: 'E. coli', v: 1, dec: 0, u: 'CFU/100mL', pct: 6, lim: 40, lt: true },
]

// chromatogram-like trace (peaks) in a 400x90 box
const TRACE =
  'M0 80 L30 79 L42 78 L48 40 L54 78 L80 79 L100 77 L108 22 L116 76 L140 79 L170 78 L176 55 L182 78 L210 79 L230 78 L238 10 L246 77 L270 79 L300 78 L306 48 L312 78 L340 79 L352 78 L358 32 L364 78 L400 79'

function Readout({ to, dec, delay, lt }: { to: number; dec: number; delay: number; lt?: boolean }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const c = animate(0, to, { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [to, delay])
  return (
    <span className="font-mono tabular-nums">
      {lt ? '<' : ''}
      {v.toFixed(dec)}
    </span>
  )
}

export function HeroReport() {
  const { t } = useL()
  const reduced = useReducedMotion()
  const steps = [
    { I: MapPin, l: t('home.report.s1') },
    { I: FlaskConical, l: t('home.report.s2') },
    { I: ShieldCheck, l: t('home.report.s3') },
  ]

  return (
    <div className="relative mx-auto w-full max-w-[470px]">
      <div className="absolute -inset-12 -z-10 rounded-full bg-aqua-400/20 blur-3xl" aria-hidden />
      <div className="absolute -bottom-10 -end-10 -z-10 h-48 w-48 rounded-full bg-leaf-600/25 blur-3xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-navy-900/75 shadow-[0_40px_90px_-30px_rgba(0,0,0,.75)] backdrop-blur-xl"
      >
        {/* grid + scanline */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden />
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 z-10 h-24 bg-gradient-to-b from-transparent via-lime-500/[0.07] to-transparent"
            initial={{ top: '-20%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', delay: 2 }}
          />
        )}
        {/* HUD corners */}
        {['top-3 start-3 border-t border-s', 'top-3 end-3 border-t border-e', 'bottom-3 start-3 border-b border-s', 'bottom-3 end-3 border-b border-e'].map((c) => (
          <span key={c} aria-hidden className={`pointer-events-none absolute h-4 w-4 border-lime-500/60 ${c}`} />
        ))}

        {/* letterhead band */}
        <div className="relative flex h-1" aria-hidden>
          <div className="w-[55%] bg-aqua-400" />
          <div className="w-[28%] bg-leaf-600" />
          <div className="w-[17%] bg-lime-500" />
        </div>

        <div className="relative p-6 sm:p-7">
          {/* header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-500 rtl:tracking-normal">
                <Cpu className="h-3.5 w-3.5" />
                {t('home.report.kind')}
              </p>
              <p className="mt-1.5 font-display text-base font-bold text-white">{t('home.report.title')}</p>
              <p className="mt-0.5 font-mono text-[11px] text-white/50" dir="ltr">ID BSA-2026-0412 · STP-EFF</p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-lime-500/40 bg-lime-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-lime-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
              </span>
              LIVE
            </span>
          </div>

          {/* chromatogram */}
          <div className="relative mt-5 overflow-hidden rounded-xl border border-white/10 bg-navy-950/60 px-3 pb-2 pt-3" dir="ltr">
            <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-white/45">
              <span className="flex items-center gap-1.5"><Activity className="h-3 w-3 text-aqua-300" />GC-MS · signal</span>
              <span>t = 0–12 min</span>
            </div>
            <svg viewBox="0 0 400 90" className="h-20 w-full" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id="trFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#86B42E" stopOpacity=".35" />
                  <stop offset="1" stopColor="#86B42E" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[22, 45, 68].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.07)" strokeDasharray="3 4" />)}
              <motion.path d={`${TRACE} L400 90 L0 90Z`} fill="url(#trFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 0.8 }} />
              <motion.path
                d={TRACE}
                fill="none"
                stroke="#86B42E"
                strokeWidth="1.6"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 2, ease: 'linear' }}
              />
              {!reduced && (
                <motion.line y1="0" y2="90" stroke="#5B93D1" strokeWidth="1" vectorEffect="non-scaling-stroke" initial={{ x1: 0, x2: 0 }} animate={{ x1: [0, 400], x2: [0, 400] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 3 }} />
              )}
            </svg>
          </div>

          {/* readouts */}
          <ul className="mt-4 space-y-3" dir="ltr">
            {rows.map((r, i) => (
              <li key={r.p}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-white/90">{r.p}</span>
                  <span className="flex items-baseline gap-1.5 text-white">
                    <span className="text-[15px] font-semibold"><Readout to={r.v} dec={r.dec} delay={1.2 + i * 0.12} lt={r.lt} /></span>
                    <span className="font-mono text-[10px] text-white/45">{r.u}</span>
                  </span>
                </div>
                <div className="relative mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                  <motion.div
                    className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-leaf-600 via-leaf-500 to-lime-500"
                    initial={{ width: 0 }}
                    animate={reduced ? { width: `${r.pct}%` } : { width: ['0%', `${r.pct}%`, `${r.pct - 3}%`, `${r.pct}%`] }}
                    transition={reduced ? { duration: 0 } : { delay: 1.2 + i * 0.12, duration: 4, times: [0, 0.3, 0.65, 1], ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', repeatDelay: 0.5 }}
                  >
                    <div className="absolute inset-0 [background-image:repeating-linear-gradient(90deg,transparent_0_5px,rgba(11,26,56,.55)_5px_6px)]" />
                    {!reduced && (
                      <motion.div className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/70 to-transparent" initial={{ left: '-30%' }} animate={{ left: '130%' }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 2 + i * 0.25, repeatDelay: 1.2 }} />
                    )}
                  </motion.div>
                  <span className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-white/50" style={{ left: `${r.lim}%` }} aria-hidden />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 flex items-center gap-2 font-mono text-[10px] text-white/40 rtl:font-arabic">
            <span className="h-2.5 w-px bg-white/50" /> {t('home.report.limit')}
          </p>

          {/* status timeline */}
          <ol className="relative mt-5 grid grid-cols-3 gap-2">
            {steps.map(({ I, l }, i) => (
              <motion.li key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 + i * 0.25 }} className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-leaf-600/20 text-lime-500 ring-1 ring-lime-500/30"><I className="h-4 w-4" /></span>
                <span className="text-[11px] font-semibold leading-tight text-white/85">{l}</span>
              </motion.li>
            ))}
          </ol>

          <div className="mt-5 flex items-center justify-between border-t border-dashed border-white/15 pt-4">
            <span className="flex items-center gap-2 text-[10px] text-white/45">
              <LeafMark className="h-4 w-auto" />
              {t('home.report.note')}
            </span>
            <motion.span initial={{ opacity: 0, scale: 1.5, rotate: -14 }} animate={{ opacity: 1, scale: 1, rotate: -6 }} transition={{ delay: 3.2, type: 'spring', stiffness: 200, damping: 12 }} className="rounded-md border-2 border-lime-500 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-lime-500 rtl:font-arabic rtl:text-xs shadow-[0_0_20px_-4px_rgba(134,180,46,.6)] rtl:tracking-normal">
              {t('home.report.stamp')}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
