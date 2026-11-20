import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { TiltCard } from '../components/ui/TiltCard'
import { staggerChild, staggerParent } from '../components/ui/Reveal'
import { Marquee } from '../components/ui/Marquee'
import { SectionTitle } from '../components/ui/SectionTitle'
import { services, serviceImage } from '../data/services'
import { parametersMarquee } from '../data/content'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function Services() {
  const { t, pick } = useL()
  useSeo(t('seo.services'), t('services.sub'))
  return (
    <>
      <PageHero eyebrow={t('services.eyebrow')} title={t('services.title')} sub={t('services.sub')} crumbs={[{ label: t('nav.services') }]} />
      <section className="bg-mist-50 py-24">
        {([['matrix', t('services.groupMatrix'), t('services.groupMatrixSub')], ['program', t('services.groupProgram'), t('services.groupProgramSub')]] as const).map(([cat, title, sub], gi) => (
          <div key={cat} className={`container ${gi ? 'mt-24' : ''}`}>
            <SectionTitle eyebrow={t('services.eyebrow')} title={title} sub={sub} />
            <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid gap-6 md:grid-cols-2">
              {services.filter((s) => (s.category ?? 'matrix') === cat).map((s, i) => (
                <motion.li key={s.slug} variants={staggerChild}>
                  <TiltCard className="group h-full rounded-[2rem]">
                    <Link to={`/services/${s.slug}`} className="card relative flex h-full flex-col overflow-hidden rounded-[2rem] sm:flex-row">
                      <span className="relative block h-48 shrink-0 overflow-hidden sm:h-auto sm:w-[38%]">
                        <img src={serviceImage(s.slug)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                      </span>
                      <div className="flex-1 p-7 sm:p-8">
                        <span className="font-display text-xs font-bold text-leaf-600">0{i + 1}</span>
                        <h2 className="mt-1 text-2xl font-extrabold">{pick(s.title)}</h2>
                        <p className="mt-3 leading-relaxed">{pick(s.short)}</p>
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {s.params.flatMap((g) => g.items).slice(0, 6).map((p) => (
                            <span key={p} className="rounded-full bg-aqua-100 px-2.5 py-1 text-xs font-medium text-navy-700" dir="ltr">{p}</span>
                          ))}
                        </div>
                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-leaf-600">{t('common.learnMore')}<ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" /></span>
                      </div>
                      <span className="absolute bottom-0 start-0 h-1 w-0 bg-gradient-to-r from-leaf-600 to-lime-500 transition-all duration-500 group-hover:w-full" />
                    </Link>
                  </TiltCard>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        ))}
      </section>
      <Marquee items={parametersMarquee} />
      <CtaBand title={t('services.ctaTitle')} sub={t('services.ctaSub')} />
    </>
  )
}
