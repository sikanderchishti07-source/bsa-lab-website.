import { gsap } from 'gsap'
import { useId } from 'react'

/**
 * Decorative lab-glassware layer (flasks, tubes, beakers, molecules).
 * Each glass has a `.lab-liquid` rect the parent timeline raises on scroll,
 * and each item has `.lab-item` + data-speed for scroll parallax.
 */

type Kind = 'erlenmeyer' | 'tube' | 'beaker' | 'round' | 'molecule' | 'drop'

const bodies: Record<Exclude<Kind, 'molecule' | 'drop'>, { body: string; neck?: string; vb: string }> = {
  erlenmeyer: { vb: '0 0 100 140', body: 'M42 12 V52 L15 118 Q11 130 24 130 H76 Q89 130 85 118 L58 52 V12 Z', neck: 'M36 12 H64' },
  tube: { vb: '0 0 60 150', body: 'M20 10 V128 A10 10 0 0 0 40 128 V10 Z', neck: 'M14 10 H46' },
  beaker: { vb: '0 0 100 130', body: 'M18 14 V114 Q18 124 28 124 H72 Q82 124 82 114 V14 Z', neck: 'M12 14 H24' },
  round: { vb: '0 0 100 140', body: 'M44 10 V60 A32 32 0 1 0 56 60 V10 Z', neck: 'M38 10 H62' },
}

function Glass({ kind, level }: { kind: keyof typeof bodies; level: number }) {
  const id = useId().replace(/:/g, '')
  const g = bodies[kind]
  const [, , w, h] = g.vb.split(' ').map(Number)
  return (
    <svg viewBox={g.vb} className="h-full w-full overflow-visible" fill="none">
      <defs>
        <clipPath id={`c${id}`}><path d={g.body} /></clipPath>
        <linearGradient id={`l${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86B42E" stopOpacity=".55" />
          <stop offset="1" stopColor="#148A2A" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#c${id})`}>
        {/* liquid: GSAP moves this rect up (y) as you scroll */}
        <rect className="lab-liquid" data-level={level} x="0" y={h} width={w} height={h} fill={`url(#l${id})`} />
        {/* bubbles */}
        {[0.35, 0.55, 0.7].map((x, i) => (
          <circle key={i} cx={w * x} cy={h - 14} r={2 + i} fill="#fff" fillOpacity=".8" className="motion-safe:animate-bubble" style={{ animationDelay: `${i * 0.9}s`, transformBox: 'fill-box' }} />
        ))}
      </g>
      <path d={g.body} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      {g.neck && <path d={g.neck} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />}
      {kind === 'beaker' && [40, 60, 80].map((y) => <path key={y} d={`M62 ${y} H74`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />)}
      {kind === 'erlenmeyer' && [80, 96].map((y) => <path key={y} d={`M44 ${y} H56`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />)}
    </svg>
  )
}

function Molecule() {
  const pts = [[50, 12], [82, 30], [82, 66], [50, 84], [18, 66], [18, 30]]
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points={pts.map((p) => p.join(',')).join(' ')} strokeLinejoin="round" />
      <path d="M82 30 L96 20 M18 66 L4 76" strokeLinecap="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 4 : 5.5} fill={i % 3 === 0 ? '#148A2A' : '#fff'} fillOpacity={i % 3 === 0 ? 0.5 : 1} />)}
    </svg>
  )
}

function Drop() {
  return (
    <svg viewBox="0 0 60 80" className="h-full w-full" fill="none">
      <path d="M30 6 C30 6 8 34 8 50 a22 22 0 0 0 44 0 C52 34 30 6 30 6Z" fill="#86B42E" fillOpacity=".18" stroke="currentColor" strokeWidth="2" />
      <path d="M20 50 a10 10 0 0 0 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** position (% of section), size (px), parallax speed, rotation on scroll, liquid level (0–1) */
const items: { k: Kind; x: string; y: string; s: number; sp: number; r: number; lv?: number; hideSm?: boolean }[] = [
  // top band, beside the heading (inline-end side)
  { k: 'erlenmeyer', x: '63%', y: '17%', s: 96, sp: 0.8, r: -8, lv: 0.55 },
  { k: 'molecule', x: '55%', y: '30%', s: 54, sp: 1.2, r: 40, hideSm: true },
  { k: 'beaker', x: '73%', y: '24%', s: 74, sp: 0.6, r: -5, lv: 0.45, hideSm: true },
  { k: 'drop', x: '81%', y: '17%', s: 30, sp: 1.4, r: 0, hideSm: true },
  { k: 'round', x: '85%', y: '21%', s: 92, sp: 1, r: 10, lv: 0.5 },
  { k: 'tube', x: '95%', y: '15%', s: 70, sp: 0.7, r: 14, lv: 0.7, hideSm: true },
  // bottom band, under the cards
  { k: 'tube', x: '4%', y: '86%', s: 64, sp: 0.4, r: -12, lv: 0.6, hideSm: true },
  { k: 'molecule', x: '24%', y: '88%', s: 46, sp: 0.5, r: -30, hideSm: true },
  { k: 'drop', x: '42%', y: '89%', s: 26, sp: 0.6, r: 0, hideSm: true },
  { k: 'beaker', x: '60%', y: '87%', s: 58, sp: 0.4, r: 6, lv: 0.4, hideSm: true },
  { k: 'molecule', x: '80%', y: '88%', s: 40, sp: 0.5, r: 30, hideSm: true },
]

export function LabBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      {/* soft grid + glows */}
      <div className="absolute inset-0 [background-image:radial-gradient(#11244c14_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -start-32 top-1/4 h-80 w-80 rounded-full bg-lime-500/10 blur-3xl" />
      <div className="absolute -end-32 bottom-0 h-96 w-96 rounded-full bg-aqua-400/15 blur-3xl" />

      {items.map((it, i) => (
        <div
          key={i}
          className={`lab-item absolute text-navy-700/[0.16] ${it.hideSm ? 'hidden md:block' : ''}`}
          data-speed={it.sp}
          data-rot={it.r}
          style={{ insetInlineStart: it.x, top: it.y, width: it.s, height: it.s * 1.3 }}
        >
          <div className="h-full w-full motion-safe:animate-floaty" style={{ animationDelay: `${i * -0.8}s` }}>
            {it.k === 'molecule' ? <Molecule /> : it.k === 'drop' ? <Drop /> : <Glass kind={it.k} level={it.lv ?? 0.5} />}
          </div>
        </div>
      ))}
    </div>
  )
}

/** Adds the backdrop motion to a GSAP timeline (or scrubbed tween set) over `dur` units. */
export function animateLab(tl: ReturnType<typeof gsap.timeline>, scope: HTMLElement, dur: number) {
  scope.querySelectorAll<HTMLElement>('.lab-item').forEach((el) => {
    const sp = Number(el.dataset.speed || 1)
    const r = Number(el.dataset.rot || 0)
    tl.fromTo(el, { y: 30 * sp, rotate: 0 }, { y: -60 * sp, rotate: r, ease: 'none', duration: dur }, 0)
  })
  scope.querySelectorAll<SVGRectElement>('.lab-liquid').forEach((rect) => {
    const h = Number(rect.getAttribute('height'))
    const lv = Number(rect.dataset.level || 0.5)
    tl.fromTo(rect, { attr: { y: h * 0.96 } }, { attr: { y: h * (1 - lv) }, ease: 'none', duration: dur }, 0)
  })
}
