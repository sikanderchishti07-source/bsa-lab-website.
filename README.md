# BSA.lab – Biological System Analysis website

Bilingual (English / Arabic, full RTL) marketing site for BSA.lab, AECON's environmental testing laboratory in Riyadh.

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS 3 · Framer Motion · GSAP ScrollTrigger · Lenis · i18next · React Hook Form + Zod · Lucide icons.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to /dist
npm run preview    # serve the build locally
```

## Deploy to Vercel

Push the repo to GitHub and import it in Vercel (framework preset: **Vite**). `vercel.json` already contains the SPA rewrite so deep links like `/services/soil-testing` work.
For static hosts **without** rewrites, build with `VITE_ROUTER=hash npm run build` (URLs become `/#/services/...`).

## Where to edit things

| What | File |
|---|---|
| Phone, email, address, hours, map, socials, stats, accreditations | `src/config/site.ts` |
| Page copy (English / Arabic) | `src/locales/en.json`, `src/locales/ar.json` |
| Services, parameters, sampling notes, turnaround | `src/data/services.ts` |
| Industries, FAQ, walk-in hold-time table, packages, equipment, cities | `src/data/content.ts` |
| Privacy policy and terms text | `src/pages/Legal.tsx` |
| Brand colours (Tailwind tokens + CSS variables) | `tailwind.config.js`, `src/styles/globals.css` |
| Logo (vector traced from the letterhead) | `src/components/brand/Logo.tsx`, `logoPaths.ts` |

Structured lists (services, FAQ, etc.) are stored as `{ en, ar }` pairs in `src/data/` so each item's two languages stay side by side.

### Unconfirmed content
`site.showUnconfirmed` (in `site.ts`) controls items that still need confirmation. While `true`, they appear with an amber **"pending confirmation"** tag. Before launch, confirm each item (set `confirmed: true` / `todo: false`) and then set `showUnconfirmed: false` so anything left unconfirmed is hidden.

### Swapping in real lab photos
Put images in `public/images/lab/` and set `src: '/images/lab/your-photo.webp'` on the entries of the `gallery` array in `src/pages/Laboratory.tsx`.

### Connecting the forms
`src/lib/submit.ts` contains `submitQuote()` and `submitBooking()`. They currently only log the data. Connect them to Formspree, EmailJS, or a Vercel serverless function that uses Resend, so requests reach `environmental.lab@aecon-sa.com`.

## Brand colours (from the BSA.lab letterhead)

| Token | Hex | Role |
|---|---|---|
| navy-700 | `#11244C` | Primary |
| leaf-600 | `#148A2A` | Secondary / CTAs |
| lime-500 | `#86B42E` | Accent (shapes, never body text on white) |
| navy-900 | `#0B1A38` | Footer / dark sections |
| aqua-400 | `#2F6FB5` | Water accents |
| mist-50 | `#F5F4F9` | Light backgrounds |

## Accessibility & motion
All motion respects `prefers-reduced-motion`: Lenis, GSAP pinning, the canvas particles and the route wipe are switched off, and Framer Motion falls back to opacity-only.

## TODO before launch

- [ ] **TODO_CONFIRM** Accreditations actually held (ISO/IEC 17025, SAC, NCEC) and certificate numbers – `site.ts`
- [ ] **TODO_CONFIRM** Real stats (samples, parameters, projects, regions) – `site.ts`
- [ ] **TODO_CONFIRM** Exact Google Maps pin for the lab – `site.ts` (`mapEmbed`, `mapDirections`)
- [ ] **TODO_CONFIRM** Final domain (currently `www.bsa-lab.sa` placeholder) – `site.ts`, `index.html`, `public/sitemap.xml`, `public/robots.txt`
- [ ] **TODO_CONFIRM** Working hours – `site.ts`
- [ ] **TODO_CONFIRM** Turnaround times – `src/data/services.ts`
- [ ] **TODO_CONFIRM** Laboratory equipment list – `src/data/content.ts`
- [ ] **TODO_CONFIRM** FAQ answers on turnaround, NCEC acceptance and payment – `src/data/content.ts`
- [ ] **TODO_CONFIRM** Privacy policy & terms reviewed by legal – `src/pages/Legal.tsx`
- [ ] **TODO** Walk-in package prices – `src/data/content.ts`
- [ ] **TODO_REPLACE** Real laboratory photos – `src/pages/Laboratory.tsx`
- [ ] **TODO_REPLACE** Social media links – `site.ts`
- [ ] **TODO_REPLACE** Official logo SVG from the designer (current one is traced from the letterhead) – `src/components/brand/`
- [ ] **TODO** Connect form submissions to email – `src/lib/submit.ts`
- [ ] **TODO** Add an Open Graph share image (`public/og.png`, 1200×630) and reference it in `index.html`
