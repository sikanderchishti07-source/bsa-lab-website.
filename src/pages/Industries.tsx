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
            <motion.li key={ind.icon} variants={staggerChild} className="group relative overflow-hidden rounded-3xl border border-navy-700/10 bg-white p-8 transition-colors duration-500 hover:bg-navy-700">
              <span className="absolute -end-4 -top-6 font-display text-8xl font-extrabold text-navy-700/[0.04] transition group-hover:text-white/[0.06]">{i + 1}</span>
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-aqua-100 text-navy-700 transition group-hover:bg-leaf-600 group-hover:text-white"><IndustryIcon name={ind.icon} className="h-7 w-7" /></span>
              <h2 className="relative mt-6 text-lg font-bold transition group-hover:!text-white">{pick(ind.title)}</h2>
              <p className="relative mt-2 text-[15px] leading-relaxed transition group-hover:text-white/75">{pick(ind.text)}</p>
            </motion.li>
          ))}
        </motion.ul>
      </section>
      <CtaBand />
    </>
  )
}
