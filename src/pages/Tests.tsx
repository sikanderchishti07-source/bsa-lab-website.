import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Beaker, Info, Scale, Search, X } from 'lucide-react'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { catalogue, type CatalogueGroup } from '../data/catalogue'
import { limits } from '../data/limits'
import { useL, type Bi } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export const groupLabels: Record<CatalogueGroup, Bi> = {
  metals: { en: 'Metals (ICP-MS)', ar: 'المعادن (ICP-MS)' },
  physical: { en: 'Physical & field', ar: 'فيزيائية وميدانية' },
  general: { en: 'General chemistry', ar: 'الكيمياء العامة' },
  nutrients: { en: 'Anions, nutrients & organic load', ar: 'الأنيونات والمغذيات والحمل العضوي' },
  organics: { en: 'Organic compounds (GC)', ar: 'المركبات العضوية (GC)' },
  micro: { en: 'Microbiology', ar: 'الميكروبيولوجي' },
}

const scenarios: { key: string; label: Bi }[] = [
  { key: 'Unbottled drinking water', label: { en: 'Drinking water', ar: 'مياه الشرب' } },
  { key: 'Discharge to coastal and marine waters', label: { en: 'Treated wastewater → sea', ar: 'مياه معالجة ← البحر' } },
  { key: 'Discharge to soil/land or surface waters', label: { en: 'Treated wastewater → land / surface', ar: 'مياه معالجة ← الأرض / المياه السطحية' } },
  { key: 'Discharge to municipal sewer', label: { en: 'Commercial wastewater → sewer', ar: 'مياه صرف تجارية ← شبكة الصرف' } },
  { key: 'Soil protection / contaminated-site screening', label: { en: 'Soil pollution', ar: 'تلوث التربة' } },
]

