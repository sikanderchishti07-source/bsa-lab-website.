import { site } from '../config/site'

/**
 * Form delivery.
 * - If VITE_FORM_ENDPOINT is set (e.g. a Formspree / Web3Forms / own serverless URL that accepts
 *   multipart POST), the form is sent there and the lab receives it by email.
 * - If not set, the visitor's email app opens with the request pre-filled to the lab's address,
 *   so no request is lost while the endpoint is being set up.
 */
export type SubmitResult = 'sent' | 'mailto'

const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

const fmt = (v: unknown) => (Array.isArray(v) ? v.join(', ') : v === undefined || v === null ? '' : String(v))

async function deliver(subject: string, data: Record<string, unknown>, file?: File | null): Promise<SubmitResult> {
  if (endpoint) {
    const fd = new FormData()
    fd.append('_subject', subject)
    fd.append('subject', subject)
    Object.entries(data).forEach(([k, v]) => fd.append(k, fmt(v)))
    if (file) fd.append('attachment', file)
    const res = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
    return 'sent'
  }
  const lines = Object.entries(data).map(([k, v]) => `${k}: ${fmt(v)}`)
  if (file) lines.push(`attachment: ${file.name} (please attach it to this email)`)
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
  return 'mailto'
}

export function submitQuote(data: Record<string, unknown>, file?: File | null) {
  return deliver('Quote request – BSA.lab website', data, file)
}

export function submitBooking(data: Record<string, unknown>) {
  return deliver('Sample collection booking – BSA.lab website', data)
}
