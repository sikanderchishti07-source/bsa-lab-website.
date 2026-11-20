import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { InstagramIcon, LinkedinIcon, XIcon } from '../ui/SocialIcons'
import { Logo } from '../brand/Logo'
import { FooterBar } from '../brand/BrandStripes'
import { services } from '../../data/services'
import { site } from '../../config/site'
import { useL } from '../../lib/i18n-helpers'

export function Footer() {
  const { t, pick, lang } = useL()
  const quick = [
    ['/about', 'about'], ['/sampling', 'sampling'], ['/laboratory', 'laboratory'], ['/walk-in', 'walkin'],
    ['/industries', 'industries'], ['/faq', 'faq'], ['/track', 'track'], ['/contact', 'contact'],
  ]
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-900 text-white/70">
      <div aria-hidden className="pointer-events-none absolute -bottom-10 start-1/2 w-[110%] -translate-x-1/2 select-none text-center font-display text-[22vw] font-extrabold leading-none text-white/[0.035] rtl:translate-x-1/2" dir="ltr">
        BSA.lab
      </div>
      <div className="container relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Logo variant="light" className="h-14 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{t('footer.about')}</p>
          <a href={site.parent.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/80 hover:border-lime-500 hover:text-white">
            <span className="h-2 w-2 rounded-full bg-lime-500" />
            {t('common.memberOf')}
          </a>
        </div>
        <div>
          <h3 className="mb-5 !font-display text-sm font-bold uppercase tracking-wider !text-white rtl:tracking-normal">{t('footer.services')}</h3>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="transition hover:text-lime-500">{pick(s.title)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider !text-white rtl:tracking-normal">{t('footer.quick')}</h3>
          <ul className="space-y-3 text-sm">
            {quick.map(([to, k]) => (
              <li key={to}>
                <Link to={to} className="transition hover:text-lime-500">{t(`nav.${k}`)}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider !text-white rtl:tracking-normal">{t('footer.contact')}</h3>
          <ul className="space-y-4 text-sm">
            <li><a href={site.phoneHref} className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-lime-500" /><span dir="ltr">{site.phone}</span></a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-white"><Mail className="h-4 w-4 shrink-0 text-lime-500" />{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />{lang === 'ar' ? site.addressAr : site.addressEn}</li>
            <li className="text-white/50">{site.hours[lang]}</li>
          </ul>
          <div className="mt-6 flex gap-2">
            {[{ h: site.social.linkedin, I: LinkedinIcon, l: 'LinkedIn' }, { h: site.social.x, I: XIcon, l: 'X' }, { h: site.social.instagram, I: InstagramIcon, l: 'Instagram' }].map(({ h, I, l }) => (
              <a key={l} href={h} aria-label={l} className="grid h-10 w-10 place-items-center rounded-full bg-white/5 transition hover:bg-leaf-600 hover:text-white"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="container relative flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs sm:flex-row">
        <p>© {new Date().getFullYear()} BSA.lab – {lang === 'ar' ? site.nameAr : 'Biological System Analysis'}. {t('footer.rights')}</p>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:text-white">{t('footer.privacy')}</Link>
          <Link to="/terms" className="hover:text-white">{t('footer.terms')}</Link>
        </div>
      </div>
      <FooterBar className="relative h-1.5" />
    </footer>
  )
}
