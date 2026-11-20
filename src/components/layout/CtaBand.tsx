import { Phone } from 'lucide-react'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { LeafMark } from '../brand/Logo'
import { site } from '../../config/site'
import { useL } from '../../lib/i18n-helpers'

export function CtaBand({ title, sub }: { title?: string; sub?: string }) {
  const { t } = useL()
  return (
    <section className="container py-20">
      <Reveal>
        <div className="on-dark stripes-bg relative overflow-hidden rounded-[2rem] px-8 py-14 sm:px-14 lg:py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-navy-700 via-navy-700/95 to-transparent rtl:bg-gradient-to-l" aria-hidden />
          <LeafMark className="absolute -bottom-6 end-6 h-40 w-auto opacity-25" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold !text-white sm:text-4xl">{title ?? t('home.ctaTitle')}</h2>
            <p className="mt-3 text-lg text-white/75">{sub ?? t('home.ctaSub')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" variant="green" size="lg" arrow magnetic>{t('nav.quote')}</Button>
              <Button href={site.phoneHref} variant="outline-light" size="lg">
                <span className="flex items-center gap-2"><Phone className="h-4 w-4" /><span dir="ltr">{site.phone}</span></span>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
