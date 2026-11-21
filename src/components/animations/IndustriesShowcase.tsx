import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { industries } from '../../data/content'
import { useL } from '../../lib/i18n-helpers'

const img = (icon: string) => `${import.meta.env.BASE_URL}images/industries/${icon}.webp`

/** Industries: photo cards. Description and typical tests slide up on hover / focus. */
export function IndustriesShowcase() {
  const { t, pick } = useL()
  return (
    <section className="relative py-20 lg:flex lg:min-h-[calc(100svh-72px)] lg:items-center lg:py-10">
      <div className="container w-full">
        <div className="grid gap-6 border-b border-navy-700/10 pb-7 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <span className="eyebrow"><span className="inline-block h-[2px] w-6 bg-current" />{t('home.industriesEyebrow')}</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] [text-wrap:balance] sm:text-4xl lg:text-[2.4rem] rtl:leading-[1.3]">{t('home.industriesTitle')}</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md leading-relaxed">{t('home.industryPanel.sub')}</p>
            <Link to="/industries" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-leaf-600">
              {t('home.industryPanel.all')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <motion.li
              key={ind.icon}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/industries"
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900 sm:aspect-[3/4] lg:aspect-auto lg:h-[clamp(200px,calc((100svh-72px-260px)/2),330px)]"
              >
                <img src={img(ind.icon)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.07] group-focus-visible:scale-[1.07]" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/35 to-navy-900/0" />
                <span aria-hidden className="absolute inset-0 bg-navy-900/0 transition-colors duration-500 group-hover:bg-navy-900/45 group-focus-visible:bg-navy-900/45" />

                <span className="absolute start-4 top-4 rounded-md bg-white/15 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur-md">{String(i + 1).padStart(2, '0')}</span>
                <span className="absolute end-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition duration-300 group-hover:bg-lime-500 group-hover:text-navy-900">
                  <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </span>

                <span className="absolute inset-x-0 bottom-0 block p-5">
                  <span className="block font-display text-lg font-bold leading-snug text-white">{pick(ind.title)}</span>
                  <span className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                    <span className="overflow-hidden">
                      <span className="block pt-2 text-sm leading-relaxed text-white/80">{pick(ind.text)}</span>
                      <span className="flex flex-wrap gap-1.5 pt-3" dir="ltr">
                        {ind.tests.slice(0, 4).map((x) => (
                          <span key={x} className="rounded border border-white/25 px-2 py-0.5 font-mono text-[10.5px] text-white/90">{x}</span>
                        ))}
                      </span>
                    </span>
                  </span>
                  <span aria-hidden className="mt-4 block h-[2px] w-10 bg-lime-500 transition-all duration-500 group-hover:w-full" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
