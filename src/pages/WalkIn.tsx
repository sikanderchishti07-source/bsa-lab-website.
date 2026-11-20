import { CheckCircle2, Clock, MapPin, Navigation, Package } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Pending } from '../components/ui/Pending'
import { holdTimes, packages } from '../data/content'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function WalkIn() {
  const { t, pick, lang } = useL()
  useSeo(t('seo.walkin'), t('walkin.sub'))
  const who = t('walkin.who', { returnObjects: true }) as string[]
  return (
    <>
      <PageHero eyebrow={t('walkin.eyebrow')} title={t('walkin.title')} sub={t('walkin.sub')} crumbs={[{ label: t('nav.walkin') }]}
        aside={
          <div className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl">
            <p className="flex items-center gap-2 text-sm text-white/70"><Clock className="h-4 w-4 text-lime-500" />{t('common.hours')}</p>
            <p className="mt-1 text-lg font-bold">{site.hours[lang]}</p>
            <p className="mt-5 flex items-start gap-2 text-sm text-white/80"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime-500" />{lang === 'ar' ? site.addressAr : site.addressEn}</p>
            <div className="mt-6"><Button href={site.mapDirections} variant="green" arrow>{t('common.getDirections')}</Button></div>
          </div>
        } />

      <section className="py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle eyebrow={t('walkin.eyebrow')} title={t('walkin.whoTitle')} />
          <ul className="grid gap-4 sm:grid-cols-2">
            {who.map((w, i) => (
              <Reveal key={w} delay={i * 0.05}><li className="flex h-full items-center gap-3 rounded-2xl border border-navy-700/10 p-5 font-medium text-navy-700"><CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-600" />{w}</li></Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist-50 py-24">
        <div className="container">
          <SectionTitle eyebrow={t('walkin.eyebrow')} title={t('walkin.howTitle')} sub={t('walkin.howSub')} />
          <Reveal className="mt-12">
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[720px] text-start text-[15px]">
                <thead className="bg-navy-700 text-white">
                  <tr>{(['test', 'container', 'keep', 'max'] as const).map((k) => <th key={k} scope="col" className="px-6 py-4 text-start font-semibold">{t(`walkin.th.${k}`)}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-navy-700/10">
                  {holdTimes.map((h) => (
                    <tr key={h.test.en} className="transition hover:bg-mist-50">
                      <th scope="row" className="px-6 py-4 text-start font-semibold text-navy-700">{pick(h.test)}</th>
                      <td className="px-6 py-4">{pick(h.container)}</td>
                      <td className="px-6 py-4">{pick(h.keep)}</td>
                      <td className="px-6 py-4"><span className="rounded-full bg-leaf-600/10 px-3 py-1 text-sm font-semibold text-leaf-700">{pick(h.max)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <SectionTitle eyebrow={t('walkin.eyebrow')} title={t('walkin.packagesTitle')} sub={t('walkin.packagesSub')} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.name.en} delay={i * 0.07}>
                <div className={`group flex h-full flex-col rounded-3xl p-7 transition hover:-translate-y-1 ${i === 1 ? 'on-dark bg-navy-700 text-white' : 'card'}`}>
                  <Package className={`h-8 w-8 ${i === 1 ? 'text-lime-500' : 'text-leaf-600'}`} strokeWidth={1.5} />
                  <h3 className={`mt-5 text-xl font-bold ${i === 1 ? '!text-white' : ''}`}>{pick(p.name)}</h3>
                  <p className={`mt-2 flex-1 text-sm leading-relaxed ${i === 1 ? 'text-white/75' : ''}`}>{pick(p.includes)}</p>
                  <div className={`mt-6 flex items-center justify-between border-t pt-4 text-sm font-semibold ${i === 1 ? 'border-white/15' : 'border-navy-700/10 text-navy-700'}`}>
                    {t('common.priceOnRequest')}
                    {p.price === 'TODO' && <Pending />}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="container">
          <SectionTitle eyebrow={t('walkin.visitTitle')} title={t('walkin.visitTitle')} />
          <Reveal className="mt-10">
            <div className="grid overflow-hidden rounded-[2rem] border border-navy-700/10 lg:grid-cols-[1fr_2fr]">
              <div className="on-dark space-y-5 bg-navy-700 p-8 text-white">
                <p className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-lime-500" />{lang === 'ar' ? site.addressAr : site.addressEn}</p>
                <p className="flex items-start gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-lime-500" />{site.hours[lang]}</p>
                <Button href={site.mapDirections} variant="green" arrow><span className="flex items-center gap-2"><Navigation className="h-4 w-4" />{t('common.getDirections')}</span></Button>
              </div>
              <iframe title="BSA.lab location map" src={site.mapEmbed} className="h-[360px] w-full border-0 grayscale-[30%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
