import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null
export const getLenis = () => lenisInstance

/** Smooth scrolling synced with GSAP ScrollTrigger. Disabled for reduced-motion users. */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenisInstance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisInstance = null
    }
  }, [enabled])
}
