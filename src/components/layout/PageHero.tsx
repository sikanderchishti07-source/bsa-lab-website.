import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BrandStripes } from '../brand/BrandStripes'
import { useL } from '../../lib/i18n-helpers'

type Props = { eyebrow: string; title: string; sub?: string; crumbs?: { to?: string; label: string }[]; children?: ReactNode; aside?: ReactNode; video?: { src: string; poster: string } }

/** Navy inner-page hero with the letterhead stripes in the top corner. */
export function PageHero({ eyebrow, title, sub, crumbs, children, aside, video }: Props) {
  const { t } = useL()
  return (
    <section className="on-dark relative overflow-hidden bg-navy-700 pb-20 pt-36 text-white lg:pb-24 lg:pt-44">
      {video && (
        <>
          <video className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" src={video.src} poster={video.poster} autoPlay muted loop playsInline preload="metadata" aria-hidden />
          <img src={video.poster} alt="" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/40 rtl:bg-gradient-to-l" aria-hidden />
        </>
      )}
      <div className="grain absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute -end-10 top-[72px] hidden h-10 w-[40%] md:block" aria-hidden>
        <BrandStripes className="justify-end" />
      </div>
      <div className="absolute -bottom-40 -start-40 h-96 w-96 rounded-full bg-aqua-400/20 blur-3xl" aria-hidden />
      <div className="container relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link to="/" className="hover:text-white">{t('nav.home')}</Link>
            {crumbs?.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white/90">{c.label}</span>}
              </span>
            ))}
          </nav>
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="eyebrow !text-lime-500">
            <span className="inline-block h-[2px] w-6 bg-current" aria-hidden />
            {eyebrow}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.05] !text-white sm:text-5xl lg:text-6xl">
            {title}
          </motion.h1>
          {sub && (
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {sub}
            </motion.p>
          )}
          {children}
        </div>
        {aside && <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>{aside}</motion.div>}
      </div>
    </section>
  )
}
