import { motion } from 'framer-motion'
import { BadgeCheck, FlaskConical, MapPin, ShieldCheck } from 'lucide-react'
import { LeafMark } from '../brand/Logo'
import { useL } from '../../lib/i18n-helpers'

/**
 * Hero visual: a clean "certificate of analysis" style card. Results bars fill in,
 * the status timeline completes, and a small vial sits behind as a brand accent.
 * Values are illustrative only (labelled on the card).
 */
const rows = [
  { p: 'pH', v: '7.4', u: '', pct: 52 },
  { p: 'BOD₅', v: '18', u: 'mg/L', pct: 36 },
  { p: 'COD', v: '42', u: 'mg/L', pct: 28 },
  { p: 'TSS', v: '12', u: 'mg/L', pct: 24 },
  { p: 'E. coli', v: '<1', u: 'CFU/100mL', pct: 6 },
]

export function HeroReport() {
  const { t } = useL()
  const steps = [
    { I: MapPin, l: t('home.report.s1') },
    { I: FlaskConical, l: t('home.report.s2') },
    { I: ShieldCheck, l: t('home.report.s3') },
  ]
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-aqua-400/25 blur-3xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1200 }}
        className="relative overflow-hidden rounded-[1.75rem] bg-white text-navy-700 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] ring-1 ring-white/20"
      >
        {/* letterhead band */}
        <div className="flex h-2" aria-hidden>
          <div className="w-[55%] bg-navy-700" />
          <div className="w-[28%] bg-leaf-600" />
          <div className="w-[17%] bg-lime-500" />
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-leaf-600 rtl:tracking-normal">{t('home.report.kind')}</p>
              <p className="mt-1 font-display text-base font-bold text-navy-700">{t('home.report.title')}</p>
              <p className="mt-0.5 text-xs text-ink-600" dir="ltr">BSA-2026-0412 · STP effluent</p>
            </div>
            <LeafMark className="h-8 w-auto shrink-0" />
          </div>

          <div className="mt-5 rounded-2xl border border-navy-700/10">
            <div className="grid grid-cols-[1fr_auto] border-b border-navy-700/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-600 rtl:tracking-normal">
              <span>{t('home.report.param')}</span>
              <span>{t('home.report.result')}</span>
            </div>
            <ul className="divide-y divide-navy-700/5" dir="ltr">
              {rows.map((r, i) => (
                <li key={r.p} className="px-4 py-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-navy-700">{r.p}</span>
                    <span className="flex items-center gap-2 tabular-nums">
                      <span className="font-semibold">{r.v}</span>
                      <span className="text-xs text-ink-600">{r.u}</span>
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 + i * 0.15, type: 'spring' }}>
                        <BadgeCheck className="h-4 w-4 text-leaf-600" />
                      </motion.span>
                    </span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-navy-700/5">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-leaf-600 to-lime-500" initial={{ width: 0 }} animate={{ width: `${r.pct}%` }} transition={{ delay: 1.2 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* status timeline */}
          <ol className="mt-5 grid grid-cols-3 gap-2">
            {steps.map(({ I, l }, i) => (
              <motion.li key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 + i * 0.2 }} className="flex flex-col items-center gap-1.5 rounded-xl bg-mist-50 px-2 py-3 text-center">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-700 text-white"><I className="h-4 w-4" /></span>
                <span className="text-[11px] font-semibold leading-tight text-navy-700">{l}</span>
              </motion.li>
            ))}
          </ol>

          <div className="mt-5 flex items-center justify-between border-t border-dashed border-navy-700/15 pt-4">
            <span className="text-[10px] text-ink-600">{t('home.report.note')}</span>
            <motion.span initial={{ opacity: 0, scale: 1.4, rotate: -12 }} animate={{ opacity: 1, scale: 1, rotate: -8 }} transition={{ delay: 2.9, type: 'spring', stiffness: 200, damping: 12 }} className="rounded-md border-2 border-leaf-600 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-leaf-600 rtl:tracking-normal">
              {t('home.report.stamp')}
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
