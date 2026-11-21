import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../ui/Button'
import { SuccessLeaf } from './SuccessLeaf'
import { services } from '../../data/services'
import { ksaCities } from '../../data/content'
import { submitBooking, type SubmitResult } from '../../lib/submit'
import { site } from '../../config/site'
import { useL } from '../../lib/i18n-helpers'

const schema = z.object({
  name: z.string().trim().min(2, 'name'),
  phone: z.string().trim().regex(/^(\+?966|0)?5\d{8}$/, 'phone'),
  email: z.string().trim().email('email'),
  site: z.string().optional(),
  city: z.string().min(1, 'city'),
  date: z.string().optional(),
  service: z.string().optional(),
})
type Form = z.infer<typeof schema>

export function SampleBookingForm() {
  const { t, pick } = useL()
  const [done, setDone] = useState<SubmitResult | null>(null)
  const [failed, setFailed] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema), defaultValues: { city: '' } })
  const err = (k: keyof Form) => errors[k] && <p className="mt-1.5 text-sm text-red-600" role="alert">{t(`contact.err.${errors[k]?.message}`)}</p>
  if (done)
    return (
      <div className="py-10 text-center">
        <SuccessLeaf />
        <p className="mt-6 text-lg font-semibold text-navy-700">{t(done === 'mailto' ? 'contact.mailtoText' : 'booking.success')}</p>
      </div>
    )
  return (
    <form noValidate onSubmit={handleSubmit(async (d) => { setFailed(false); try { setDone(await submitBooking(d)) } catch { setFailed(true) } })} className="grid gap-5 sm:grid-cols-2">
      <div><label className="label" htmlFor="b-name">{t('contact.name')}</label><input id="b-name" className="input" {...register('name')} />{err('name')}</div>
      <div><label className="label" htmlFor="b-phone">{t('contact.phone')}</label><input id="b-phone" type="tel" dir="ltr" placeholder="+9665XXXXXXXX" className="input rtl:text-right" {...register('phone')} />{err('phone')}</div>
      <div><label className="label" htmlFor="b-email">{t('contact.email')}</label><input id="b-email" type="email" dir="ltr" className="input rtl:text-right" {...register('email')} />{err('email')}</div>
      <div><label className="label" htmlFor="b-site">{t('booking.site')}</label><input id="b-site" className="input" {...register('site')} /></div>
      <div><label className="label" htmlFor="b-city">{t('contact.city')}</label><select id="b-city" className="input" {...register('city')}><option value="">{t('contact.selectCity')}</option>{ksaCities.map((c) => <option key={c}>{c}</option>)}</select>{err('city')}</div>
      <div><label className="label" htmlFor="b-date">{t('contact.date')}</label><input id="b-date" type="date" className="input" {...register('date')} /></div>
      <div className="sm:col-span-2"><label className="label" htmlFor="b-svc">{t('nav.services')}</label><select id="b-svc" className="input" {...register('service')}>{services.map((s) => <option key={s.slug} value={s.slug}>{pick(s.title)}</option>)}</select></div>
      {failed && <p role="alert" className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{t('contact.sendError')} <a href={site.phoneHref} className="font-semibold underline" dir="ltr">{site.phone}</a></p>}
      <div className="sm:col-span-2"><Button type="submit" variant="green" arrow disabled={isSubmitting}>{isSubmitting ? t('contact.sending') : t('booking.submit')}</Button></div>
    </form>
  )
}
