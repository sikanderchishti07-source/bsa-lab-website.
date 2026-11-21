import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'
import { useL } from '../../lib/i18n-helpers'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const base = import.meta.env.BASE_URL
export const labVideo = { src: `${base}video/lab-loop.mp4`, poster: `${base}video/lab-poster.webp` }

/** "Inside our lab": real footage from the BSA.lab laboratory, muted loop with play/pause. */
export function LabFilm() {
  const { t } = useL()
  const reduced = useReducedMotion()
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(!reduced)
  const tags = t('home.film.tags', { returnObjects: true }) as string[]

  // only play while on screen
  useEffect(() => {
    const v = ref.current
    if (!v || reduced) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && playing) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [playing, reduced])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) { v.play().catch(() => {}); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="on-dark relative overflow-hidden rounded-[28px] bg-navy-900 shadow-lift"
        >
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            src={labVideo.src}
            poster={labVideo.poster}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={!reduced}
            aria-label={t('home.film.alt')}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/60 to-navy-900/0 rtl:bg-gradient-to-l" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/70 to-transparent" />

          <div className="relative flex min-h-[460px] flex-col justify-between p-7 sm:p-10 lg:min-h-[560px] lg:p-14">
            <div className="max-w-xl">
              <span className="eyebrow !text-lime-500"><span className="inline-block h-[2px] w-6 bg-current" />{t('home.film.eyebrow')}</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] !text-white sm:text-4xl lg:text-5xl rtl:leading-[1.3]">{t('home.film.title')}</h2>
              <p className="mt-5 max-w-lg leading-relaxed text-white/80">{t('home.film.sub')}</p>
              <Link to="/laboratory" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-700 transition hover:bg-lime-500">
                {t('home.film.cta')}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {tags.map((x) => (
                  <li key={x} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">{x}</li>
                ))}
              </ul>
              {!reduced && (
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? t('home.film.pause') : t('home.film.play')}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-navy-700"
                >
                  {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-px" />}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
