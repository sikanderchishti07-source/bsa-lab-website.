import { useMemo, useState } from 'react'
import { PageHero } from '../components/layout/PageHero'
import { CtaBand } from '../components/layout/CtaBand'
import { Reveal } from '../components/ui/Reveal'
import { ArticleCard } from '../components/blog/ArticleCard'
import { articles } from '../data/articles'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function Insights() {
  const { t, pick } = useL()
  const [cat, setCat] = useState<string | null>(null)
  useSeo(t('seo.insights'), t('insights.sub'), {
    path: '/insights',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'BSA.lab Insights',
      url: `${site.url}/insights`,
      blogPost: articles.map((a) => ({ '@type': 'BlogPosting', headline: a.title.en, datePublished: a.date, url: `${site.url}/insights/${a.slug}` })),
    },
  })
  const cats = useMemo(() => Array.from(new Map(articles.map((a) => [a.category.en, a.category])).values()), [])
  const list = cat ? articles.filter((a) => a.category.en === cat) : articles
  const [first, ...rest] = list

  return (
    <>
      <PageHero eyebrow={t('insights.eyebrow')} title={t('insights.title')} sub={t('insights.sub')} crumbs={[{ label: t('nav.insights') }]} />
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('insights.filter')}>
            {[null, ...cats.map((c) => c.en)].map((c) => {
              const label = c === null ? t('insights.all') : pick(cats.find((x) => x.en === c)!)
              const on = cat === c
              return (
                <button key={c ?? 'all'} role="tab" aria-selected={on} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? 'border-navy-700 bg-navy-700 text-white' : 'border-navy-700/15 bg-white text-navy-700 hover:border-leaf-600/40'}`}>
                  {label}
                </button>
              )
            })}
          </div>
          {first && <Reveal className="mt-10"><ArticleCard a={first} featured /></Reveal>}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06}><ArticleCard a={a} /></Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
