import { useL } from '../../lib/i18n-helpers'

type Partner = { slug: string; name: string; ratio: number }

/** Client / partner logos (from the AECON group site). */
const partners: Partner[] = [
  { slug: 'aramco', name: 'Saudi Aramco', ratio: 3.23 },
  { slug: 'aecom', name: 'AECOM', ratio: 4.05 },
  { slug: 'sabic', name: 'SABIC', ratio: 1.91 },
  { slug: 'nomac', name: 'NOMAC', ratio: 2.70 },
  { slug: 'maaden', name: "Ma'aden", ratio: 2.94 },
  { slug: 'romco', name: 'ROMCO', ratio: 3.33 },
  { slug: 'amaala', name: 'AMAALA', ratio: 2.43 },
  { slug: 'neom', name: 'NEOM', ratio: 0.78 },
  { slug: 'petromin', name: 'Petromin', ratio: 2.30 },
  { slug: 'acwa', name: 'ACWA Power', ratio: 2.57 },
  { slug: 'tanajib', name: 'Tanajib', ratio: 2.94 },
  { slug: 'alayuni', name: 'Al-Ayuni', ratio: 0.99 },
  { slug: 'sail', name: 'SAIL', ratio: 2.48 },
  { slug: 'lt', name: 'Larsen & Toubro', ratio: 5.36 },
  { slug: 'astra', name: 'Astra Construction', ratio: 2.94 },
  { slug: 'rcjy', name: 'Royal Commission for Jubail & Yanbu', ratio: 1.07 },
  { slug: 'redsea', name: 'Red Sea Global', ratio: 0.81 },
  { slug: 'sec', name: 'Saudi Electricity Company', ratio: 3.61 },
  { slug: 'modon', name: 'MODON', ratio: 0.61 },
  { slug: 'haskoning', name: 'Royal HaskoningDHV', ratio: 2.15 },
  { slug: 'kaust', name: 'KAUST', ratio: 2.17 },
  { slug: 'sirc', name: 'SIRC', ratio: 2.33 },
  { slug: 'huta', name: 'HUTA Group', ratio: 2.39 },
  { slug: 'nesma', name: 'Nesma & Partners', ratio: 4.62 },
  { slug: 'pdc', name: 'Ports Development Co.', ratio: 4.00 },
]

const src = (slug: string) => `${import.meta.env.BASE_URL}images/partners/${slug}.webp`
const half = Math.ceil(partners.length / 2)
const rows = [partners.slice(0, half), partners.slice(half)]

function Row({ items, reverse }: { items: Partner[]; reverse?: boolean }) {
  const loop = [...items, ...items]
  return (
    <div className="group/row relative flex overflow-hidden py-2" dir="ltr">
      <div
        className="flex w-max shrink-0 items-center motion-safe:animate-marquee group-hover/row:[animation-play-state:paused]"
        style={{ animationDuration: `${items.length * 4}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {loop.map((p, i) => (
          <div
            key={i}
            aria-hidden={i >= items.length || undefined}
            className="mx-3 flex h-20 w-[190px] shrink-0 items-center justify-center rounded-2xl border border-navy-700/[0.06] bg-white px-6 shadow-[0_1px_2px_rgba(17,36,76,.04)] transition duration-300 hover:-translate-y-0.5 hover:border-leaf-600/25 hover:shadow-card"
          >
            <img
              src={src(p.slug)}
              alt={i < items.length ? p.name : ''}
              loading="lazy"
              decoding="async"
              className="max-h-12 w-auto max-w-full object-contain transition duration-300 hover:scale-105"
              style={{ maxHeight: p.ratio > 3 ? 34 : 48 }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PartnerStrip() {
  const { t } = useL()
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow"><span className="inline-block h-[2px] w-6 bg-current" />{t('home.partnersEyebrow')}</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-[2.1rem] rtl:leading-[1.35]">{t('home.partnersTitle')}</h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed">{t('home.partnersSub')}</p>
        </div>
      </div>
      <div className="relative mt-10 space-y-3 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <Row items={rows[0]} />
        <Row items={rows[1]} reverse />
      </div>
    </section>
  )
}
