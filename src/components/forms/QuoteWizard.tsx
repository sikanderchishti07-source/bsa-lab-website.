import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, FlaskConical, Paperclip, Truck } from 'lucide-react'
import { Button } from '../ui/Button'
import { SuccessLeaf } from './SuccessLeaf'
import { services } from '../../data/services'
import { ksaCities } from '../../data/content'
import { submitQuote } from '../../lib/submit'
import { useL } from '../../lib/i18n-helpers'

const schema = z.object({
  services: z.array(z.string()).min(1, 'services'),
  sampleType: z.string().trim().min(2, 'sampleType'),
  sampleCount: z.coerce.number<number>().int().min(1, 'count'),
  collection: z.enum(['bsa', 'walkin']),
  city: z.string().min(1, 'city'),
  date: z.string().optional(),
  name: z.string().trim().min(2, 'name'),
  company: z.string().optional(),
  phone: z.string().trim().regex(/^(\+?966|0)?5\d{8}$/, 'phone'),
  email: z.string().trim().email('email'),
  cr: z.string().optional(),
  notes: z.string().optional(),
})
type Form = z.infer<typeof schema>

const stepFields: (keyof Form)[][] = [['services'], ['sampleType', 'sampleCount'], ['collection'], ['city', 'date'], ['name', 'company', 'phone', 'email', 'cr'], ['notes']]

