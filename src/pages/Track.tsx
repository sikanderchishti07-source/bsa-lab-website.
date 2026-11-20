import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { Button } from '../components/ui/Button'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function Track() {
  const { t } = useL()
  useSeo(t('seo.track'), t('track.sub'))
  const [ref, setRef] = useState('')
  const [shown, setShown] = useState(false)
  return (
    <>
      <PageHero eyebrow={t('track.eyebrow')} title={t('track.title')} sub={t('track.sub')} crumbs={[{ label: t('nav.track') }]} />
      <section className="py-24">
        <div className="container max-w-2xl">
          <form onSubmit={(e) => { e.preventDefault(); if (ref.trim()) setShown(true) }} className="card flex flex-col gap-3 p-4 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">{t('track.placeholder')}</span>
              <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-600" />
              <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder={t('track.placeholder')} dir="ltr" className="input border-0 ps-12 text-lg rtl:text-right focus:ring-0" />
            </label>
            <Button type="submit" variant="navy" size="lg">{t('track.button')}</Button>
          </form>
          <AnimatePresence>
            {shown && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 flex items-start gap-4 rounded-2xl bg-aqua-100 p-6 text-navy-700">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />
                <p>{t('track.soon')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
