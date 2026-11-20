import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { QuoteWizard } from '../components/forms/QuoteWizard'
import { Reveal } from '../components/ui/Reveal'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function Contact() {
  const { t, lang } = useL()
  useSeo(t('seo.contact'), t('contact.sub'))
  const cards = [
    { I: Phone, label: t('common.callUs'), value: site.phone, href: site.phoneHref, ltr: true },
    { I: MessageCircle, label: t('common.whatsapp'), value: site.phone, href: site.whatsappHref, ltr: true },
    { I: Mail, label: t('common.emailUs'), value: site.email, href: `mailto:${site.email}`, ltr: true },
    { I: MapPin, label: t('common.visit'), value: lang === 'ar' ? site.addressAr : site.addressEn, href: site.mapDirections },
  ]
  return (
    <>
      <PageHero eyebrow={t('contact.eyebrow')} title={t('contact.title')} sub={t('contact.sub')} crumbs={[{ label: t('nav.contact') }]} />
      <section className="relative -mt-10 pb-24">
        <div className="container grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal><QuoteWizard /></Reveal>
          <aside className="space-y-4">
            <h2 className="pt-12 text-xl font-bold lg:pt-14">{t('contact.cardsTitle')}</h2>
            {cards.map(({ I, label, value, href, ltr }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="card group flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:border-leaf-600/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-700 text-white transition group-hover:bg-leaf-600"><I className="h-5 w-5" /></span>
                  <span className="min-w-0"><span className="block text-sm">{label}</span><span className="block break-words font-semibold text-navy-700" dir={ltr ? 'ltr' : undefined}>{value}</span></span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.3}><p className="rounded-2xl bg-mist-50 p-5 text-sm"><strong className="text-navy-700">{t('common.hours')}:</strong> {site.hours[lang]}</p></Reveal>
          </aside>
        </div>
        <div className="container mt-12">
          <iframe title="BSA.lab location map" src={site.mapEmbed} className="h-[380px] w-full rounded-[2rem] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </>
  )
}
