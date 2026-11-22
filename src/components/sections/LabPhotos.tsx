import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useL } from '../../lib/i18n-helpers'

/** Home: slim filmstrip of 8 real lab photos with captions. */
export function LabPhotos() {
  const { t } = useL()
  const items = t('lab.gallery.items', { returnObjects: true }) as { k: string; c: string }[]
  return (
    <section className="py-14 lg:py-16">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><span className="inline-block h-[2px] w-6 bg-current" />{t('lab.gallery.eyebrow')}</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl rtl:leading-[1.35]">{t('lab.gallery.title')}</h2>
          </div>
          <Link to="/laboratory" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-leaf-600">
            {t('home.film.cta')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>

        <ul className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
          {items.map((g, i) => (
            <motion.li
              key={g.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-navy-900 lg:aspect-[3/4]">
                <img
                  src={`${import.meta.env.BASE_URL}images/lab/${g.k}.webp`}
                  alt={g.c}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.08]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-2.5 text-[12px] font-semibold leading-snug text-white">
                  <span aria-hidden className="mb-1.5 block h-[2px] w-4 bg-lime-500 transition-all duration-500 group-hover:w-8" />
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