export function QuoteWizard() {
  const { t, pick, isRtl } = useL()
  const stepNames = t('contact.steps', { returnObjects: true }) as string[]
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [done, setDone] = useState(false)
  const { register, control, handleSubmit, trigger, reset, watch, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { services: [], sampleCount: 1, collection: 'bsa', city: '' },
    mode: 'onTouched',
  })
  const collection = watch('collection')

  const go = async (n: number) => {
    if (n > step) {
      const ok = await trigger(stepFields[step])
      if (!ok) return
    }
    setDir(n > step ? 1 : -1)
    setStep(n)
  }
  const onSubmit = async (d: Form) => {
    await submitQuote(d, file)
    setDone(true)
  }
  const err = (k: keyof Form) => errors[k] && <p className="mt-1.5 text-sm text-red-600" role="alert">{t(`contact.err.${errors[k]?.message}`)}</p>
  const slide = { enter: (d: number) => ({ x: (isRtl ? -d : d) * 40, opacity: 0 }), center: { x: 0, opacity: 1 }, exit: (d: number) => ({ x: (isRtl ? d : -d) * 40, opacity: 0 }) }

  if (done)
    return (
      <div className="card p-10 text-center sm:p-14">
        <SuccessLeaf />
        <h2 className="mt-8 text-3xl font-extrabold">{t('contact.successTitle')}</h2>
        <p className="mx-auto mt-3 max-w-md text-lg">{t('contact.successText')}</p>
        <div className="mt-8"><Button variant="navy" onClick={() => { reset(); setFile(null); setStep(0); setDone(false) }}>{t('contact.another')}</Button></div>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card overflow-hidden">
      {/* progress */}
      <div className="border-b border-navy-700/10 bg-mist-50 px-6 py-5 sm:px-10">
        <div className="relative h-1.5 overflow-hidden rounded-full bg-navy-700/10">
          <motion.div className="absolute inset-y-0 start-0 rounded-full bg-gradient-to-r from-navy-700 via-leaf-600 to-lime-500 rtl:bg-gradient-to-l" animate={{ width: `${((step + 1) / stepNames.length) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
        </div>
        <ol className="mt-4 hidden grid-cols-6 gap-2 text-xs font-medium sm:grid">
          {stepNames.map((n, i) => (
            <li key={n} className={`flex items-center gap-1.5 ${i <= step ? 'text-navy-700' : 'text-ink-600/60'}`}>
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i < step ? 'bg-leaf-600 text-white' : i === step ? 'bg-navy-700 text-white' : 'bg-navy-700/10'}`}>{i < step ? <Check className="h-3 w-3" /> : i + 1}</span>
              {n}
            </li>
          ))}
        </ol>
      </div>

      <div className="relative min-h-[340px] px-6 py-8 sm:px-10">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-navy-700">{t('contact.s1')}</legend>
                <Controller
                  control={control}
                  name="services"
                  render={({ field }) => (
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {services.map((s) => {
                        const on = field.value.includes(s.slug)
                        return (
                          <button key={s.slug} type="button" aria-pressed={on} onClick={() => field.onChange(on ? field.value.filter((v) => v !== s.slug) : [...field.value, s.slug])} className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${on ? 'border-leaf-600 bg-leaf-600 text-white' : 'border-navy-700/15 text-navy-700 hover:border-navy-700/40'}`}>
                            {on && <Check className="h-4 w-4" />}
                            {pick(s.title)}
                          </button>
                        )
                      })}
                    </div>
                  )}
                />
                {err('services')}
              </fieldset>
            )}
            {step === 1 && (
              <fieldset className="grid gap-5 sm:grid-cols-[1fr_180px]">
                <legend className="mb-6 font-display text-2xl font-bold text-navy-700">{t('contact.s2')}</legend>
                <div><label className="label" htmlFor="sampleType">{t('contact.sampleType')}</label><input id="sampleType" className="input" placeholder={t('contact.sampleTypePh')} {...register('sampleType')} />{err('sampleType')}</div>
                <div><label className="label" htmlFor="sampleCount">{t('contact.sampleCount')}</label><input id="sampleCount" type="number" min={1} className="input" {...register('sampleCount')} />{err('sampleCount')}</div>
              </fieldset>
            )}
            {step === 2 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-navy-700">{t('contact.s3')}</legend>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {([['bsa', Truck, t('contact.collectUs'), t('contact.collectUsSub')], ['walkin', FlaskConical, t('contact.collectMe'), t('contact.collectMeSub')]] as const).map(([v, I, title, sub]) => (
                    <label key={v} className={`flex cursor-pointer gap-4 rounded-2xl border-2 p-5 transition ${collection === v ? 'border-leaf-600 bg-leaf-600/5' : 'border-navy-700/10 hover:border-navy-700/30'}`}>
                      <input type="radio" value={v} className="sr-only" {...register('collection')} />
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${collection === v ? 'bg-leaf-600 text-white' : 'bg-aqua-100 text-navy-700'}`}><I className="h-6 w-6" /></span>
                      <span><span className="block font-bold text-navy-700">{title}</span><span className="text-sm">{sub}</span></span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            {step === 3 && (
              <fieldset className="grid gap-5 sm:grid-cols-2">
                <legend className="mb-6 font-display text-2xl font-bold text-navy-700">{t('contact.s4')}</legend>
                <div><label className="label" htmlFor="city">{t('contact.city')}</label><select id="city" className="input" {...register('city')}><option value="">{t('contact.selectCity')}</option>{ksaCities.map((c) => <option key={c} value={c}>{c}</option>)}</select>{err('city')}</div>
                <div><label className="label" htmlFor="date">{t('contact.date')}</label><input id="date" type="date" className="input" {...register('date')} /></div>
              </fieldset>
            )}
            {step === 4 && (
              <fieldset className="grid gap-5 sm:grid-cols-2">
                <legend className="mb-6 font-display text-2xl font-bold text-navy-700">{t('contact.s5')}</legend>
                <div><label className="label" htmlFor="name">{t('contact.name')}</label><input id="name" autoComplete="name" className="input" {...register('name')} />{err('name')}</div>
                <div><label className="label" htmlFor="company">{t('contact.company')}</label><input id="company" autoComplete="organization" className="input" {...register('company')} /></div>
                <div><label className="label" htmlFor="phone">{t('contact.phone')}</label><input id="phone" type="tel" dir="ltr" autoComplete="tel" placeholder="+9665XXXXXXXX" className="input rtl:text-right" {...register('phone')} />{err('phone')}</div>
                <div><label className="label" htmlFor="email">{t('contact.email')}</label><input id="email" type="email" dir="ltr" autoComplete="email" className="input rtl:text-right" {...register('email')} />{err('email')}</div>
                <div className="sm:col-span-2"><label className="label" htmlFor="cr">{t('contact.cr')}</label><input id="cr" className="input" {...register('cr')} /></div>
              </fieldset>
            )}
            {step === 5 && (
              <fieldset className="grid gap-5">
                <legend className="mb-6 font-display text-2xl font-bold text-navy-700">{t('contact.s6')}</legend>
                <div><label className="label" htmlFor="notes">{t('contact.notes')}</label><textarea id="notes" rows={4} className="input" {...register('notes')} /></div>
                <div>
                  <span className="label">{t('contact.upload')}</span>
                  <label className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed border-navy-700/20 p-5 transition hover:border-leaf-600">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-aqua-100 text-navy-700"><Paperclip className="h-5 w-5" /></span>
                    <span className="text-sm"><span className="block font-semibold text-navy-700">{file ? file.name : t('contact.upload')}</span>{t('contact.uploadHint')}</span>
                    <input type="file" className="sr-only" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" onChange={(e) => { const f = e.target.files?.[0]; setFile(f && f.size <= 10 * 1024 * 1024 ? f : null) }} />
                  </label>
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-navy-700/10 px-6 py-5 sm:px-10">
        <button type="button" onClick={() => go(step - 1)} className={`rounded-full px-5 py-3 text-sm font-semibold text-navy-700 hover:bg-navy-700/5 ${step === 0 ? 'invisible' : ''}`}>{t('contact.back')}</button>
        {step < stepNames.length - 1 ? (
          <Button onClick={() => go(step + 1)} variant="navy" arrow>{t('contact.next')}</Button>
        ) : (
          <Button type="submit" variant="green" arrow disabled={isSubmitting}>{isSubmitting ? t('contact.sending') : t('contact.submit')}</Button>
        )}
      </div>
    </form>
  )
}
