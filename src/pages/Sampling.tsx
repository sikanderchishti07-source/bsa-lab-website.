import { motion } from 'framer-motion'
import { CalendarCheck, ClipboardList, FlaskConical, Gauge, MapPinned, Truck } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { KSAMap } from '../components/animations/KSAMap'
import { SampleBookingForm } from '../components/forms/SampleBookingForm'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const icons = [CalendarCheck, Truck, Gauge, FlaskConical, ClipboardList, MapPinned]

export default function Sampling() {
  const { t, lang } = useL()
  useSeo(t('seo.sampling'), t('sampling.sub'))
  const steps = t('sampling.steps', { returnObjects: true }) as { t: string; d: string }[]
  return (
    <>
      <PageHero eyebrow={t('sampling.eyebrow')} title={t('sampling.title')} sub={t('sampling.sub')} crumbs={[{ label: t('nav.sampling') }]} />

      <section className="py-24 lg:py-32">
        <div className="container grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="lg:sticky lg:top-32 lg:self-start"><SectionTitle eyebrow={t('nav.sampling')} title={t('sampling.stepsTitle')} /></div>
          <ol className="relative">
            <motion.span aria-hidden className="absolute start-7 top-2 w-0.5 origin-top bg-gradient-to-b from-navy-700 via-leaf-600 to-lime-500" style={{ bottom: '2rem' }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
            {steps.map((s, i) => {
              const I = icons[i]
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <li className="relative flex gap-6 pb-10">
                    <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-700 text-white shadow-card ring-8 ring-white"><I className="h-6 w-6" /></span>
                    <div className="pt-1">
                      <span className="font-display text-xs font-bold text-leaf-600">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="mt-0.5 text-xl font-bold">{s.t}</h3>
                      <p className="mt-2 leading-relaxed">{s.d}</p>
                    </div>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-navy-900 py-24 text-white">
        <div className="grain absolute inset-0" aria-hidden />
        <div className="container relative grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle light eyebrow={t('nav.sampling')} title={t('sampling.mapTitle')} sub={t('sampling.mapSub')} />
          <Reveal><KSAMap lang={lang} /></Reveal>
        </div>
      </section>

      <section id="book" className="bg-mist-50 py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle eyebrow={t('common.bookSampling')} title={t('sampling.formTitle')} sub={t('sampling.formSub')} />
          <Reveal><div className="card p-7 sm:p-10"><SampleBookingForm /></div></Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
