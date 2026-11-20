import { motion } from 'framer-motion'

/** The letterhead's slanted navy / green / lime band. Mirrors automatically in RTL via CSS. */
export function BrandStripes({ className = '', animate = true }: { className?: string; animate?: boolean }) {
  return (
    <div className={`pointer-events-none flex h-full ${className}`} aria-hidden>
      {[
        { c: 'bg-lime-500', w: 'w-[18%]', d: 0.25 },
        { c: 'bg-leaf-600', w: 'w-[30%]', d: 0.15 },
        { c: 'bg-navy-700', w: 'w-[52%]', d: 0.05 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className={`${s.w} ${i === 0 ? '' : '-ms-px'}`}
          initial={animate ? { x: '60%', opacity: 0 } : false}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: s.d + 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`h-full w-full ${s.c} -skew-x-[32deg] rtl:skew-x-[32deg]`} />
        </motion.div>
      ))}
    </div>
  )
}

export function FooterBar({ className = 'h-1.5' }: { className?: string }) {
  return (
    <div className={`flex w-full ${className}`} aria-hidden>
      <div className="w-[40%] bg-navy-700" />
      <div className="w-[40%] bg-leaf-600" />
      <div className="w-[20%] bg-lime-500" />
    </div>
  )
}

export function StripeDivider() {
  return (
    <div className="container" aria-hidden>
      <motion.div className="flex h-1 overflow-hidden rounded-full" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }} style={{ transformOrigin: 'var(--origin, left)' }}>
        <div className="w-[60%] bg-navy-700" />
        <div className="w-[25%] bg-leaf-600" />
        <div className="w-[15%] bg-lime-500" />
      </motion.div>
    </div>
  )
}