type Matrix = 'all' | 'water' | 'soil'

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition ${on ? 'border-navy-700 bg-navy-700 text-white' : 'border-navy-700/15 bg-white text-navy-700 hover:border-navy-700/40'}`}>
      {children}
    </button>
  )
}

export default function Tests() {
  const { t, pick } = useL()
  useSeo(t('seo.tests'), t('tests.sub'))
  const [tab, setTab] = useState<'catalogue' | 'limits'>('catalogue')
  const [q, setQ] = useState('')
  const [group, setGroup] = useState<CatalogueGroup | 'all'>('all')
  const [matrix, setMatrix] = useState<Matrix>('all')
  const [accOnly, setAccOnly] = useState(false)
  const [scenario, setScenario] = useState(scenarios[0].key)
  const [lq, setLq] = useState('')

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase()
    return catalogue.filter(
      (c) =>
        (group === 'all' || c.group === group) &&
        (matrix === 'all' || c.matrices[matrix]) &&
        (!accOnly || c.accredited) &&
        (!s || `${c.param} ${c.method} ${c.instrument}`.toLowerCase().includes(s)),
    )
  }, [q, group, matrix, accOnly])

  const limitRows = useMemo(() => {
    const s = lq.trim().toLowerCase()
    return limits.filter((l) => l.scenario === scenario && (!s || l.param.toLowerCase().includes(s)))
  }, [scenario, lq])
  const limitSources = [...new Set(limitRows.map((l) => l.source))]

  const stats = [
    { v: catalogue.length, l: t('tests.statTests') },
    { v: catalogue.filter((c) => c.accredited).length, l: t('tests.statAcc') },
    { v: catalogue.filter((c) => c.group === 'metals').length, l: t('tests.statMetals') },
    { v: 6, l: t('tests.statDays') },
  ]

  return (
    <>
      <PageHero eyebrow={t('tests.eyebrow')} title={t('tests.title')} sub={t('tests.sub')} crumbs={[{ to: '/laboratory', label: t('nav.laboratory') }, { label: t('tests.eyebrow') }]}
        aside={
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="font-mono text-3xl font-bold text-white">{s.v}</p>
                <p className="mt-1 text-xs text-white/65">{s.l}</p>
              </div>
            ))}
          </div>
        } />

      <section className="bg-mist-50 py-16 lg:py-20">
        <div className="container">
          {/* tabs */}
          <div role="tablist" className="inline-flex rounded-2xl border border-navy-700/10 bg-white p-1.5 shadow-card">
            {([['catalogue', Beaker, t('tests.tabCatalogue')], ['limits', Scale, t('tests.tabLimits')]] as const).map(([k, I, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:px-6 ${tab === k ? 'text-white' : 'text-navy-700 hover:bg-navy-700/5'}`}>
                {tab === k && <motion.span layoutId="tabbg" className="absolute inset-0 rounded-xl bg-navy-700" transition={{ type: 'spring', stiffness: 300, damping: 30 }} />}
                <I className="relative h-4 w-4" />
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'catalogue' ? (
              <motion.div key="cat" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {/* controls */}
                <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <label className="relative block">
                    <span className="sr-only">{t('tests.search')}</span>
                    <Search className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-600" />
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('tests.search')} className="input h-14 ps-12 text-base" />
                    {q && <button onClick={() => setQ('')} className="absolute end-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-navy-700/5" aria-label="Clear"><X className="h-4 w-4" /></button>}
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {(['all', 'water', 'soil'] as Matrix[]).map((m) => <Chip key={m} on={matrix === m} onClick={() => setMatrix(m)}>{t(`tests.m_${m}`)}</Chip>)}
                    <button onClick={() => setAccOnly(!accOnly)} aria-pressed={accOnly} className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition ${accOnly ? 'border-leaf-600 bg-leaf-600 text-white' : 'border-leaf-600/30 bg-white text-leaf-700 hover:border-leaf-600'}`}>
                      <BadgeCheck className="h-4 w-4" />{t('tests.accOnly')}
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  <Chip on={group === 'all'} onClick={() => setGroup('all')}>{t('tests.allGroups')}</Chip>
                  {(Object.keys(groupLabels) as CatalogueGroup[]).map((g) => <Chip key={g} on={group === g} onClick={() => setGroup(g)}>{pick(groupLabels[g])}</Chip>)}
                </div>

                <p className="mt-6 text-sm text-ink-600" aria-live="polite">{t('tests.showing', { n: rows.length, total: catalogue.length })}</p>

                {/* table (desktop) */}
                <div className="mt-3 hidden overflow-hidden rounded-2xl border border-navy-700/10 bg-white shadow-card md:block">
                  <table className="w-full text-start text-sm">
                    <thead className="bg-navy-700 text-white">
                      <tr>
                        {[t('tests.thParam'), t('tests.thMethod'), t('tests.thWater'), t('tests.thSoil'), t('tests.thAcc')].map((h) => <th key={h} scope="col" className="px-5 py-3.5 text-start text-xs font-semibold uppercase tracking-wide rtl:tracking-normal">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-navy-700/[0.07]">
                      {rows.map((c) => (
                        <tr key={c.param} className="transition hover:bg-aqua-100/50">
                          <th scope="row" className="px-5 py-3.5 text-start align-top" dir="ltr">
                            <span className="block font-semibold text-navy-700">{c.param}</span>
                            <span className="mt-0.5 block text-xs font-normal text-ink-600">{c.instrument}</span>
                          </th>
                          <td className="px-5 py-3.5 align-top font-mono text-xs text-ink-800" dir="ltr">{c.method}</td>
                          {(['water', 'soil'] as const).map((m) => (
                            <td key={m} className="whitespace-nowrap px-5 py-3.5 align-top font-mono text-xs" dir="ltr">
                              {c.matrices[m] ? (
                                <>
                                  <span className="block text-navy-700">{c.matrices[m]!.unit}</span>
                                  <span className="block text-ink-600">LOQ {c.matrices[m]!.loq}</span>
                                </>
                              ) : <span className="text-ink-600/50">—</span>}
                            </td>
                          ))}
                          <td className="px-5 py-3.5 align-top">
                            {c.accredited ? <span className="inline-flex items-center gap-1 rounded-full bg-leaf-600/10 px-2.5 py-1 text-xs font-semibold text-leaf-700"><BadgeCheck className="h-3.5 w-3.5" />{t('tests.scopeBadge')}</span> : <span className="text-xs text-ink-600/60">—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* cards (mobile) */}
                <ul className="mt-3 grid gap-3 md:hidden">
                  {rows.map((c) => (
                    <li key={c.param} className="card p-4" dir="ltr">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-navy-700">{c.param}</p>
                          <p className="mt-0.5 text-xs">{c.instrument}</p>
                        </div>
                        {c.accredited && <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-leaf-600/10 px-2 py-0.5 text-[11px] font-semibold text-leaf-700"><BadgeCheck className="h-3 w-3" />{t('tests.scopeBadge')}</span>}
                      </div>
                      <p className="mt-2 font-mono text-[11px] text-ink-800">{c.method}</p>
                      <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px]">
                        {(['water', 'soil'] as const).filter((m) => c.matrices[m]).map((m) => (
                          <span key={m} className="rounded-md bg-mist-50 px-2 py-1">{m === 'water' ? 'Water' : 'Soil'}: {c.matrices[m]!.unit} · LOQ {c.matrices[m]!.loq}</span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
                {!rows.length && <p className="mt-6 rounded-2xl bg-white p-8 text-center">{t('tests.none')}</p>}

                <p className="mt-6 flex items-start gap-2 text-xs text-ink-600"><Info className="mt-0.5 h-4 w-4 shrink-0" />{t('tests.note')}</p>
              </motion.div>
            ) : (
              <motion.div key="lim" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                <p className="mt-8 max-w-3xl text-lg">{t('tests.limitsIntro')}</p>
                <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
                  {scenarios.map((s) => <Chip key={s.key} on={scenario === s.key} onClick={() => setScenario(s.key)}>{pick(s.label)}</Chip>)}
                </div>
                <label className="relative mt-4 block max-w-md">
                  <span className="sr-only">{t('tests.searchLimits')}</span>
                  <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-600" />
                  <input value={lq} onChange={(e) => setLq(e.target.value)} placeholder={t('tests.searchLimits')} className="input ps-11" />
                </label>

                <Reveal className="mt-6">
                  <div className="overflow-x-auto rounded-2xl border border-navy-700/10 bg-white shadow-card">
                    <table className="w-full min-w-[560px] text-start text-sm" dir="ltr">
                      <thead className="bg-navy-700 text-white">
                        <tr>{['Parameter', 'Limit', 'Unit'].map((h) => <th key={h} scope="col" className="px-5 py-3.5 text-start text-xs font-semibold uppercase tracking-wide">{h}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y divide-navy-700/[0.07]">
                        {limitRows.map((l, i) => (
                          <tr key={i} className="hover:bg-aqua-100/50">
                            <th scope="row" className="px-5 py-3 text-start font-semibold text-navy-700">{l.param}</th>
                            <td className="px-5 py-3 font-mono text-xs text-ink-800">{l.limit}{l.note && <span className="mt-0.5 block font-sans text-[11px] text-ink-600">{l.note}</span>}</td>
                            <td className="whitespace-nowrap px-5 py-3 font-mono text-xs">{l.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Reveal>
                <p className="mt-4 text-xs text-ink-600" dir="ltr">Source: {limitSources.join(' · ')}</p>
                <p className="mt-3 flex items-start gap-2 text-xs text-ink-600"><Info className="mt-0.5 h-4 w-4 shrink-0" />{t('tests.limitsNote')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <CtaBand title={t('tests.ctaTitle')} sub={t('tests.ctaSub')} />
    </>
  )
}
