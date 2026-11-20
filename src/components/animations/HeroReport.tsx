import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import { Cpu, FlaskConical, MapPin, ShieldCheck } from 'lucide-react'
import { LeafMark } from '../brand/Logo'
import { GCTrace } from './GCTrace'
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
    <div className="relative mx-auto w-full max-w-[490px]">
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

        <div className="relative p-5 sm:p-6">
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

          <div className="mt-4"><GCTrace /></div>

          {/* readouts */}
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5" dir="ltr">
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

          {/* status pipeline */}
          <ol className="mt-4 flex items-center gap-1.5">
            {steps.map(({ I, l }, i) => (
              <motion.li key={l} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.4 + i * 0.25 }} className="flex flex-1 items-center gap-1.5">
                <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-lime-500/20 bg-lime-500/[0.06] px-2 py-1.5">
                  <I className="h-3.5 w-3.5 shrink-0 text-lime-500" />
                  <span className="truncate text-[10.5px] font-semibold text-white/85">{l}</span>
                </span>
                {i < steps.length - 1 && <span className="h-px w-2 shrink-0 bg-lime-500/40" aria-hidden />}
              </motion.li>
            ))}
          </ol>

          {/* data stream */}
          <div className="mt-3 overflow-hidden rounded-md border border-white/[0.06] bg-black/20 py-1" dir="ltr" aria-hidden>
            <div className="flex w-max animate-marquee gap-6 whitespace-nowrap font-mono text-[9.5px] text-white/40 [animation-duration:28s]">
              {[0, 1].map((k) => (
                <span key={k} className="flex gap-6">
                  <span>S/N <b className="font-medium text-lime-500/80">412</b></span>
                  <span>OVEN <b className="font-medium text-white/60">38.2°C</b></span>
                  <span>FLOW <b className="font-medium text-white/60">1.0 mL/min</b></span>
                  <span>CAL <b className="font-medium text-lime-500/80">R² 0.9996</b></span>
                  <span>BLANK <b className="font-medium text-lime-500/80">PASS</b></span>
                  <span>DUP RPD <b className="font-medium text-white/60">3.1%</b></span>
                  <span>CRM REC <b className="font-medium text-white/60">98.4%</b></span>
                  <span>QC <b className="font-medium text-lime-500/80">APPROVED</b></span>
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-dashed border-white/15 pt-3">
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
