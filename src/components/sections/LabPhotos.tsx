import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useL } from '../../lib/i18n-helpers'

/** Home: clean grid of 8 real lab photos with captions. */
export function LabPhotos() {
  const { t } = useL()
  const items = t('lab.gallery.items', { returnObjects: true }) as { k: string; c: string }[]
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow"><span className="inline-block h-[2px] w-6 bg-current" />{t('lab.gallery.eyebrow')}</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-[2.6rem] rtl:leading-[1.3]">{t('lab.gallery.title')}</h2>
            <p className="mt-4 max-w-xl leading-relaxed">{t('home.photosSub')}</p>
          </div>
          <Link to="/laboratory" className="inline-flex items-center gap-2 rounded-full bg-navy-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-leaf-600">
            {t('home.film.cta')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {items.map((g, i) => (
            <motion.li
              key={g.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 shadow-card">
                <img
                  src={`${import.meta.env.BASE_URL}images/lab/${g.k}.webp`}
                  alt={g.c}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 text-[13px] font-semibold leading-snug text-white sm:p-4 sm:text-sm">
                  <span aria-hidden className="h-[2px] w-4 shrink-0 bg-lime-500 transition-all duration-500 group-hover:w-7" />
                  {g.c}
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
