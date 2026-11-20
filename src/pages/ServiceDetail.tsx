import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, ClipboardList, Clock, Search, Users } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { ServiceIcon } from '../components/animations/ServiceIcon'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { getService, services } from '../data/services'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  const { t, pick } = useL()
  const [q, setQ] = useState('')
  useSeo(s ? `${pick(s.title)} | BSA.lab Riyadh` : t('seo.notFound'), s ? pick(s.short) : undefined)
  const groups = useMemo(() => (s ? s.params.map((g) => ({ ...g, items: g.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.items.length) : []), [s, q])
  if (!s) return <NotFound />

  return (
    <>
      <PageHero eyebrow={t('nav.services')} title={pick(s.title)} sub={pick(s.short)} crumbs={[{ to: '/services', label: t('nav.services') }, { label: pick(s.title) }]}
        aside={
          <div className="hidden justify-center lg:flex">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="group rounded-[2rem] border border-white/15 bg-white/10 p-8 backdrop-blur">
              <div className="scale-150 p-6"><ServiceIcon icon={s.icon} size="lg" /></div>
            </motion.div>
          </div>
        }>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/contact" arrow magnetic>{t('nav.quote')}</Button>
          <Button to="/sampling" variant="outline-light">{t('common.bookSampling')}</Button>
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="container grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal><span className="eyebrow"><span className="h-[2px] w-6 bg-current" />{t('services.overview')}</span></Reveal>
            <Reveal delay={0.05}><p className="mt-5 text-xl leading-relaxed text-navy-700">{pick(s.overview)}</p></Reveal>
            <Reveal delay={0.1}>
              <div className="mt-10 rounded-3xl bg-mist-50 p-7">
                <h2 className="text-lg font-bold">{t('services.scope')}</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {pick(s.scope).split(' • ').map((x) => <li key={x} className="flex items-start gap-3 text-[15px]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />{x}</li>)}
                </ul>
              </div>
            </Reveal>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="card p-7">
              <h2 className="flex items-center gap-2 text-lg font-bold"><Users className="h-5 w-5 text-leaf-600" />{t('services.whoNeeds')}</h2>
              <ul className="mt-4 space-y-2.5 text-[15px]">{s.whoNeeds.map((w) => <li key={w.en} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />{pick(w)}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.08} className="on-dark rounded-2xl bg-navy-700 p-7 text-white">
              <h2 className="flex items-center gap-2 text-lg font-bold !text-white"><Clock className="h-5 w-5 text-lime-500" />{t('services.turnaround')}</h2>
              <p className="mt-3 text-white/80">{pick(s.turnaround)}</p>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-mist-50 py-20 lg:py-28">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t('services.parameters')}</h2>
            <label className="relative w-full max-w-sm">
              <span className="sr-only">{t('services.searchParams')}</span>
              <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('services.searchParams')} className="input ps-11" />
            </label>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {groups.map((g, i) => (
              <Reveal key={g.title.en} delay={(i % 2) * 0.06}>
                <div className="card h-full p-7">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-leaf-600 rtl:tracking-normal">{pick(g.title)}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((p) => <li key={p} dir="ltr" className="rounded-lg border border-navy-700/10 bg-white px-3 py-1.5 text-sm font-medium text-navy-700 transition hover:border-leaf-600 hover:bg-leaf-600 hover:text-white">{p}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
            {!groups.length && <p className="text-lg">{t('services.noParams')}</p>}
          </div>
          <Reveal className="mt-10">
            <div className="flex items-start gap-4 rounded-2xl border-s-4 border-leaf-600 bg-white p-6 shadow-card">
              <ClipboardList className="mt-0.5 h-6 w-6 shrink-0 text-navy-700" />
              <div><h3 className="font-bold">{t('services.samplingNotes')}</h3><p className="mt-1.5 leading-relaxed">{pick(s.sampling)}</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-2xl font-extrabold">{t('services.related')}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {s.related.map((r) => services.find((x) => x.slug === r)!).map((r) => (
              <Link key={r.slug} to={`/services/${r.slug}`} className="card group flex items-center gap-4 p-5 transition hover:-translate-y-1">
                <ServiceIcon icon={r.icon} />
                <span className="flex-1 font-bold text-navy-700">{pick(r.title)}</span>
                <ArrowUpRight className="h-5 w-5 text-leaf-600 rtl:-scale-x-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={t('services.ctaTitle')} sub={t('services.ctaSub')} />
    </>
  )
}
