import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Variant = 'green' | 'navy' | 'ghost' | 'outline-light' | 'white'
type Props = {
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  children: ReactNode
  arrow?: boolean
  magnetic?: boolean
  className?: string
  disabled?: boolean
  size?: 'md' | 'lg'
}

const styles: Record<Variant, string> = {
  green: 'bg-leaf-600 text-white hover:bg-leaf-700 shadow-[0_10px_30px_-10px_rgba(20,138,42,.7)]',
  navy: 'bg-navy-700 text-white hover:bg-navy-500',
  ghost: 'text-navy-700 hover:bg-navy-700/5',
  'outline-light': 'border border-white/30 text-white hover:bg-white/10 backdrop-blur',
  white: 'bg-white text-navy-700 hover:bg-mist-50',
}

/** CTA button with optional magnetic hover and click ripple. */
export function Button({ to, href, onClick, type = 'button', variant = 'green', children, arrow, magnetic = false, className = '', disabled, size = 'md' }: Props) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const onMove = (e: MouseEvent) => {
    if (!magnetic || reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  const ripple = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const id = Date.now()
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }])
    setTimeout(() => setRipples((p) => p.filter((i) => i.id !== id)), 650)
  }

  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none ${size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'} ${styles[variant]} ${className}`
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && <ArrowRight className="flip-rtl relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden />}
      {ripples.map((r) => (
        <span key={r.id} className="pointer-events-none absolute h-2 w-2 rounded-full bg-white/50" style={{ left: r.x, top: r.y, animation: 'pulseRing .65s ease-out forwards', transform: 'scale(0)' }} />
      ))}
    </>
  )

  let el: ReactNode
  if (to) el = <Link to={to} className={cls} onClick={(e) => { ripple(e); onClick?.() }}>{inner}</Link>
  else if (href) el = <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" onClick={ripple}>{inner}</a>
  else el = <button type={type} disabled={disabled} className={cls} onClick={(e) => { ripple(e); onClick?.() }}>{inner}</button>

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x: sx, y: sy }} className="inline-block">
      {el}
    </motion.div>
  )
}
