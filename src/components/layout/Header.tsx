import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { ServiceIcon } from '../animations/ServiceIcon'
import { services } from '../../data/services'
import { site } from '../../config/site'
import { useL } from '../../lib/i18n-helpers'

const links = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services', mega: true },
  { to: '/sampling', key: 'sampling' },
  { to: '/laboratory', key: 'laboratory' },
  { to: '/walk-in', key: 'walkin' },
  { to: '/industries', key: 'industries' },
  { to: '/contact', key: 'contact' },
]

export function LangSwitch({ light }: { light?: boolean }) {
  const { lang, i18n } = useL()
  return (
    <div className={`flex items-center rounded-full p-1 text-xs font-semibold ${light ? 'bg-white/10' : 'bg-navy-700/5'}`} role="group" aria-label="Language">
      {(['en', 'ar'] as const).map((l) => (
        <button
          key={l}
          onClick={() => i18n.changeLanguage(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1.5 transition ${lang === l ? 'bg-leaf-600 text-white' : light ? 'text-white/80 hover:text-white' : 'text-navy-700 hover:bg-navy-700/5'}`}
        >
          {l === 'en' ? 'EN' : 'عربي'}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { t, pick } = useL()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)
  const overHero = pathname === '/' && !scrolled
  const solid = scrolled || pathname !== '/'

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    setMobile(false)
    setMega(false)
  }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded bg-white px-4 py-2 text-navy-700 focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {t('nav.skip')}
      </a>
      <header className={`on-dark fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'bg-navy-700/90 shadow-[0_10px_30px_-15px_rgba(0,0,0,.5)] backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className={`container flex items-center justify-between gap-6 transition-all duration-500 ${overHero ? 'h-[84px]' : 'h-[72px]'}`}>
          <Link to="/" className="shrink-0" aria-label="BSA.lab home">
            <Logo variant="light" className={`w-auto transition-all duration-500 ${overHero ? 'h-12' : 'h-10'}`} />
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {links.map((l) =>
              l.mega ? (
                <div key={l.key} className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
                  <NavLink
                    to={l.to}
                    aria-haspopup="true"
                    aria-expanded={mega}
                    onFocus={() => setMega(true)}
                    className={({ isActive }) => `flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition ${isActive ? 'text-lime-500' : 'text-white/85 hover:text-white'}`}
                  >
                    {t(`nav.${l.key}`)}
                    <ChevronDown className={`h-3.5 w-3.5 transition ${mega ? 'rotate-180' : ''}`} />
                  </NavLink>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="absolute start-1/2 top-full w-[760px] -translate-x-1/2 pt-4 rtl:translate-x-1/2"
                        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setMega(false)}
                      >
                        <div className="grid grid-cols-[1fr_220px] overflow-hidden rounded-3xl bg-white shadow-lift">
                          <ul className="grid grid-cols-2 gap-1 p-4">
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link to={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-mist-50">
                                  <ServiceIcon icon={s.icon} />
                                  <span>
                                    <span className="block font-display text-sm font-bold text-navy-700">{pick(s.title)}</span>
                                    <span className="mt-0.5 line-clamp-2 block text-xs text-ink-600">{pick(s.short)}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="stripes-bg relative flex flex-col justify-end p-6 text-white">
                            <div className="absolute inset-0 bg-navy-700/70" />
                            <p className="relative text-sm text-white/80">{t('nav.servicesIntro')}</p>
                            <Link to="/services" className="relative mt-4 text-sm font-semibold text-lime-500 hover:underline">
                              {t('nav.allServices')} →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={l.key} to={l.to} end={l.to === '/'} className={({ isActive }) => `relative whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium transition ${isActive ? 'text-lime-500' : 'text-white/85 hover:text-white'}`}>
                  {t(`nav.${l.key}`)}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <a href={site.phoneHref} title={site.phone} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/85 hover:bg-white/15 hover:text-white" dir="ltr">
              <Phone className="h-4 w-4 text-lime-500" />
              <span className="sr-only">{site.phone}</span>
            </a>
            <LangSwitch light />
            <Button to="/contact" variant="green" magnetic>
              {t('nav.quote')}
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LangSwitch light />
            <button onClick={() => setMobile(true)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label={t('nav.menu')}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy-900 xl:hidden"
            initial={{ clipPath: 'circle(0% at 95% 4%)' }}
            animate={{ clipPath: 'circle(150% at 95% 4%)' }}
            exit={{ clipPath: 'circle(0% at 95% 4%)' }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <div className="container flex h-[72px] items-center justify-between">
              <Logo variant="light" className="h-11 w-auto" />
              <button onClick={() => setMobile(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white" aria-label={t('nav.close')}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container mt-6 flex flex-col" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.div key={l.key} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <NavLink to={l.to} end={l.to === '/'} className={({ isActive }) => `block border-b border-white/10 py-4 font-display text-2xl font-bold ${isActive ? 'text-lime-500' : 'text-white'}`}>
                    {t(`nav.${l.key}`)}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="container mt-auto flex flex-col gap-3 py-8">
              <Button to="/contact" variant="green" size="lg" arrow>
                {t('nav.quote')}
              </Button>
              <a href={site.phoneHref} className="text-center text-white/80" dir="ltr">
                {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
