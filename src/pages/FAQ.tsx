import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Accordion } from '../components/ui/Accordion'
import { Reveal } from '../components/ui/Reveal'
import { faqs } from '../data/content'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function FAQ() {
  const { t, pick } = useL()
  useSeo(t('seo.faq'), t('faq.sub'))
  return (
    <>
      <PageHero eyebrow={t('faq.eyebrow')} title={t('faq.title')} sub={t('faq.sub')} crumbs={[{ label: t('nav.faq') }]} />
      <section className="py-20">
        <Reveal className="container max-w-4xl">
          <Accordion items={faqs.map((f) => ({ q: pick(f.q), a: pick(f.a), badge: f.todo && site.showUnconfirmed ? t('common.pendingConfirmation') : undefined }))} />
        </Reveal>
      </section>
      <CtaBand />
    </>
  )
}
