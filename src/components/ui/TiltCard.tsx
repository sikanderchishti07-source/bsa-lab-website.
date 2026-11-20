import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Subtle 3D tilt on hover (max 6deg) with a moving highlight. */
export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [6, -6]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 })
  const glow = useTransform([px, py], ([x, y]: number[]) => `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgba(134,180,46,.14), transparent 45%)`)

  const move = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const leave = () => {
    px.set(0.5)
    py.set(0.5)
  }
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformPerspective: 900 }} className={`relative ${className}`}>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glow }} />
      {children}
    </motion.div>
  )
}
