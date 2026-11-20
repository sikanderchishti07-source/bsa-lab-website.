import { motion } from 'framer-motion'
import { CITIES, KSA_PATH } from './ksaShape'

const ar: Record<string, string> = { Riyadh: 'الرياض', Jeddah: 'جدة', Makkah: 'مكة', Madinah: 'المدينة', Dammam: 'الدمام', Jubail: 'الجبيل', Tabuk: 'تبوك', NEOM: 'نيوم', Abha: 'أبها', Qassim: 'القصيم', Jazan: 'جازان' }

/** Coverage map: Riyadh pulses, animated routes draw out to other regions. */
export function KSAMap({ lang }: { lang: 'en' | 'ar' }) {
  const hq = CITIES[0]
  return (
    <svg viewBox="-50 0 730 520" className="h-auto w-full" role="img" aria-label="Coverage map of Saudi Arabia">
      <defs>
        <linearGradient id="ksaFill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#1E3A70" />
          <stop offset="1" stopColor="#11244C" />
        </linearGradient>
        <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="rgba(255,255,255,.12)" />
        </pattern>
      </defs>
      <motion.path d={KSA_PATH} fill="url(#ksaFill)" stroke="#86B42E" strokeWidth="2" initial={{ pathLength: 0, fillOpacity: 0 }} whileInView={{ pathLength: 1, fillOpacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
      <path d={KSA_PATH} fill="url(#dots)" />
      {CITIES.slice(1).map((c, i) => {
        const mx = (hq.x + c.x) / 2
        const my = Math.min(hq.y, c.y) - 40
        return (
          <motion.path key={c.name} d={`M${hq.x} ${hq.y} Q${mx} ${my} ${c.x} ${c.y}`} fill="none" stroke="#86B42E" strokeWidth="1.5" strokeDasharray="4 5" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.9 }} viewport={{ once: true }} transition={{ delay: 1 + i * 0.12, duration: 0.9 }} />
        )
      })}
      {CITIES.map((c, i) => (
        <motion.g key={c.name} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i === 0 ? 0.8 : 1.4 + i * 0.1 }} style={{ transformOrigin: `${c.x}px ${c.y}px` }}>
          {i === 0 && (
            <>
              <circle cx={c.x} cy={c.y} r="10" fill="#86B42E" opacity=".5" className="animate-pulseRing" style={{ transformOrigin: `${c.x}px ${c.y}px` }} />
              <circle cx={c.x} cy={c.y} r="10" fill="#86B42E" opacity=".5" className="animate-pulseRing" style={{ transformOrigin: `${c.x}px ${c.y}px`, animationDelay: '1.1s' }} />
            </>
          )}
          <circle cx={c.x} cy={c.y} r={i === 0 ? 7 : 4} fill={i === 0 ? '#86B42E' : '#fff'} stroke={i === 0 ? '#fff' : '#148A2A'} strokeWidth="2" />
          <text x={c.x + (c.name === 'NEOM' || c.name === 'Jeddah' ? -8 : 8)} y={c.y + (c.name === 'Makkah' ? 14 : -8)} textAnchor={c.name === 'NEOM' || c.name === 'Jeddah' ? 'end' : 'start'} className="fill-white font-sans" fontSize={i === 0 ? 15 : 12} fontWeight={i === 0 ? 700 : 500}>
            {lang === 'ar' ? ar[c.name] : c.name}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}
