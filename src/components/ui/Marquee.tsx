import { FlaskConical } from 'lucide-react'

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy-900 py-5" dir="ltr" aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-900 to-transparent" />
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((p, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-bold text-white/85 sm:text-2xl">
            {p}
            <FlaskConical className="h-5 w-5 text-lime-500" />
          </span>
        ))}
      </div>
    </div>
  )
}
