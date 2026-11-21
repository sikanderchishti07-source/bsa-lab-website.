import { Atom, Beaker, BookOpen, FlaskConical, Inbox, Microscope, ScanLine, ShieldCheck, TestTubes } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { labVideo } from '../components/sections/LabFilm'
import { Button } from '../components/ui/Button'
import { CtaBand } from '../components/layout/CtaBand'
import { SectionTitle } from '../components/ui/SectionTitle'
import { Reveal } from '../components/ui/Reveal'
import { departments, equipment } from '../data/content'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

const deptIcons = { organic: FlaskConical, icp: Atom, spectro: ScanLine, general: Beaker, micro: Microscope }

export default function Laboratory() {
  const { t, pick } = useL()
  useSeo(t('seo.laboratory'), t('lab.sub'))
  const qa = t('lab.qa', { returnObjects: true }) as string[]
  return (
    <>
      <PageHero eyebrow={t('lab.eyebrow')} title={t('lab.title')} sub={t('lab.sub')} crumbs={[{ label: t('nav.laboratory') }]} video={labVideo} />

      <section className="py-24">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle eyebrow={t('lab.eyebrow')} title={t('lab.sectionsTitle')} />
            <Reveal><Button to="/tests" variant="navy" arrow>{t('nav.fullCatalogue')}</Button></Reveal>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {departments.map((d, i) => {
              const I = deptIcons[d.icon]
              return (
                <Reveal key={d.key} delay={(i % 2) * 0.08}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-navy-700/10 bg-white shadow-card transition duration-500 hover:-translate-y-1 hover:shadow-lift">
                    <div className="on-dark relative overflow-hidden bg-navy-700 p-7 text-white">
                      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden />
                      <div className="absolute -end-10 -top-10 h-36 w-36 rounded-full bg-leaf-600/40 blur-2xl transition-transform duration-700 group-hover:scale-150" aria-hidden />
                      <div className="relative flex items-start gap-4">
                        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/10 text-lime-500 ring-1 ring-white/15"><I className="h-7 w-7" strokeWidth={1.5} /></span>
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold !text-white">{pick(d.name)}</h3>
                          <dl className="mt-3 grid gap-1.5 text-sm" dir="ltr">
                            <div className="flex flex-wrap gap-x-2"><dt className="font-mono text-[11px] uppercase text-lime-500">{t('lab.instrumentLabel')}</dt><dd className="text-white/85">{d.instrument}</dd></div>
                            <div className="flex flex-wrap gap-x-2"><dt className="font-mono text-[11px] uppercase text-lime-500">{t('lab.methodsLabel')}</dt><dd className="text-white/85">{d.method}</dd></div>
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="p-7">
                      <p className="mb-4 font-mono text-xs font-semibold text-leaf-600">{d.params.length} {t('lab.paramsCount')}</p>
                      <ul className="flex flex-wrap gap-2" dir="ltr">
                        {d.params.map((p) => (
                          <li key={p} className={`rounded-lg border border-navy-700/10 bg-mist-50 text-sm font-medium text-navy-700 transition hover:border-leaf-600 hover:bg-leaf-600 hover:text-white ${d.key === 'icp' ? 'grid h-10 w-10 place-items-center font-mono' : 'px-3 py-1.5'}`}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
          <Reveal className="mt-6">
            <div className="flex flex-col gap-5 rounded-3xl border-s-4 border-leaf-600 bg-aqua-100 p-7 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-700 text-white"><TestTubes className="h-7 w-7" strokeWidth={1.5} /></span>
              <div>
                <h3 className="text-xl font-bold">{t('lab.samplingTitle')}</h3>
                <p className="mt-1.5 leading-relaxed">{t('lab.samplingText')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSIDE THE LAB — real photos */}
      <section className="pb-24">
        <div className="container">
          <SectionTitle eyebrow={t('lab.gallery.eyebrow')} title={t('lab.gallery.title')} />
          <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[220px] lg:grid-cols-4">
            {(t('lab.gallery.items', { returnObjects: true }) as { k: string; c: string }[]).map((g, i) => (
              <Reveal key={g.k} delay={(i % 4) * 0.06} className={i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'col-span-2' : ''}>
                <figure className="group relative h-full overflow-hidden rounded-2xl bg-navy-900">
                  <img src={`${import.meta.env.BASE_URL}images/lab/${g.k}.webp`} alt={g.c} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/85 to-transparent p-4 pt-10 text-sm font-semibold text-white">{g.c}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist-50 py-24">
        <div className="container">
          <SectionTitle eyebrow={t('lab.eyebrow')} title={t('lab.equipmentTitle')} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {equipment.map((e, i) => (
              <Reveal key={e.name} delay={(i % 2) * 0.06}>
                <div className="card group flex h-full items-start gap-5 p-6 transition hover:-translate-y-1 hover:border-leaf-600/40">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-aqua-100 font-mono text-sm font-bold text-navy-700 transition group-hover:bg-leaf-600 group-hover:text-white">{String(i + 1).padStart(2, '0')}</span>
                  <div><h3 className="font-bold" dir="ltr">{e.name}</h3><p className="mt-1 text-[15px]">{pick(e.use)}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid gap-8 lg:grid-cols-3">
          <Reveal className="card p-8 lg:col-span-1">
            <ShieldCheck className="h-9 w-9 text-leaf-600" strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-extrabold">{t('lab.qaTitle')}</h2>
            <ul className="mt-5 space-y-3">{qa.map((q) => <li key={q} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />{q}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08} className="on-dark rounded-2xl bg-navy-700 p-8 text-white">
            <BookOpen className="h-9 w-9 text-lime-500" strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-extrabold !text-white">{t('lab.methodsTitle')}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3" dir="ltr">
              {['APHA Standard Methods', 'USEPA 200.8 / 6020B', 'USEPA 8015', 'EPA 1605', 'ISO 10390 / 11265', 'HACH LCK'].map((m) => <span key={m} className="rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-center text-sm font-semibold">{m}</span>)}
            </div>
          </Reveal>
          <Reveal delay={0.16} className="card p-8">
            <Inbox className="h-9 w-9 text-leaf-600" strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-extrabold">{t('lab.retentionTitle')}</h2>
            <p className="mt-4 leading-relaxed">{t('lab.retention')}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
