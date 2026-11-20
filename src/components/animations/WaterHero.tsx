import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Canvas scene: layered slow waves in brand blues plus floating "micro-particles"
 * (sediment / microorganisms). Pauses when off-screen or tab hidden; static under reduced motion.
 */
export function WaterHero({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; hue: number }
    let parts: P[] = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round(Math.min(70, (w * h) / 16000))
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(Math.random() * 0.25 + 0.05),
        a: Math.random() * 0.5 + 0.15,
        hue: Math.random(),
      }))
    }

    const waves = [
      { amp: 22, len: 0.0042, speed: 0.00035, y: 0.62, color: 'rgba(47,111,181,0.22)' },
      { amp: 30, len: 0.003, speed: -0.00025, y: 0.7, color: 'rgba(30,58,112,0.55)' },
      { amp: 18, len: 0.0055, speed: 0.0005, y: 0.78, color: 'rgba(20,138,42,0.16)' },
      { amp: 26, len: 0.0036, speed: 0.0003, y: 0.86, color: 'rgba(11,26,56,0.85)' },
    ]

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      // particles
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.hue > 0.82 ? `rgba(134,180,46,${p.a})` : `rgba(181,206,240,${p.a})`
        ctx.fill()
      }
      // waves
      for (const wv of waves) {
        ctx.beginPath()
        ctx.moveTo(0, h)
        for (let x = 0; x <= w + 8; x += 8) {
          const y = h * wv.y + Math.sin(x * wv.len + t * wv.speed) * wv.amp + Math.sin(x * wv.len * 2.3 + t * wv.speed * 1.7) * (wv.amp * 0.35)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, h)
        ctx.closePath()
        ctx.fillStyle = wv.color
        ctx.fill()
      }
    }

    const loop = (t: number) => {
      if (visible && !document.hidden) draw(t)
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    if (reduced) draw(4000)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [reduced])

  return <canvas ref={ref} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden />
}
