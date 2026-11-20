import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Building2, CheckCircle2, Clock, FlaskConical, MapPin, Microscope, ShieldCheck, Truck, Users } from 'lucide-react'
import { WaterHero } from '../components/animations/WaterHero'
import { HeroReport } from '../components/animations/HeroReport'
import { ServiceIcon } from '../components/animations/ServiceIcon'
import { SampleJourney } from '../components/animations/SampleJourney'
import { BrandStripes, StripeDivider } from '../components/brand/BrandStripes'
import { Button } from '../components/ui/Button'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal, staggerChild, staggerParent } from '../components/ui/Reveal'
import { TiltCard } from '../components/ui/TiltCard'
import { Counter } from '../components/ui/Counter'
import { Marquee } from '../components/ui/Marquee'
import { IndustryIcon } from '../components/ui/IndustryIcon'
import { Pending } from '../components/ui/Pending'
import { CtaBand } from '../components/layout/CtaBand'
import { services } from '../data/services'
import { industries, parametersMarquee } from '../data/content'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const whyIcons = [Microscope, Users, ShieldCheck, Clock, BadgeCheck, Building2]

export default function Home() {
  const { t, pick } = useL()
  useSeo(t('seo.home'), t('seo.homeDesc'))
  const why = t('home.why', { returnObjects: true }) as { t: string; d: string }[]
  const w1 = t('home.way1Points', { returnObjects: true }) as string[]
  const w2 = t('home.way2Points', { returnObjects: true }) as string[]
  const heroServices = services.filter((s) => s.slug !== 'field-sampling')

  return (
    <>
      {/* HERO */}
      <section className="on-dark relative isolate overflow-hidden bg-navy-700 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_35%,rgba(47,111,181,.40),transparent_55%)]" />
        <div className="grain absolute inset-0 -z-10 opacity-40" />
        <WaterHero className="-z-10 opacity-70" />
        <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_70%)]" aria-hidden />
        <div className="container grid items-center gap-14 pb-24 pt-36 lg:min-h-[92svh] lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-40 xl:gap-20">
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
            {site.accreditations
              .filter((a) => a.confirmed || site.showUnconfirmed)
              .map((a) => (
                <span key={a.key} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold text-navy-700 ${a.confirmed ? 'border-navy-700/15 bg-mist-50' : 'border-dashed border-navy-700/25'}`}>
                  <BadgeCheck className="h-4 w-4 text-leaf-600" />
                  {a.label}
                  {!a.confirmed && <Pending />}
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative bg-mist-50 py-24 lg:py-32">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle eyebrow={t('home.servicesEyebrow')} title={t('home.servicesTitle')} sub={t('home.servicesSub')} />
            <Reveal><Button to="/services" variant="navy" arrow>{t('nav.allServices')}</Button></Reveal>
          </div>
          <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {heroServices.map((s, i) => (
              <motion.li key={s.slug} variants={staggerChild}>
                <TiltCard className="group h-full rounded-3xl">
                  <Link to={`/services/${s.slug}`} className="card relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-shadow duration-500 hover:shadow-lift">
                    <span className="absolute end-6 top-6 font-display text-5xl font-extrabold text-navy-700/[0.05]">0{i + 1}</span>
                    <ServiceIcon icon={s.icon} />
                    <h3 className="mt-6 text-xl font-bold">{pick(s.title)}</h3>
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed">{pick(s.short)}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-leaf-600">
                      {t('common.learnMore')}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                    </span>
                    <span className="absolute bottom-0 start-0 h-1 w-0 bg-gradient-to-r from-leaf-600 to-lime-500 transition-all duration-500 group-hover:w-full rtl:bg-gradient-to-l" />
                  </Link>
                </TiltCard>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

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
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle eyebrow={t('home.industriesEyebrow')} title={t('home.industriesTitle')} />
            <Reveal><Button to="/industries" variant="ghost" arrow>{t('nav.industries')}</Button></Reveal>
          </div>
          <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-navy-700/10 bg-navy-700/10 md:grid-cols-4">
            {industries.map((ind) => (
              <motion.li key={ind.icon} variants={staggerChild} className="group bg-white p-6 transition-colors duration-500 hover:bg-navy-700 sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-aqua-100 text-navy-700 transition group-hover:bg-leaf-600 group-hover:text-white"><IndustryIcon name={ind.icon} /></span>
                <h3 className="mt-5 text-base font-bold transition group-hover:!text-white">{pick(ind.title)}</h3>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <StripeDivider />

      {/* WHY */}
      <section className="relative py-24 lg:py-32">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionTitle eyebrow={t('home.whyEyebrow')} title={t('home.whyTitle')} />
            <Reveal delay={0.15} className="mt-8 hidden lg:block">
              <div className="relative h-40 w-full max-w-sm overflow-hidden rounded-3xl">
                <BrandStripes animate={false} className="w-[140%] -ms-[20%]" />
              </div>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {why.map((w, i) => {
              const I = whyIcons[i]
              return (
                <Reveal key={i} delay={(i % 2) * 0.08}>
                  <div className="group h-full rounded-3xl border border-navy-700/10 p-7 transition duration-500 hover:-translate-y-1 hover:border-leaf-600/40 hover:shadow-card">
                    <I className="h-8 w-8 text-leaf-600 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} />
                    <h3 className="mt-5 text-lg font-bold">{w.t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed">{w.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
