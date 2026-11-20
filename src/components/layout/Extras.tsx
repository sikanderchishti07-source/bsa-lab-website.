import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { LeafMark } from '../brand/Logo'
import { site } from '../../config/site'
import { getLenis } from '../../hooks/useLenis'
import { useL } from '../../lib/i18n-helpers'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Leaf draw-in preloader, once per session, max ~1.2s. */
export function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('bsa-loaded')
    } catch {
      return true
    }
  })
  useEffect(() => {
    if (!show) return
    const id = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem('bsa-loaded', '1')
      } catch {
        /* ignore */
      }
    }, 1200)
    return () => clearTimeout(id)
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[200] grid place-items-center bg-navy-900" exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }} initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}>
          <LeafMark draw className="h-24 w-auto" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Diagonal navy/green/lime wipe that reveals each new route + scroll reset. */
export function RouteTransition() {
  const { pathname } = useLocation()
  const { isRtl } = useL()
  const reduced = useReducedMotion()
  useEffect(() => {
    const l = getLenis()
    if (l) l.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  if (reduced) return null
  const out = isRtl ? '-130%' : '130%'
  return (
    <motion.div
      key={pathname}
      aria-hidden
      className={`pointer-events-none fixed inset-y-0 -start-[15%] z-[90] flex w-[130%] ${isRtl ? 'flex-row-reverse' : ''}`}
      initial={{ x: '0%' }}
      animate={{ x: out }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.05 }}
    >
      <div className="h-full w-10 -skew-x-[20deg] bg-lime-500 rtl:skew-x-[20deg]" />
      <div className="h-full w-24 -skew-x-[20deg] bg-leaf-600 rtl:skew-x-[20deg]" />
      <div className="h-full flex-1 -skew-x-[20deg] bg-navy-700 rtl:skew-x-[20deg]" />
    </motion.div>
  )
}

export function WhatsAppButton() {
  return (
    <a href={site.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="group fixed bottom-6 end-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105">
      <span className="absolute inset-0 animate-pulseRing rounded-full bg-[#25D366]/40" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 fill-current" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 7c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
      </svg>
    </a>
  )
}
