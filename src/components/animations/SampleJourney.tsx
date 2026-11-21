import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ClipboardCheck, FileCheck2, FlaskConical, MapPin, Microscope, ShieldCheck } from 'lucide-react'
import { useL } from '../../lib/i18n-helpers'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { LabBackdrop, animateLab } from './LabBackdrop'

gsap.registerPlugin(ScrollTrigger)
const icons = [MapPin, ClipboardCheck, FlaskConical, Microscope, ShieldCheck, FileCheck2]

/**
 * Pinned scroll scene (desktop): a sample vial travels along a track; as it reaches each
 * station the step card lights up. Behind it, lab glassware drifts and fills with liquid.
 * On mobile / reduced motion it renders as a simple vertical list.
 */
export function SampleJourney({ header }: { header?: ReactNode }) {
  const { t, isRtl } = useL()
  const steps = t('home.journey', { returnObjects: true }) as { t: string; d: string }[]
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const N = steps.length

  useLayoutEffect(() => {
    if (reduced || !root.current) return
    const el = root.current
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.j-step', el)
      const nodes = el.querySelectorAll('.j-node')
      const checks = el.querySelectorAll('.j-node-check')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=1800', scrub: 0.6, pin: true, anticipatePin: 1 },
      })
      tl.fromTo('.j-fill', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: N }, 0)
      const prop = isRtl ? 'right' : 'left'
      tl.fromTo('.j-vial', { [prop]: '0%' }, { [prop]: '100%', ease: 'none', duration: N }, 0)
      animateLab(tl, el, N)
      cards.forEach((c, i) => {
        const at = i + 0.35 // vial reaches the station at i + 0.5
        tl.to(c, { opacity: 1, y: 0, duration: 0.35 }, at)
        tl.to(c.querySelector('.j-card'), { borderColor: 'rgba(20,138,42,.35)', boxShadow: '0 24px 50px -24px rgba(17,36,76,.35)', duration: 0.3 }, at)
        tl.to(c.querySelector('.j-bar'), { scaleX: 1, duration: 0.4 }, at)
        tl.to(c.querySelector('.j-dot'), { backgroundColor: '#148A2A', color: '#fff', duration: 0.3 }, at)
        tl.to(nodes[i], { backgroundColor: '#148A2A', borderColor: '#148A2A', scale: 1.15, duration: 0.25 }, at + 0.1)
        tl.to(checks[i], { opacity: 1, duration: 0.2 }, at + 0.15)
      })
    })
    mm.add('(max-width: 1023px)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
      animateLab(tl, el, 1)
    })
    return () => mm.revert()
  }, [reduced, isRtl, N])

  return (
    <div ref={root} className="relative lg:flex lg:h-screen lg:items-center lg:pt-16">
      <LabBackdrop />
      <div className="relative w-full">
        {header && <div className="mb-12 lg:mb-14">{header}</div>}

        {/* desktop track with stations */}
        <div className="relative mb-10 hidden h-1 rounded-full bg-navy-700/10 lg:block">
          <div className={`j-fill absolute inset-0 rounded-full bg-gradient-to-r from-navy-700 via-leaf-600 to-lime-500 rtl:bg-gradient-to-l ${isRtl ? 'origin-right' : 'origin-left'} ${reduced ? '' : 'scale-x-0'}`} />
          {steps.map((_, i) => (
            <span
              key={i}
              className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'translate-x-1/2' : '-translate-x-1/2'}`}
              style={{ [isRtl ? 'right' : 'left']: `${((i + 0.5) / N) * 100}%` }}
            >
              <span className={`j-node relative grid h-5 w-5 place-items-center rounded-full border-2 ${reduced ? 'border-leaf-600 bg-leaf-600' : 'border-navy-700/20 bg-white'}`}>
                <Check className={`j-node-check h-3 w-3 text-white ${reduced ? '' : 'opacity-0'}`} strokeWidth={3} />
              </span>
            </span>
          ))}
          <div className={`j-vial absolute top-1/2 z-10 -translate-y-1/2 ${isRtl ? 'translate-x-1/2' : '-translate-x-1/2'}`} style={isRtl ? { right: 0 } : { left: 0 }}>
            <div className="relative grid h-12 w-12 place-items-center rounded-full bg-white shadow-lift ring-4 ring-lime-500/30">
              <span className="absolute inset-0 rounded-full ring-2 ring-leaf-600/40 motion-safe:animate-pulseRing" />
              <FlaskConical className="h-6 w-6 text-leaf-600" />
            </div>
          </div>
        </div>

        <ol className="grid gap-4 lg:grid-cols-6 lg:gap-4">
          {steps.map((s, i) => {
            const Icon = icons[i]
            return (
              <li key={i} className={`j-step relative ${reduced ? '' : 'lg:translate-y-6 lg:opacity-40'}`}>
                <div className="j-card relative h-full overflow-hidden rounded-2xl border border-navy-700/10 bg-white/85 p-5 shadow-card backdrop-blur-sm lg:min-h-[248px]">
                  <span className={`j-bar absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-leaf-600 to-lime-500 ${isRtl ? 'origin-right' : 'origin-left'} ${reduced ? '' : 'lg:scale-x-0'}`} />
                  <div className="flex items-start justify-between">
                    <div className="j-dot grid h-12 w-12 place-items-center rounded-xl bg-aqua-100 text-navy-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-2xl font-semibold text-navy-700/10" dir="ltr">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-[1.05rem] font-bold leading-snug">{s.t}</h3>
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
