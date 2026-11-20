import { motion } from 'framer-motion'

/** Large glass sample vial with animated liquid and rising bubbles (hero visual). */
export function HeroVial({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 460" className={className} aria-hidden>
      <defs>
        <clipPath id="vialClip">
          <path d="M60 60 H160 V370 a50 50 0 0 1 -100 0 Z" />
        </clipPath>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#86B42E" />
          <stop offset=".45" stopColor="#148A2A" />
          <stop offset="1" stopColor="#0F6E21" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(255,255,255,.22)" />
          <stop offset=".5" stopColor="rgba(255,255,255,.04)" />
          <stop offset="1" stopColor="rgba(255,255,255,.16)" />
        </linearGradient>
      </defs>
      {/* cap */}
      <rect x="48" y="20" width="124" height="44" rx="10" fill="#1E3A70" stroke="rgba(255,255,255,.25)" />
      <rect x="48" y="38" width="124" height="6" fill="#86B42E" />
      {/* liquid */}
      <g clipPath="url(#vialClip)">
        <motion.g initial={{ y: 220 }} animate={{ y: 0 }} transition={{ duration: 2.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <motion.path
            d="M-60 190 Q -30 175 0 190 T 60 190 T 120 190 T 180 190 T 240 190 T 300 190 V460 H-60Z"
            fill="url(#liquid)"
            animate={{ x: [0, -120] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          {[80, 110, 135, 95, 145].map((x, i) => (
            <motion.circle key={i} cx={x} r={3 + (i % 3)} fill="rgba(255,255,255,.55)" initial={{ cy: 430, opacity: 0 }} animate={{ cy: [430, 200], opacity: [0, 0.9, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: 2 + i * 0.6, ease: 'easeOut' }} />
          ))}
        </motion.g>
      </g>
      {/* glass */}
      <path d="M60 60 H160 V370 a50 50 0 0 1 -100 0 Z" fill="url(#glass)" stroke="rgba(255,255,255,.55)" strokeWidth="2.5" />
      <path d="M74 80 V360" stroke="rgba(255,255,255,.45)" strokeWidth="5" strokeLinecap="round" />
      {/* graduations */}
      {[120, 170, 220, 270, 320].map((y) => (
        <g key={y}>
          <line x1="140" x2="160" y1={y} y2={y} stroke="rgba(255,255,255,.5)" strokeWidth="2" />
        </g>
      ))}
      {/* label */}
      <rect x="84" y="250" width="66" height="80" rx="6" fill="#fff" opacity=".95" />
      <rect x="92" y="262" width="34" height="5" rx="2" fill="#11244C" />
      <rect x="92" y="274" width="50" height="4" rx="2" fill="#11244C" opacity=".35" />
      <rect x="92" y="284" width="44" height="4" rx="2" fill="#11244C" opacity=".35" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect key={i} x={92 + i * 5.5} y="298" width={i % 3 === 0 ? 3 : 1.6} height="22" fill="#11244C" />
      ))}
    </svg>
  )
}
