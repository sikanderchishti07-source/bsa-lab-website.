import { Atom, Beaker, BookOpen, Cpu, FlaskConical, Inbox, Microscope, ScanLine, ShieldCheck, TestTubes } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero } from '../components/layout/PageHero'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { Pending } from '../components/ui/Pending'
import { departments, equipment } from '../data/content'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const deptIcons = { organic: FlaskConical, icp: Atom, spectro: ScanLine, general: Beaker, micro: Microscope }
// TODO_REPLACE: swap these placeholder tiles for real laboratory photos (put files in /public/images/lab and set `src`).
const gallery: { src?: string; label: string; icon: typeof Beaker; tone: string }[] = [
  { label: 'Sample reception', icon: Inbox, tone: 'from-navy-700 to-navy-500' },
  { label: 'Spectrophotometry (HACH DR 3900)', icon: Beaker, tone: 'from-leaf-600 to-navy-700' },
  { label: 'ICP-MS & GC', icon: Cpu, tone: 'from-aqua-400 to-navy-700' },
  { label: 'Microbiology', icon: Microscope, tone: 'from-navy-500 to-leaf-600' },
  { label: 'Field kits', icon: TestTubes, tone: 'from-lime-500 to-leaf-600' },
  { label: 'Cold storage', icon: FlaskConical, tone: 'from-navy-900 to-aqua-400' },
]

export default function Laboratory() {
  const { t, pick } = useL()
  useSeo(t('seo.laboratory'), t('lab.sub'))
  const qa = t('lab.qa', { returnObjects: true }) as string[]
  const [open, setOpen] = useState<number | null>(null)
  return (
    <>
      <PageHero eyebrow={t('lab.eyebrow')} title={t('lab.title')} sub={t('lab.sub')} crumbs={[{ label: t('nav.laboratory') }]} />

      <section className="py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow={t('lab.eyebrow')} title={t('lab.sectionsTitle')} />
            <Reveal><Button to="/tests" variant="navy" arrow>{t('nav.fullCatalogue')}</Button></Reveal>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {departments.map((d, i) => {
              const I = deptIcons[d.icon]
              return (
                <Reveal key={d.key} delay={(i % 2) * 0.08}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-navy-700/10 bg-white shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-lift">
                    <div className="on-dark relative overflow-hidden bg-navy-700 p-7 text-white">
                      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden />
                      <div className="absolute -end-10 -top-10 h-36 w-36 rounded-full bg-leaf-600/40 blur-2xl transition-transform duration-700 group-hover:scale-150" aria-hidden />
                      <div className="relative flex items-start gap-4">
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-lime-500 ring-1 ring-white/15"><I className="h-7 w-7" strokeWidth={1.5} /></span>
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold !text-white">{pick(d.name)}</h3>
                          <dl className="mt-3 grid gap-1.5 text-sm" dir="ltr">
                            <div className="flex flex-wrap gap-x-2"><dt className="font-mono text-[11px] uppercase text-lime-500">{t('lab.instrumentLabel')}</dt><dd className="text-white/85">{d.instrument}</dd></div>
                            <div className="flex flex-wrap gap-x-2"><dt className="font-mono text-[11px] uppercase text-lime-500">{t('lab.methodsLabel')}</dt><dd className="text-white/85">{d.method}</dd></div>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="p-7">
                      <p className="mb-4 font-mono text-xs font-semibold text-leaf-600">{d.params.length} {t('lab.paramsCount')}</p>
                      <ul className="flex flex-wrap gap-2" dir="ltr">
                        {d.params.map((p) => (
                          <li key={p} className={`rounded-lg border border-navy-700/10 bg-mist-50 text-sm font-medium text-navy-700 transition hover:border-leaf-600 hover:bg-leaf-600 hover:text-white ${d.key === 'icp' ? 'grid h-10 w-10 place-items-center font-mono' : 'px-3 py-1.5'}`}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
          <Reveal className="mt-6">
            <div className="flex flex-col gap-5 rounded-3xl border-s-4 border-leaf-600 bg-aqua-100 p-7 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-700 text-white"><TestTubes className="h-7 w-7" strokeWidth={1.5} /></span>
              <div>
                <h3 className="text-xl font-bold">{t('lab.samplingTitle')}</h3>
                <p className="mt-1.5 leading-relaxed">{t('lab.samplingText')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-24">
        <div className="container">
          <SectionTitle eyebrow={t('lab.eyebrow')} title={t('lab.equipmentTitle')} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {equipment.map((e, i) => (
              <Reveal key={e.name} delay={(i % 2) * 0.06}>
                <div className="card group flex h-full items-start gap-5 p-6 transition hover:-translate-y-1 hover:border-leaf-600/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-aqua-100 font-mono text-sm font-bold text-navy-700 transition group-hover:bg-leaf-600 group-hover:text-white">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3 className="font-bold" dir="ltr">{e.name}</h3><p className="mt-1 text-[15px]">{pick(e.use)}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid gap-8 lg:grid-cols-3">
          <Reveal className="card p-8 lg:col-span-1">
            <ShieldCheck className="h-9 w-9 text-leaf-600" strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-extrabold">{t('lab.qaTitle')}</h2>
            <ul className="mt-5 space-y-3">{qa.map((q) => <li key={q} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />{q}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08} className="on-dark rounded-2xl bg-navy-700 p-8 text-white">
            <BookOpen className="h-9 w-9 text-lime-500" strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-extrabold !text-white">{t('lab.methodsTitle')}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3" dir="ltr">
              {['APHA Standard Methods', 'USEPA 200.8 / 6020B', 'USEPA 8015', 'EPA 1605', 'ISO 10390 / 11265', 'HACH LCK'].map((m) => <span key={m} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-sm font-semibold">{m}</span>)}
            </div>
          </Reveal>
          <Reveal delay={0.16} className="card p-8">
            <Inbox className="h-9 w-9 text-leaf-600" strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-extrabold">{t('lab.retentionTitle')}</h2>
            <p className="mt-4 leading-relaxed">{t('lab.retention')}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist-50 py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow={t('lab.eyebrow')} title={t('lab.galleryTitle')} />
            <p className="flex items-center gap-2 text-sm"><Pending />{t('lab.galleryNote')}</p>
          </div>
          <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((g, i) => (
              <Reveal key={g.label} delay={(i % 4) * 0.06} className={i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'lg:col-span-2' : ''}>
                <button onClick={() => setOpen(i)} className={`group relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br ${g.tone} text-start`} aria-label={g.label}>
                  {g.src ? <img src={g.src} alt={g.label} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <g.icon className="absolute end-6 top-6 h-14 w-14 text-white/25 transition duration-700 group-hover:scale-110" strokeWidth={1.2} />}
                  <div className="grain absolute inset-0" />
                  <span className="absolute bottom-5 start-5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">{g.label}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {open !== null && (
            <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-navy-900/90 p-6 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className={`relative grid aspect-video w-full max-w-4xl place-items-center overflow-hidden rounded-3xl bg-gradient-to-br ${gallery[open].tone}`}>
                {(() => { const G = gallery[open]; return G.src ? <img src={G.src} alt={G.label} className="h-full w-full object-cover" /> : <G.icon className="h-24 w-24 text-white/40" strokeWidth={1} /> })()}
                <span className="absolute bottom-6 start-6 text-lg font-bold text-white">{gallery[open].label}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <CtaBand />
    </>
  )
}
