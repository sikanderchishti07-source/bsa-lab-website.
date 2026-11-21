import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ClipboardCheck, FileCheck2, FlaskConical, Inbox, MessageCircle, Phone, Search } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const stageIcons = [Inbox, FlaskConical, ClipboardCheck, FileCheck2]

/** Report tracking — "coming soon" until the LIMS connection is ready. */
export default function Track() {
  const { t } = useL()
  useSeo(t('seo.track'), t('track.sub'), { noindex: true })
  const [ref, setRef] = useState('')
  const [tried, setTried] = useState(false)
  const stages = t('track.stages', { returnObjects: true }) as string[]

  return (
    <>
      <PageHero eyebrow={t('track.eyebrow')} title={t('track.title')} crumbs={[{ label: t('nav.track') }]} />
      <section className="relative overflow-hidden bg-gradient-to-b from-mist-50 to-white py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#11244c14_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="container relative max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-3xl border border-navy-700/10 bg-white shadow-lift"
          >
            <div className="h-1 bg-gradient-to-r from-navy-700 via-leaf-600 to-lime-500" />
            <div className="px-6 py-12 text-center sm:px-12 sm:py-14">
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-lime-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-leaf-600 rtl:tracking-normal">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-600 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-600" /></span>
                {t('track.soonTitle')}
              </span>
              <h2 className="mx-auto mt-5 max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl rtl:leading-[1.35]">{t('track.heading')}</h2>
              <p className="mx-auto mt-4 max-w-md leading-relaxed">{t('track.sub')}</p>

              {/* report number bar */}
              <form
                onSubmit={(e) => { e.preventDefault(); setTried(true) }}
                className="mx-auto mt-9 flex max-w-xl flex-col gap-2 rounded-2xl border border-navy-700/15 bg-mist-50 p-2 shadow-inner sm:flex-row"
              >
                <label className="relative flex-1">
                  <span className="sr-only">{t('track.label')}</span>
                  <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy-700/40" />
                  <input
                    value={ref}
                    onChange={(e) => { setRef(e.target.value); setTried(false) }}
                    placeholder={t('track.placeholder')}
                    className="h-14 w-full rounded-xl border-0 bg-white ps-12 pe-4 font-mono text-[15px] text-navy-700 placeholder:font-sans placeholder:text-navy-700/40 focus:outline-none focus:ring-2 focus:ring-leaf-600/40"
                  />
                </label>
                <button type="submit" className="h-14 rounded-xl bg-navy-700 px-7 text-sm font-semibold text-white transition hover:bg-leaf-600">{t('track.button')}</button>
              </form>

              <AnimatePresence>
                {tried && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mx-auto max-w-xl overflow-hidden"
                  >
                    <div className="mt-4 rounded-2xl border border-aqua-400/20 bg-aqua-100/60 p-5 text-start" role="status">
                      <p className="text-sm leading-relaxed text-navy-700">{t('track.notYet')}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a href={`${site.whatsappHref}?text=${encodeURIComponent(t('track.waText') + ' ' + ref)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-leaf-600 px-4 py-2 text-sm font-semibold text-white hover:bg-leaf-700">
                          <MessageCircle className="h-4 w-4" />{t('common.whatsapp')}
                        </a>
                        <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-navy-700/15 bg-white px-4 py-2 text-sm font-semibold text-navy-700 hover:border-leaf-600/40">
                          <Phone className="h-4 w-4" /><span dir="ltr">{site.phone}</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="mt-4 text-xs text-ink-600">{t('track.hint')}</p>
            </div>

            {/* what tracking will show */}
            <div className="border-t border-navy-700/10 bg-mist-50/70 px-6 py-8 sm:px-12">
              <p className="text-center text-xs font-bold uppercase tracking-wider text-navy-700/50 rtl:tracking-normal">{t('track.preview')}</p>
              <ol className="relative mt-6 grid grid-cols-4 gap-2">
                <span aria-hidden className="absolute inset-x-[12.5%] top-5 h-px bg-navy-700/15" />
                {stages.map((s, i) => {
                  const I = stageIcons[i]
                  return (
                    <li key={s} className="relative flex flex-col items-center text-center">
                      <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-navy-700/15 bg-white text-navy-700/60">
                        {i === stages.length - 1 ? <CheckCircle2 className="h-5 w-5" /> : <I className="h-5 w-5" />}
                      </span>
                      <span className="mt-2.5 text-xs font-semibold leading-snug text-navy-700/70">{s}</span>
                    </li>
                  )
                })}
              </ol>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
