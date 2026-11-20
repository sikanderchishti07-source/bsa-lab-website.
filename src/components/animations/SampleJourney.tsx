import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ClipboardCheck, FileCheck2, FlaskConical, MapPin, Microscope, ShieldCheck } from 'lucide-react'
import { useL } from '../../lib/i18n-helpers'
import { useReducedMotion } from '../../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)
const icons = [MapPin, ClipboardCheck, FlaskConical, Microscope, ShieldCheck, FileCheck2]

/**
 * Pinned scroll scene (desktop): a sample vial travels along a track and each step lights up.
 * On mobile / reduced motion it renders as a simple vertical timeline.
 */
export function SampleJourney({ header }: { header?: ReactNode }) {
  const { t, isRtl } = useL()
  const steps = t('home.journey', { returnObjects: true }) as { t: string; d: string }[]
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const el = root.current!
      const items = gsap.utils.toArray<HTMLElement>('.j-step', el)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=1600', scrub: 0.6, pin: true, anticipatePin: 1 },
      })
      tl.fromTo('.j-fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: items.length }, 0)
      const prop = isRtl ? 'right' : 'left'
      tl.fromTo('.j-vial', { [prop]: '0%' }, { [prop]: '100%', ease: 'none', duration: items.length }, 0)
      items.forEach((it, i) => {
        tl.to(it, { opacity: 1, y: 0, duration: 0.4 }, i * 0.95)
        tl.to(it.querySelector('.j-dot'), { backgroundColor: '#148A2A', color: '#fff', scale: 1.08, duration: 0.3 }, i * 0.95)
      })
    })
    return () => mm.revert()
  }, [reduced, isRtl])

  return (
    <div ref={root} className="relative lg:flex lg:h-screen lg:items-center lg:pt-16">
      <div className="w-full">
        {header && <div className="mb-12 lg:mb-16">{header}</div>}
        {/* desktop track */}
        <div className="relative mb-14 hidden h-1 rounded-full bg-navy-700/10 lg:block">
          <div className={`j-fill absolute inset-0 rounded-full bg-gradient-to-r from-navy-700 via-leaf-600 to-lime-500 ${isRtl ? 'origin-right' : 'origin-left'} ${reduced ? '' : 'scale-x-0'}`} />
          <div className={`j-vial absolute top-1/2 -translate-y-1/2 ${isRtl ? 'translate-x-1/2' : '-translate-x-1/2'}`} style={isRtl ? { right: 0 } : { left: 0 }}>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-lift ring-4 ring-lime-500/30">
              <FlaskConical className="h-6 w-6 text-leaf-600" />
            </div>
          </div>
        </div>
        <ol className="grid gap-6 lg:grid-cols-6 lg:gap-5">
          {steps.map((s, i) => {
            const Icon = icons[i]
            return (
              <li key={i} className={`j-step relative flex gap-4 lg:flex-col lg:gap-0 ${reduced ? '' : 'lg:translate-y-6 lg:opacity-40'}`}>
                <div className="j-dot grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-aqua-100 text-navy-700 lg:mb-5">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-display text-xs font-bold text-leaf-600">0{i + 1}</span>
                  <h3 className="mt-1 text-lg font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{s.d}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
