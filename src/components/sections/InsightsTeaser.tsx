import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArticleCard } from '../blog/ArticleCard'
import { articles } from '../../data/articles'
import { Reveal } from '../ui/Reveal'
import { useL } from '../../lib/i18n-helpers'

/** Home: latest 3 articles (internal links for SEO). */
export function InsightsTeaser() {
  const { t } = useL()
  return (
    <section className="py-14 lg:py-16">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow"><span className="inline-block h-[2px] w-6 bg-current" />{t('insights.eyebrow')}</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl rtl:leading-[1.35]">{t('insights.homeTitle')}</h2>
          </div>
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-leaf-600">
            {t('insights.all')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.06}><ArticleCard a={a} compact /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
