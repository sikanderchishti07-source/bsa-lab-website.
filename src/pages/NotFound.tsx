import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

export default function NotFound() {
  const { t } = useL()
  useSeo(t('seo.notFound'))
  return (
    <section className="on-dark relative grid min-h-[90vh] place-items-center overflow-hidden bg-navy-700 px-6 pt-24 text-center text-white">
      <div>
        <motion.svg viewBox="0 0 80 200" className="mx-auto h-48 w-auto" animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '40px 10px' }} aria-hidden>
          <rect x="18" y="4" width="44" height="14" rx="4" fill="#86B42E" />
          <path d="M24 18 V170 a16 16 0 0 0 32 0 V18" fill="rgba(255,255,255,.06)" stroke="#fff" strokeWidth="3" />
          <motion.circle cx="40" cy="176" r="3" fill="#86B42E" animate={{ opacity: [0, 1, 0], cy: [176, 150] }} transition={{ duration: 2.4, repeat: Infinity }} />
        </motion.svg>
        <p className="mt-8 font-display text-7xl font-extrabold text-lime-500">404</p>
        <h1 className="mt-4 text-3xl font-extrabold !text-white sm:text-4xl">{t('notFound.title')}</h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">{t('notFound.sub')}</p>
        <div className="mt-8"><Button to="/" arrow>{t('common.backHome')}</Button></div>
      </div>
    </section>
  )
}
