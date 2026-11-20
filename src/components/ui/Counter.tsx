import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { useL } from '../../lib/i18n-helpers'

export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [v, setV] = useState(0)
  const { lang } = useL()
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (n) => setV(Math.round(n)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref} className="tabular-nums">
      {v.toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US')}
      {suffix}
    </span>
  )
}
