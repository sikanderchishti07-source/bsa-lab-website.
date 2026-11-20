import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export function Accordion({ items }: { items: { q: string; a: string; badge?: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  return (
    <div className="divide-y divide-navy-700/10 rounded-2xl border border-navy-700/10 bg-white">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i}>
            <h3>
              <button
                id={`${base}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-start font-display text-base font-bold text-navy-700 sm:text-lg"
              >
                <span>
                  {it.q}
                  {it.badge && <span className="ms-2 rounded-full bg-amber-100 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase text-amber-800">{it.badge}</span>}
                </span>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 bg-leaf-600 text-white' : 'bg-navy-700/5 text-navy-700'}`}>
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-p${i}`}
                  role="region"
                  aria-labelledby={`${base}-b${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-relaxed text-ink-600">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
