import { Beaker, BookOpen, Cpu, FlaskConical, Inbox, Microscope, ShieldCheck, TestTubes } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { Pending } from '../components/ui/Pending'
import { equipment } from '../data/content'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const sectionIcons = [Inbox, Beaker, Cpu, Microscope]
// TODO_REPLACE: swap these placeholder tiles for real laboratory photos (put files in /public/images/lab and set `src`).
const gallery: { src?: string; label: string; icon: typeof Beaker; tone: string }[] = [
  { label: 'Sample reception', icon: Inbox, tone: 'from-navy-700 to-navy-500' },
  { label: 'Wet chemistry bench', icon: Beaker, tone: 'from-leaf-600 to-navy-700' },
  { label: 'ICP / GC-MS room', icon: Cpu, tone: 'from-aqua-400 to-navy-700' },
  { label: 'Microbiology', icon: Microscope, tone: 'from-navy-500 to-leaf-600' },
  { label: 'Field kits', icon: TestTubes, tone: 'from-lime-500 to-leaf-600' },
  { label: 'Cold storage', icon: FlaskConical, tone: 'from-navy-900 to-aqua-400' },
]

export default function Laboratory() {
  const { t, pick } = useL()
  useSeo(t('seo.laboratory'), t('lab.sub'))
  const sections = t('lab.sections', { returnObjects: true }) as { t: string; d: string }[]
  const qa = t('lab.qa', { returnObjects: true }) as string[]
  const [open, setOpen] = useState<number | null>(null)
  return (
    <>
      <PageHero eyebrow={t('lab.eyebrow')} title={t('lab.title')} sub={t('lab.sub')} crumbs={[{ label: t('nav.laboratory') }]} />

      <section className="py-24">
        <div className="container">
          <SectionTitle eyebrow={t('lab.eyebrow')} title={t('lab.sectionsTitle')} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((s, i) => {
              const I = sectionIcons[i]
              return (
                <Reveal key={s.t} delay={i * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-3xl bg-navy-700 p-7 text-white">
                    <div className="absolute -end-8 -top-8 h-28 w-28 rounded-full bg-leaf-600/40 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                    <I className="relative h-9 w-9 text-lime-500" strokeWidth={1.5} />
                    <h3 className="relative mt-6 text-xl font-bold !text-white">{s.t}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-white/75">{s.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle eyebrow={t('lab.eyebrow')} title={t('lab.equipmentTitle')} />
            <p className="flex items-center gap-2 text-sm"><Pending />{t('lab.equipmentNote')}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((e, i) => (
              <Reveal key={e.name} delay={(i % 4) * 0.06}>
                <div className="card group flex h-full items-start gap-4 p-6 transition hover:-translate-y-1 hover:border-leaf-600/40">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-aqua-100 font-display text-sm font-extrabold text-navy-700 transition group-hover:bg-leaf-600 group-hover:text-white">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3 className="font-bold" dir="ltr">{e.name}</h3><p className="mt-1 text-sm">{pick(e.use)}</p></div>
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
              {['APHA Standard Methods', 'ASTM', 'US EPA', 'ISO'].map((m) => <span key={m} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-sm font-semibold">{m}</span>)}
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
