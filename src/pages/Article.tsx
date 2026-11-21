import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Lightbulb } from 'lucide-react'
import { CtaBand } from '../components/layout/CtaBand'
import { ArticleCard, formatDate } from '../components/blog/ArticleCard'
import { ServiceIcon } from '../components/animations/ServiceIcon'
import { articleImage, articles } from '../data/articles'
import { services } from '../data/services'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'
import NotFound from './NotFound'

export default function ArticlePage() {
  const { slug } = useParams()
  const { t, pick, lang } = useL()
  const a = articles.find((x) => x.slug === slug)
  useSeo(a ? `${pick(a.title)} | BSA.lab` : 'BSA.lab', a ? pick(a.excerpt) : undefined, a ? {
    path: `/insights/${a.slug}`,
    image: a.cover,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: pick(a.title),
      description: pick(a.excerpt),
      image: `${site.url}/${a.cover}`,
      datePublished: a.date,
      dateModified: a.date,
      inLanguage: lang,
      author: { '@type': 'Organization', name: 'BSA.lab' },
      publisher: { '@type': 'Organization', name: 'BSA.lab', logo: { '@type': 'ImageObject', url: `${site.url}/favicon.svg` } },
      mainEntityOfPage: `${site.url}/insights/${a.slug}`,
    },
  } : {})
  if (!a) return <NotFound />

  const related = services.filter((s) => a.related.includes(s.slug))
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3)

  return (
    <>
      <section className="on-dark relative overflow-hidden bg-navy-900 pb-16 pt-32 text-white lg:pb-20 lg:pt-40">
        <img src={articleImage(a)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/40" />
        <div className="container relative max-w-4xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Link to="/" className="hover:text-white">{t('nav.home')}</Link><span aria-hidden>/</span>
            <Link to="/insights" className="hover:text-white">{t('nav.insights')}</Link><span aria-hidden>/</span>
            <span className="text-white/90">{pick(a.category)}</span>
          </nav>
          <span className="mt-6 inline-block rounded-full bg-lime-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-900 rtl:tracking-normal">{pick(a.category)}</span>
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.12] !text-white sm:text-4xl lg:text-5xl rtl:leading-[1.35]">{pick(a.title)}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75">{pick(a.excerpt)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/60">
            <span className="font-semibold text-white/85">{t('insights.author')}</span><span aria-hidden>·</span>
            <time dateTime={a.date}>{formatDate(a.date, lang)}</time><span aria-hidden>·</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{t('insights.readTime', { n: a.readMins })}</span>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <article className="max-w-3xl text-[17px] leading-[1.8] text-ink-800">
            {a.body[lang === 'ar' ? 'ar' : 'en'].map((b, i) => (
              <div key={i}>
                {b.h && <h2 className="mb-3 mt-10 text-2xl font-bold leading-snug text-navy-700 first:mt-0">{b.h}</h2>}
                {b.p && <p className="mb-5">{b.p}</p>}
                {b.ul && (
                  <ul className="mb-6 space-y-2.5">
                    {b.ul.map((li) => (
                      <li key={li} className="flex gap-3"><span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-600" />{li}</li>
                    ))}
                  </ul>
                )}
                {b.tip && (
                  <p className="mb-6 flex gap-3 rounded-2xl border border-leaf-600/20 bg-leaf-600/[0.06] p-5 text-[15px] leading-relaxed text-navy-700">
                    <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-leaf-600" />{b.tip}
                  </p>
                )}
              </div>
            ))}
            <Link to="/insights" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-leaf-600">
              <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />{t('insights.back')}
            </Link>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {related.length > 0 && (
              <div className="rounded-2xl border border-navy-700/10 bg-mist-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-leaf-600 rtl:tracking-normal">{t('insights.relatedServices')}</p>
                <ul className="mt-4 space-y-2">
                  {related.map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="flex items-center gap-3 rounded-xl bg-white p-3 text-sm font-semibold text-navy-700 shadow-card transition hover:text-leaf-600">
                        <ServiceIcon icon={s.icon} size="sm" />{pick(s.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="on-dark rounded-2xl bg-navy-700 p-6 text-white">
              <p className="font-display text-lg font-bold !text-white">{t('insights.asideTitle')}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{t('insights.asideText')}</p>
              <Link to="/contact" className="mt-5 inline-flex rounded-full bg-leaf-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-lime-500 hover:text-navy-900">{t('nav.quote')}</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-navy-700/10 bg-mist-50 py-16">
        <div className="container">
          <h2 className="text-2xl font-bold">{t('insights.more')}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => <ArticleCard key={m.slug} a={m} />)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
