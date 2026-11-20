import { ArrowUpRight, CheckCircle2, Eye, Gauge, HeartHandshake, Leaf, ShieldCheck, Target } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { Logo, LeafMark } from '../components/brand/Logo'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const valueIcons = [Gauge, ShieldCheck, Leaf, HeartHandshake]

export default function About() {
  const { t } = useL()
  useSeo(t('seo.about'), t('about.sub'))
  const values = t('about.values', { returnObjects: true }) as { t: string; d: string }[]
  const quality = t('about.quality', { returnObjects: true }) as string[]
  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} title={t('about.title')} sub={t('about.sub')} crumbs={[{ label: t('nav.about') }]}
        aside={<div className="hidden justify-center lg:flex"><div className="rounded-[2rem] bg-white p-10 shadow-lift"><Logo className="h-32 w-auto" /></div></div>} />

      <section className="py-24 lg:py-32">
        <div className="container grid gap-14 lg:grid-cols-2">
          <SectionTitle eyebrow={t('about.storyTitle')} title={t('about.title')} />
          <div className="space-y-6 text-lg leading-relaxed">
            <Reveal><p>{t('about.story1')}</p></Reveal>
            <Reveal delay={0.1}><p>{t('about.story2')}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-24">
        <div className="container grid gap-6 md:grid-cols-2">
          {[{ I: Target, h: t('about.missionTitle'), p: t('about.mission') }, { I: Eye, h: t('about.visionTitle'), p: t('about.vision') }].map(({ I, h, p }, i) => (
            <Reveal key={h} delay={i * 0.1}>
              <div className={`h-full rounded-[2rem] p-10 ${i === 0 ? 'on-dark bg-navy-700 text-white' : 'card'}`}>
                <I className={`h-10 w-10 ${i === 0 ? 'text-lime-500' : 'text-leaf-600'}`} strokeWidth={1.5} />
                <h2 className={`mt-6 text-3xl font-extrabold ${i === 0 ? '!text-white' : ''}`}>{h}</h2>
                <p className={`mt-4 text-lg leading-relaxed ${i === 0 ? 'text-white/80' : ''}`}>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="container mt-20">
          <SectionTitle center eyebrow={t('about.valuesTitle')} title={t('about.valuesTitle')} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const I = valueIcons[i]
              return (
                <Reveal key={v.t} delay={i * 0.08}>
                  <div className="card group h-full p-7 text-center transition hover:-translate-y-1">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-aqua-100 text-navy-700 transition group-hover:bg-leaf-600 group-hover:text-white"><I className="h-6 w-6" /></span>
                    <h3 className="mt-5 text-xl font-bold">{v.t}</h3>
                    <p className="mt-2 text-[15px]">{v.d}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-navy-900 py-24 text-white">
        <LeafMark className="absolute -end-20 bottom-0 h-72 w-auto opacity-10" />
        <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionTitle light eyebrow={t('about.visionEyebrow')} title={t('about.vision2030Title')} sub={t('about.vision2030')} />
          <Reveal delay={0.1}>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur">
              <h3 className="text-2xl font-bold !text-white">{t('about.aeconTitle')}</h3>
              <p className="mt-4 leading-relaxed text-white/75">{t('about.aeconText')}</p>
              <a href={site.parent.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-lime-500 hover:underline">{t('about.aeconCta')}<ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" /></a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <SectionTitle eyebrow={t('about.qualityTitle')} title={t('about.qualityTitle')} />
          <ul className="space-y-4">
            {quality.map((q, i) => (
              <Reveal key={q} delay={i * 0.06}>
                <li className="flex items-start gap-4 rounded-2xl border border-navy-700/10 p-5 font-medium text-navy-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />{q}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
