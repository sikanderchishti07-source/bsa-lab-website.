import { motion } from 'framer-motion'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { IndustryIcon } from '../components/ui/IndustryIcon'
import { staggerChild, staggerParent } from '../components/ui/Reveal'
import { industries } from '../data/content'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function Industries() {
  const { t, pick } = useL()
  useSeo(t('seo.industries'), t('industries.sub'))
  return (
    <>
      <PageHero eyebrow={t('industries.eyebrow')} title={t('industries.title')} sub={t('industries.sub')} crumbs={[{ label: t('nav.industries') }]} />
      <section className="py-24">
        <motion.ul variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <motion.li key={ind.icon} variants={staggerChild} className="group overflow-hidden rounded-2xl border border-navy-700/10 bg-white transition-shadow duration-500 hover:shadow-xl hover:shadow-navy-900/10">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
                <img src={`${import.meta.env.BASE_URL}images/industries/${ind.icon}.webp`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                <span className="absolute bottom-3 start-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-navy-700 backdrop-blur"><IndustryIcon name={ind.icon} className="h-5 w-5" /></span>
                <span className="absolute end-3 top-3 rounded-md bg-white/15 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur-md">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="p-6">
                <h2 className="text-lg font-bold">{pick(ind.title)}</h2>
                <p className="mt-2 text-[15px] leading-relaxed">{pick(ind.text)}</p>
                <div className="mt-4 flex flex-wrap gap-1.5" dir="ltr">
                  {ind.tests.slice(0, 5).map((x) => (
                    <span key={x} className="rounded border border-navy-700/15 bg-mist-50 px-2 py-0.5 font-mono text-[10.5px] text-navy-700">{x}</span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>
      <CtaBand />
    </>
  )
}
