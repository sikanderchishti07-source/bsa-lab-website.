import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BadgeCheck, CheckCircle2, ClipboardList, Clock, FileCheck2, FlaskConical, Layers, MessageSquareText, Phone, Scale, Search, Truck, Users } from 'lucide-react'
import { CtaBand } from '../components/layout/CtaBand'
import { serviceIconMap } from '../components/animations/ServiceIcon'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { getService, services } from '../data/services'
import { limits } from '../data/limits'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'
import { getLenis } from '../hooks/useLenis'
import NotFound from './NotFound'

const SECTIONS = ['overview', 'process', 'parameters', 'sampling', 'limits'] as const
type SectionId = (typeof SECTIONS)[number]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 140
  const l = getLenis()
  if (l) l.scrollTo(y, { duration: 1 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = getService(slug)
  const { t, pick } = useL()
  const [q, setQ] = useState('')
  const [active, setActive] = useState<SectionId>('overview')
  useSeo(s ? `${pick(s.title)} | BSA.lab Riyadh` : t('seo.notFound'), s ? pick(s.short) : undefined)

  const groups = useMemo(
    () => (s ? s.params.map((g) => ({ ...g, items: g.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.items.length) : []),
    [s, q],
  )
  const scenarioLimits = s?.limitScenario ? limits.filter((l) => l.scenario === s.limitScenario) : []
  const sections = SECTIONS.filter((id) => id !== 'limits' || scenarioLimits.length)
  const paramTotal = s ? new Set(s.params.flatMap((g) => g.items)).size : 0

  // highlight the section currently in view
  useEffect(() => {
    const els = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId)), { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [slug, sections.length]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!s) return <NotFound />
  const Icon = serviceIconMap[s.icon]
  const steps = t('serviceDetail.steps', { returnObjects: true }) as { t: string; d: string }[]
  const stepIcons = [MessageSquareText, Truck, FlaskConical, FileCheck2]
  const related = s.related.map((r) => services.find((x) => x.slug === r)).filter(Boolean) as typeof services
  const facts = [
    { I: Layers, k: t('serviceDetail.factParams'), v: `${paramTotal}` },
    { I: Clock, k: t('services.turnaround'), v: pick(s.turnaround) },
    { I: Scale, k: t('services.limitsEyebrow'), v: scenarioLimits.length ? t('serviceDetail.limitsYes') : t('serviceDetail.limitsOnRequest') },
    { I: BadgeCheck, k: t('serviceDetail.factQuality'), v: t('serviceDetail.factQualityV') },
  ]

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="on-dark relative overflow-hidden bg-navy-700 text-white">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" aria-hidden />
        <div className="absolute -bottom-40 -start-40 h-96 w-96 rounded-full bg-aqua-400/20 blur-3xl" aria-hidden />
        <div className="container relative grid gap-12 pb-16 pt-32 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end lg:pb-20 lg:pt-40">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/60">
              <Link to="/" className="hover:text-white">{t('nav.home')}</Link><span aria-hidden>/</span>
              <Link to="/services" className="hover:text-white">{t('nav.services')}</Link><span aria-hidden>/</span>
              <span className="text-white/90">{pick(s.title)}</span>
            </nav>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-lime-500 rtl:font-arabic rtl:tracking-normal">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              {s.category === 'program' ? t('services.groupProgram') : t('services.groupMatrix')}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mt-4 text-4xl font-extrabold leading-[1.05] !text-white [text-wrap:balance] sm:text-5xl lg:text-[3.6rem] rtl:leading-[1.3]">
              {pick(s.title)}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {pick(s.short)}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" arrow magnetic>{t('nav.quote')}</Button>
              <Button href={site.phoneHref} variant="outline-light" size="lg"><span className="flex items-center gap-2"><Phone className="h-4 w-4" /><span dir="ltr">{site.phone}</span></span></Button>
            </motion.div>
          </div>

          {/* at a glance */}
          <motion.aside initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="rounded-2xl bg-white p-6 text-navy-700 shadow-[0_30px_80px_-30px_rgba(0,0,0,.6)] sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-600 rtl:font-arabic rtl:tracking-normal">{t('serviceDetail.atGlance')}</p>
            <dl className="mt-4 divide-y divide-navy-700/10">
              {facts.map(({ I, k, v }) => (
                <div key={k} className="flex items-start gap-4 py-3.5">
                  <I className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" strokeWidth={1.75} />
                  <div className="min-w-0">
                    <dt className="text-xs text-ink-600">{k}</dt>
                    <dd className="mt-0.5 text-sm font-semibold leading-snug">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </section>

      {/* ---------- STICKY SECTION NAV ---------- */}
      <div className="sticky top-[72px] z-30 border-b border-navy-700/10 bg-white/90 backdrop-blur-xl">
        <div className="container flex items-center justify-between gap-6">
          <nav aria-label={t('serviceDetail.onThisPage')} className="-mb-px flex gap-1 overflow-x-auto">
            {sections.map((id) => (
              <button key={id} onClick={() => scrollToId(id)} aria-current={active === id ? 'true' : undefined} className={`whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold transition ${active === id ? 'border-leaf-600 text-navy-700' : 'border-transparent text-ink-600 hover:text-navy-700'}`}>
                {t(`serviceDetail.nav.${id}`)}
              </button>
            ))}
          </nav>
          <Link to="/contact" className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-leaf-600 hover:underline md:inline-flex">{t('nav.quote')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" /></Link>
        </div>
      </div>

      {/* ---------- OVERVIEW ---------- */}
      <section id="overview" className="scroll-mt-40 py-20 lg:py-24">
        <div className="container grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <Reveal><span className="eyebrow"><span className="h-[2px] w-6 bg-current" />{t('services.overview')}</span></Reveal>
            <Reveal delay={0.05}><p className="mt-5 text-xl leading-relaxed text-navy-700 sm:text-2xl sm:leading-relaxed">{pick(s.overview)}</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-12 text-lg font-bold">{t('services.scope')}</h2>
              <ul className="mt-5 grid gap-x-8 gap-y-3 border-t border-navy-700/10 pt-5 sm:grid-cols-2">
                {pick(s.scope).split(' • ').map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[15px]"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />{x}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <aside className="rounded-2xl border border-navy-700/10 bg-mist-50 p-7">
              <h2 className="flex items-center gap-2 text-lg font-bold"><Users className="h-5 w-5 text-leaf-600" />{t('services.whoNeeds')}</h2>
              <ul className="mt-5 space-y-3">
                {s.whoNeeds.map((w, i) => (
                  <li key={w.en} className="flex items-center gap-4 rounded-xl bg-white p-4 text-[15px] font-medium text-navy-700 shadow-card">
                    <span className="font-mono text-xs text-leaf-600">{String(i + 1).padStart(2, '0')}</span>{pick(w)}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section id="process" className="scroll-mt-40 border-y border-navy-700/10 bg-mist-50 py-20 lg:py-24">
        <div className="container">
          <Reveal><span className="eyebrow"><span className="h-[2px] w-6 bg-current" />{t('serviceDetail.nav.process')}</span></Reveal>
          <Reveal delay={0.05}><h2 className="mt-4 max-w-2xl text-3xl font-extrabold sm:text-4xl">{t('serviceDetail.processTitle')}</h2></Reveal>
          <ol className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden className="absolute inset-x-0 top-7 hidden h-px bg-navy-700/15 lg:block" />
            {steps.map((st, i) => {
              const I = stepIcons[i]
              return (
                <Reveal key={st.t} delay={i * 0.08}>
                  <li className="relative h-full">
                    <span className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-navy-700 text-white ring-8 ring-mist-50"><I className="h-6 w-6" strokeWidth={1.6} /></span>
                    <p className="mt-6 font-mono text-xs text-leaf-600">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-1 text-lg font-bold">{st.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed">{i === 1 ? pick(s.sampling) : st.d}</p>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ---------- PARAMETERS ---------- */}
      <section id="parameters" className="scroll-mt-40 py-20 lg:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal><span className="eyebrow"><span className="h-[2px] w-6 bg-current" />{t('serviceDetail.nav.parameters')}</span></Reveal>
              <Reveal delay={0.05}><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{t('services.parameters')}</h2></Reveal>
              <p className="mt-2 text-ink-600">{t('serviceDetail.paramsCount', { n: paramTotal })}</p>
            </div>
            <label className="relative w-full max-w-sm">
              <span className="sr-only">{t('services.searchParams')}</span>
              <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('services.searchParams')} className="input ps-11" />
            </label>
          </div>
          <Reveal className="mt-10">
            <dl className="overflow-hidden rounded-2xl border border-navy-700/10 bg-white shadow-card">
              {groups.map((g, i) => (
                <div key={g.title.en} className={`grid gap-3 p-6 md:grid-cols-[260px_1fr] md:gap-8 ${i ? 'border-t border-navy-700/10' : ''}`}>
                  <dt>
                    <span className="block font-bold text-navy-700">{pick(g.title)}</span>
                    <span className="mt-1 block font-mono text-xs text-ink-600">{g.items.length} {t('home.showcase.params')}</span>
                  </dt>
                  <dd className="flex flex-wrap gap-2" dir="ltr">
                    {g.items.map((p) => <span key={p} className="rounded-md border border-navy-700/10 bg-mist-50 px-2.5 py-1 text-sm text-navy-700">{p}</span>)}
                  </dd>
                </div>
              ))}
              {!groups.length && <p className="p-8 text-center">{t('services.noParams')}</p>}
            </dl>
          </Reveal>
          <Link to="/tests" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-leaf-600 hover:underline">
            {t('serviceDetail.methodsLink')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </section>

      {/* ---------- SAMPLING & REQUIREMENTS ---------- */}
      <section id="sampling" className="scroll-mt-40 on-dark bg-navy-700 py-20 text-white lg:py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal><span className="eyebrow !text-lime-500"><span className="h-[2px] w-6 bg-current" />{t('serviceDetail.nav.sampling')}</span></Reveal>
            <Reveal delay={0.05}><h2 className="mt-4 text-3xl font-extrabold !text-white sm:text-4xl">{t('serviceDetail.samplingTitle')}</h2></Reveal>
            <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-white/80">{pick(s.sampling)}</p></Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/sampling" variant="green" arrow>{t('common.bookSampling')}</Button>
                <Button to="/walk-in" variant="outline-light">{t('serviceDetail.walkInLink')}</Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold !text-white"><ClipboardList className="h-5 w-5 text-lime-500" />{t('walkin.bottlesTitle')}</h3>
              <ul className="mt-5 space-y-3 text-white/85">
                {(t('walkin.bottles', { returnObjects: true }) as string[]).map((b) => <li key={b} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />{b}</li>)}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm">
                <div><p className="text-white/55">{t('serviceDetail.keepCold')}</p><p className="mt-1 font-semibold">≤ 6 °C</p></div>
                <div><p className="text-white/55">{t('services.turnaround')}</p><p className="mt-1 font-semibold">{pick(s.turnaround)}</p></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SAUDI LIMITS ---------- */}
      {scenarioLimits.length > 0 && (
        <section id="limits" className="scroll-mt-40 py-20 lg:py-24">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Reveal><span className="eyebrow"><span className="h-[2px] w-6 bg-current" />{t('services.limitsEyebrow')}</span></Reveal>
                <Reveal delay={0.05}><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{t('services.limitsTitle')}</h2></Reveal>
                <p className="mt-2 text-ink-600" dir="ltr">{scenarioLimits[0].source}</p>
              </div>
              <Button to="/tests" variant="ghost" arrow>{t('nav.fullCatalogue')}</Button>
            </div>
            <Reveal className="mt-10">
              <div className="overflow-x-auto rounded-2xl border border-navy-700/10 bg-white shadow-card">
                <table className="w-full min-w-[520px] text-sm" dir="ltr">
                  <thead className="border-b border-navy-700/10 bg-mist-50"><tr>{['Parameter', 'Limit', 'Unit'].map((h) => <th key={h} className="px-6 py-3.5 text-start text-xs font-semibold uppercase tracking-wide text-ink-600">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-navy-700/[0.07]">
                    {scenarioLimits.slice(0, 14).map((l, i) => (
                      <tr key={i} className="hover:bg-aqua-100/40"><th scope="row" className="px-6 py-3 text-start font-semibold text-navy-700">{l.param}</th><td className="px-6 py-3 font-mono text-xs">{l.limit}</td><td className="px-6 py-3 font-mono text-xs text-ink-600">{l.unit}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
            <p className="mt-3 text-xs text-ink-600">{t('tests.limitsNote')}{scenarioLimits.length > 14 ? ` ${t('services.limitsMore', { n: scenarioLimits.length - 14 })}` : ''}</p>
          </div>
        </section>
      )}

      {/* ---------- RELATED ---------- */}
      <section className="border-t border-navy-700/10 bg-mist-50 py-20">
        <div className="container">
          <h2 className="text-2xl font-extrabold">{t('services.related')}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r) => {
              const RI = serviceIconMap[r.icon]
              return (
                <Link key={r.slug} to={`/services/${r.slug}`} className="group flex flex-col rounded-xl border border-navy-700/10 bg-white p-6 transition-colors duration-300 hover:border-navy-700 hover:bg-navy-700">
                  <span className="flex items-center justify-between">
                    <RI className="h-6 w-6 text-leaf-600 transition group-hover:text-lime-500" strokeWidth={1.5} />
                    <ArrowUpRight className="h-4 w-4 text-navy-700/30 transition group-hover:rotate-45 group-hover:text-lime-500 rtl:-scale-x-100" />
                  </span>
                  <span className="mt-6 font-display text-lg font-bold text-navy-700 transition group-hover:text-white">{pick(r.title)}</span>
                  <span className="mt-1 text-sm text-ink-600 transition group-hover:text-white/70">{pick(r.short)}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand title={t('services.ctaTitle')} sub={t('services.ctaSub')} />
    </>
  )
}
