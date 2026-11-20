import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, MousePointerClick, Search } from 'lucide-react'
import { serviceIconMap } from './ServiceIcon'
import { Button } from '../ui/Button'
import { services, type Service } from '../../data/services'
import { catalogue } from '../../data/catalogue'
import { useL } from '../../lib/i18n-helpers'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/** Display order: sample-type testing first, then compliance programmes. */
const ORDER = [
  'water-testing',
  'wastewater-stp-testing',
  'soil-testing',
  'groundwater-testing',
  'sludge-testing',
  'marine-seawater-testing',
  'field-sampling',
  'legionella-cooling-tower',
  'sewer-discharge-compliance',
  'pool-recreational-water',
  'monitoring-programmes',
]

/* ------------------------------------------------------------------ */
function ServiceCard({ s, index }: { s: Service; index: number }) {
  const { t, pick } = useL()
  const Icon = serviceIconMap[s.icon]
  return (
    <Link
      to={`/services/${s.slug}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-navy-700/10 bg-white p-4 text-start transition-colors duration-300 hover:border-navy-700 hover:bg-navy-700 focus-visible:border-navy-700 xl:p-5"
    >
      <span className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium text-ink-600 transition-colors group-hover:text-white/50">{String(index + 1).padStart(2, '0')}</span>
        <ArrowUpRight className="h-4 w-4 text-navy-700/30 transition duration-300 group-hover:rotate-45 group-hover:text-lime-500 rtl:-scale-x-100" />
      </span>
      <Icon className="mt-3 h-6 w-6 text-leaf-600 transition-colors group-hover:text-lime-500 [@media(max-height:700px)]:mt-2" strokeWidth={1.5} />
      <span className="mt-auto block pt-3 font-display text-[15px] font-bold leading-snug text-navy-700 transition-colors group-hover:text-white xl:text-base">{pick(s.title)}</span>
      <span className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-ink-600 transition-colors group-hover:text-white/70 [@media(max-height:760px)]:hidden">{pick(s.short)}</span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-leaf-600 to-lime-500 transition-transform duration-500 group-hover:scale-x-100 rtl:origin-right" aria-hidden />
      <span className="sr-only">{t('common.learnMore')}</span>
    </Link>
  )
}

/* ------------------------------------------------------------------ */
export function ServicesShowcase() {
  const { t } = useL()
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const list = ORDER.map((slug) => services.find((x) => x.slug === slug)!).filter(Boolean)

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const el = root.current!
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=90%', scrub: 0.6, pin: true, anticipatePin: 1 },
      })
      tl.fromTo(el.querySelectorAll('.sc-intro > *'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, 0)
      tl.fromTo(el.querySelectorAll('.sc-card'), { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.045, duration: 0.6, ease: 'power3.out' }, 0.1)
      tl.fromTo(el.querySelectorAll('.sc-progress'), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'none' }, 0)
      tl.to({}, { duration: 0.3 }) // hold the assembled grid before unpinning
    })
    return () => mm.revert()
  }, [reduced])

  const stats = [
    { v: String(catalogue.length), l: t('home.showcase.testsInScope') },
    { v: '6', l: t('home.showcase.days') },
  ]

  return (
    <section className="relative border-y border-navy-700/10 bg-mist-50">
      <div ref={root} className="relative lg:h-screen">
        <div className="container grid h-full gap-10 py-20 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:pb-8 lg:pt-[96px] xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          {/* intro */}
          <div className="sc-intro">
            <span className="eyebrow"><span className="inline-block h-[2px] w-6 bg-current" />{t('home.servicesEyebrow')}</span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] [text-wrap:balance] xl:text-[2.6rem] rtl:leading-[1.3]">{t('home.servicesTitle')}</h2>
            <p className="mt-4 leading-relaxed">{t('home.showcase.sub')}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-navy-700/10 pt-5">
              {stats.map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-display text-3xl font-extrabold text-navy-700">{s.v}</dd>
                  <dd className="mt-0.5 text-xs leading-snug text-ink-600">{s.l}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button to="/services" variant="navy" arrow>{t('nav.allServices')}</Button>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-ink-600"><MousePointerClick className="h-4 w-4 text-leaf-600" />{t('home.showcase.hint')}</p>
            <div className="mt-6 hidden h-px w-full overflow-hidden bg-navy-700/10 lg:block" aria-hidden>
              <div className="sc-progress h-full w-full origin-left bg-navy-700 rtl:origin-right" />
            </div>
          </div>

          {/* grid of all services */}
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:h-full lg:max-h-[640px] lg:grid-cols-4 lg:grid-rows-3">
            {list.map((s, i) => (
              <li key={s.slug} className="sc-card min-h-[150px] lg:min-h-0">
                <ServiceCard s={s} index={i} />
              </li>
            ))}
            <li className="sc-card min-h-[150px] lg:min-h-0">
              <Link to="/tests" className="group flex h-full flex-col justify-between rounded-xl border border-dashed border-navy-700/25 p-4 transition hover:border-leaf-600 hover:bg-white xl:p-5">
                <Search className="h-5 w-5 text-leaf-600" strokeWidth={1.75} />
                <span>
                  <span className="block font-display text-[15px] font-bold leading-snug text-navy-700 xl:text-base">{t('nav.fullCatalogue')}</span>
                  <span className="mt-1 flex items-center gap-1 text-[12.5px] text-ink-600">
                    {catalogue.length} {t('home.showcase.testsInScope')}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </section>
  )
}
