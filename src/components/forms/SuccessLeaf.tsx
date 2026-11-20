import { motion } from 'framer-motion'
import { LeafMark } from '../brand/Logo'

/** Leaf grows, then a checkmark draws. */
export function SuccessLeaf() {
  return (
    <div className="relative mx-auto h-28 w-28">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 160, damping: 14 }} className="absolute inset-0 rounded-full bg-leaf-600/10" />
      <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 120, damping: 12 }} className="absolute inset-0 grid place-items-center">
        <LeafMark draw className="h-14 w-auto" />
      </motion.div>
      <motion.svg viewBox="0 0 40 40" className="absolute -bottom-1 -end-1 h-11 w-11 rounded-full bg-navy-700 p-2.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: 'spring' }}>
        <motion.path d="M8 21 l8 8 l16 -18" fill="none" stroke="#86B42E" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.05, duration: 0.45 }} />
      </motion.svg>
    </div>
  )
}
