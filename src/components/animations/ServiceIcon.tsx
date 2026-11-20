import { CalendarCheck, Droplet, Factory, Fan, FlaskConical, Layers, LifeBuoy, Mountain, Spline, Sprout, Waves } from 'lucide-react'
import type { Service } from '../../data/services'

export const serviceIconMap = { droplet: Droplet, factory: Factory, sprout: Sprout, layers: Layers, waves: Waves, mountain: Mountain, flask: FlaskConical, fan: Fan, pipe: Spline, pool: LifeBuoy, calendar: CalendarCheck }

/** Icon tile where "liquid" rises inside on hover of the parent `.group`. */
export function ServiceIcon({ icon, size = 'md' }: { icon: Service['icon']; size?: 'sm' | 'md' | 'lg' }) {
  const Icon = serviceIconMap[icon]
  const box = size === 'lg' ? 'h-20 w-20 rounded-3xl' : size === 'sm' ? 'h-11 w-11 rounded-xl' : 'h-14 w-14 rounded-2xl'
  return (
    <div className={`relative isolate grid ${box} shrink-0 place-items-center overflow-hidden bg-aqua-100 text-navy-700 transition-colors duration-500 group-hover:text-white`}>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-full translate-y-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
        <svg viewBox="0 0 120 20" preserveAspectRatio="none" className="absolute -top-[9px] left-0 h-[10px] w-[200%] animate-marquee fill-leaf-600" aria-hidden>
          <path d="M0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10 V20 H0Z" />
        </svg>
        <div className="h-full w-full bg-gradient-to-t from-navy-700 to-leaf-600" />
      </div>
      <Icon className={size === 'lg' ? 'h-9 w-9' : size === 'sm' ? 'h-5 w-5' : 'h-7 w-7'} strokeWidth={1.6} />
    </div>
  )
}
