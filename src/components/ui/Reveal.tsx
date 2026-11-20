import { motion, type HTMLMotionProps } from 'framer-motion'

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number; blur?: boolean }

/** Fade-up + blur-to-sharp when scrolled into view (runs once). */
export function Reveal({ delay = 0, y = 28, blur = true, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
export const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}
