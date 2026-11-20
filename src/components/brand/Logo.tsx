import { motion } from 'framer-motion'
import { LEAF_GREEN, LEAF_LIME, LEAF_OFFSET_Y, LOGO_TEXT } from './logoPaths'

type Props = { variant?: 'dark' | 'light'; className?: string; title?: string }

/** Full BSA.lab wordmark + leaves. `light` = for dark backgrounds. */
export function Logo({ variant = 'dark', className = 'h-11 w-auto', title = 'BSA.lab' }: Props) {
  const text = variant === 'light' ? '#FFFFFF' : '#11244C'
  return (
    <svg viewBox="0 0 454 292" className={className} role="img" aria-label={title}>
      <path fill={text} fillRule="evenodd" d={LOGO_TEXT} />
      <g transform={`translate(0 ${LEAF_OFFSET_Y})`}>
        <path fill="#86B42E" fillRule="evenodd" d={LEAF_LIME} />
        <path fill="#148A2A" fillRule="evenodd" d={LEAF_GREEN} />
      </g>
    </svg>
  )
}

/** Leaves only. `draw` animates a stroke draw-in followed by a fill. */
export function LeafMark({ className = 'h-10 w-auto', draw = false }: { className?: string; draw?: boolean }) {
  if (!draw) {
    return (
      <svg viewBox="0 0 436 163" className={className} aria-hidden="true">
        <path fill="#86B42E" fillRule="evenodd" d={LEAF_LIME} />
        <path fill="#148A2A" fillRule="evenodd" d={LEAF_GREEN} />
      </svg>
    )
  }
  const common = { strokeWidth: 3, initial: { pathLength: 0, fillOpacity: 0 }, animate: { pathLength: 1, fillOpacity: 1 } }
  return (
    <svg viewBox="0 0 436 163" className={className} aria-hidden="true">
      <motion.path
        {...common}
        d={LEAF_LIME}
        fill="#86B42E"
        stroke="#86B42E"
        fillRule="evenodd"
        transition={{ pathLength: { duration: 0.7, ease: 'easeInOut' }, fillOpacity: { delay: 0.55, duration: 0.3 } }}
      />
      <motion.path
        {...common}
        d={LEAF_GREEN}
        fill="#148A2A"
        stroke="#1C8D31"
        fillRule="evenodd"
        transition={{ pathLength: { delay: 0.15, duration: 0.8, ease: 'easeInOut' }, fillOpacity: { delay: 0.75, duration: 0.3 } }}
      />
    </svg>
  )
}
