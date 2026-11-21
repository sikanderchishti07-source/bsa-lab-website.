import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BadgeCheck, Building2, CheckCircle2, Clock, FlaskConical, MapPin, Microscope, ShieldCheck, Truck, Users } from 'lucide-react'
import { WaterHero } from '../components/animations/WaterHero'
import { HeroReport } from '../components/animations/HeroReport'
import { SampleJourney } from '../components/animations/SampleJourney'
import { ServicesShowcase } from '../components/animations/ServicesShowcase'
import { IndustriesShowcase } from '../components/animations/IndustriesShowcase'
import { StripeDivider } from '../components/brand/BrandStripes'
import { Button } from '../components/ui/Button'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { Counter } from '../components/ui/Counter'
import { Marquee } from '../components/ui/Marquee'
import { PartnerStrip } from '../components/ui/PartnerStrip'
import { Pending } from '../components/ui/Pending'
import { CtaBand } from '../components/layout/CtaBand'
import { parametersMarquee } from '../data/content'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const whyIcons = [Microscope, Users, ShieldCheck, Clock, BadgeCheck, Building2]

export default function Home() {
  const { t, lang } = useL()
  useSeo(t('seo.home'), t('seo.homeDesc'))
  const why = t('home.why', { returnObjects: true }) as { t: string; d: string }[]
  const w1 = t('home.way1Points', { returnObjects: true }) as string[]
  const w2 = t('home.way2Points', { returnObjects: true }) as string[]

  return (
    <>
      {/* HERO */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-700 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(47,111,181,.40),transparent_55%)]" />
        <div className="grain absolute inset-0 -z-10 opacity-40" />
        <WaterHero className="-z-10 opacity-70" />
        <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_70%)]" aria-hidden />
        <div className="container grid items-center gap-14 pb-20 pt-32 lg:min-h-[92svh] lg:grid-cols-[1.1fr_1fr] lg:pb-20 lg:pt-28 xl:gap-16">
          <div className="max-w-2xl">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
              {t('home.eyebrow')}
            </motion.span>
            <h1 className="mt-6 text-[2.35rem] font-extrabold leading-[1.08] !text-white sm:text-5xl xl:text-[3.6rem] rtl:leading-[1.35]">
              {[t('home.title1'), t('home.title2')].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-1 [text-wrap:balance] rtl:pb-3">
                  <motion.span className={`block ${i === 1 ? 'text-lime-500' : ''}`} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.6 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.7 }} className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              {t('home.sub')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="mt-9 flex flex-wrap gap-3">
              <Button to="/contact" size="lg" arrow magnetic>{t('nav.quote')}</Button>
              <Button to="/sampling" variant="outline-light" size="lg">
                <span className="flex items-center gap-2"><Truck className="h-4 w-4" />{t('common.bookSampling')}</span>
              </Button>
            </motion.div>
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }} className="mt-12 grid max-w-xl grid-cols-1 gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
              {(t('home.heroTrust', { returnObjects: true }) as { t: string; d: string }[]).map((it, i) => {
                const I = [Microscope, MapPin, Building2][i]
                return (
                  <li key={it.t} className="flex items-start gap-3">
                    <I className="mt-0.5 h-5 w-5 shrink-0 text-lime-500" strokeWidth={1.7} />
                    <span>
                      <span className="block text-sm font-semibold text-white">{it.t}</span>
                      <span className="block text-xs text-white/60">{it.d}</span>
                    </span>
                  </li>
                )
              })}
            </motion.ul>
          </div>

          <div className="hidden lg:block">
            <HeroReport />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-navy-700/10 bg-white">
        <div className="container flex flex-col items-center justify-between gap-5 py-7 md:flex-row">
          <a href={site.parent.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-semibold text-navy-700 hover:text-leaf-600">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-700 font-display text-xs font-extrabold text-white">AE</span>
            {t('common.memberOf')}
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-navy-700/15 bg-mist-50 px-4 py-2 text-xs font-bold text-navy-700">
              <BadgeCheck className="h-4 w-4 text-leaf-600" />
              {site.accreditation[lang]}
            </span>
          </div>
        </div>
      </section>

      {/* SERVICES — pinned bento showcase */}
      <ServicesShowcase />

      {/* SAMPLE JOURNEY */}
      <section className="overflow-hidden bg-white py-24 lg:py-0">
        <div className="container">
          <SampleJourney header={<SectionTitle eyebrow={t('home.journeyEyebrow')} title={t('home.journeyTitle')} sub={t('home.journeySub')} />} />
        </div>
      </section>

      <Marquee items={parametersMarquee} />

      {/* TWO WAYS */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <SectionTitle center eyebrow={t('home.waysEyebrow')} title={t('home.waysTitle')} />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {[
              { title: t('home.way1Title'), text: t('home.way1Text'), pts: w1, icon: Truck, to: '/sampling', cta: t('common.bookSampling'), dark: true },
              { title: t('home.way2Title'), text: t('home.way2Text'), pts: w2, icon: FlaskConical, to: '/walk-in', cta: t('common.visit'), dark: false },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`group relative h-full overflow-hidden rounded-[2rem] p-9 sm:p-12 ${c.dark ? 'on-dark bg-navy-700 text-white' : 'border border-navy-700/10 bg-aqua-100'}`}>
                  {c.dark && <div className="grain absolute inset-0" aria-hidden />}
                  <div className={`absolute -end-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125 ${c.dark ? 'bg-leaf-600/30' : 'bg-lime-500/30'}`} aria-hidden />
                  <div className="relative">
                    <span className={`grid h-16 w-16 place-items-center rounded-2xl ${c.dark ? 'bg-leaf-600' : 'bg-navy-700'} text-white`}><c.icon className="h-7 w-7" /></span>
                    <h3 className={`mt-8 text-3xl font-extrabold ${c.dark ? '!text-white' : ''}`}>{c.title}</h3>
                    <p className={`mt-3 max-w-md text-lg ${c.dark ? 'text-white/75' : ''}`}>{c.text}</p>
                    <ul className="mt-7 space-y-3">
                      {c.pts.map((p) => (
                        <li key={p} className={`flex items-center gap-3 font-medium ${c.dark ? 'text-white/90' : 'text-navy-700'}`}><CheckCircle2 className="h-5 w-5 text-lime-500" />{p}</li>
                      ))}
                    </ul>
                    <div className="mt-9"><Button to={c.to} variant={c.dark ? 'green' : 'navy'} arrow>{c.cta}</Button></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="on-dark relative overflow-hidden bg-navy-900 py-20 text-white">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container relative">
          <Reveal><h2 className="text-center text-2xl font-bold !text-white sm:text-3xl">{t('home.statsTitle')}</h2></Reveal>
          <div className="mt-12 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {site.stats.filter((s) => !s.todo || site.showUnconfirmed).map((s, i) => (
              <Reveal key={s.key} delay={i * 0.08} className="border-white/10 px-4 text-center lg:border-s lg:first:border-s-0">
                <div className="font-display text-5xl font-extrabold text-white sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-leaf-600 to-lime-500" />
                <p className="mt-3 text-sm text-white/70">{t(`home.stats.${s.key}`)}</p>
                {s.todo && <Pending className="mt-2" />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <IndustriesShowcase />

      <StripeDivider />

      {/* WHY */}
      <section className="relative overflow-hidden border-y border-aqua-400/15 bg-gradient-to-br from-[#E6EEFA] via-[#F1F6FD] to-[#D8E5F6] py-20 lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:py-16">
        {/* light technical background */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <svg className="absolute inset-0 h-full w-full text-aqua-400/[0.16]" aria-hidden>
            <defs>
              <pattern id="why-hex" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.1)">
                <path d="M28 0 L56 16.2 V48.5 L28 64.7 L0 48.5 V16.2 Z M28 64.7 V97" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#why-hex)" />
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(255,255,255,.75),transparent_60%)]" />
          <div className="absolute -start-40 -top-20 h-[460px] w-[460px] rounded-full bg-aqua-300/30 blur-[120px]" />
          <div className="absolute end-[20%] top-1/3 h-56 w-56 rounded-full bg-lime-500/10 blur-[90px]" />
          <div className="absolute -end-40 -bottom-20 h-[520px] w-[520px] rounded-full bg-aqua-400/25 blur-[130px]" />
        </div>

        <div className="container relative grid gap-12 lg:grid-cols-[0.85fr_1.6fr] lg:items-center xl:gap-16">
          <div>
            <SectionTitle eyebrow={t('home.whyEyebrow')} title={t('home.whyTitle')} />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md leading-relaxed">{t('home.whySub')}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-8 grid max-w-md grid-cols-3 divide-x divide-navy-700/10 rounded-2xl border border-navy-700/10 bg-white/80 shadow-card backdrop-blur rtl:divide-x-reverse">
                {(t('home.whyFacts', { returnObjects: true }) as { v: string; l: string }[]).map((f) => (
                  <div key={f.l} className="px-4 py-4 text-center">
                    <dt className="font-display text-2xl font-extrabold text-navy-700" dir="ltr">{f.v}</dt>
                    <dd className="mt-1 text-xs leading-snug text-ink-600">{f.l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-leaf-600">
                {t('home.whyMore')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {why.map((w, i) => {
              const I = whyIcons[i]
              return (
                <Reveal key={i} delay={(i % 3) * 0.08}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-navy-700/10 bg-white/90 p-6 shadow-card backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-leaf-600/40 hover:shadow-lift">
                    <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-leaf-600 to-lime-500 transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" />
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-aqua-100 text-navy-700 transition-colors duration-500 group-hover:bg-leaf-600 group-hover:text-white">
                        <I className="h-6 w-6" strokeWidth={1.7} />
                      </span>
                      <span className="font-mono text-xl font-semibold text-navy-700/10" dir="ltr">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 text-[1.05rem] font-bold leading-snug">{w.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{w.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <PartnerStrip />

      <CtaBand />
    </>
  )
}
