import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import { articleImage, type Article } from '../../data/articles'
import { useL } from '../../lib/i18n-helpers'

export function formatDate(iso: string, lang: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString(lang === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function ArticleCard({ a, featured = false }: { a: Article; featured?: boolean }) {
  const { t, pick, lang } = useL()
  return (
    <Link
      to={`/insights/${a.slug}`}
      className={`group flex h-full overflow-hidden rounded-2xl border border-navy-700/10 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-leaf-600/30 hover:shadow-lift ${featured ? 'flex-col lg:flex-row' : 'flex-col'}`}
    >
      <div className={`relative overflow-hidden bg-navy-900 ${featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[55%]' : 'aspect-[16/10]'}`}>
        <img src={articleImage(a)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute start-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-navy-700 backdrop-blur rtl:tracking-normal">{pick(a.category)}</span>
      </div>
      <div className={`flex flex-1 flex-col ${featured ? 'p-7 lg:p-10' : 'p-6'}`}>
        <div className="flex items-center gap-3 text-xs text-ink-600">
          <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{t('insights.readTime', { n: a.readMins })}</span>
        </div>
        <h3 className={`mt-3 font-bold leading-snug transition-colors group-hover:text-leaf-600 ${featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>{pick(a.title)}</h3>
        <p className={`mt-3 leading-relaxed ${featured ? '' : 'line-clamp-3 text-sm'}`}>{pick(a.excerpt)}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-navy-700">
          {t('insights.read')}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
        </span>
      </div>
    </Link>
  )
}
