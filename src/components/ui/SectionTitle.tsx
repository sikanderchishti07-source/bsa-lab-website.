import { motion } from 'framer-motion'
import { Reveal } from './Reveal'

type Props = { eyebrow?: string; title: string; sub?: string; center?: boolean; light?: boolean; className?: string }

/** Section heading with the letterhead stripe sliding in diagonally behind the eyebrow. */
export function SectionTitle({ eyebrow, title, sub, center, light, className = '' }: Props) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <div className={`relative mb-4 inline-flex items-center ${center ? 'justify-center' : ''}`}>
          <motion.span
            aria-hidden
            className="stripes-bg absolute -inset-x-3 inset-y-[-3px] -skew-x-[20deg] rounded-sm opacity-[0.12]"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
          />
          <span className={`eyebrow relative ${light ? '!text-lime-500' : ''}`}>
            <span className="inline-block h-[2px] w-6 bg-current" aria-hidden />
            {eyebrow}
          </span>
        </div>
      )}
      <Reveal>
        <h2 className={`text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-[2.85rem] ${light ? '!text-white' : ''}`}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.08}>
          <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/70' : 'text-ink-600'}`}>{sub}</p>
        </Reveal>
      )}
    </div>
  )
}
