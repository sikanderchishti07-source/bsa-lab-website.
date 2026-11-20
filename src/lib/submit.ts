/**
 * Form submission placeholders.
 * TODO: connect to an email service (Resend via a serverless function, EmailJS or Formspree).
 * Example with Formspree: fetch('https://formspree.io/f/<id>', { method: 'POST', body: formData })
 */
export async function submitQuote(data: Record<string, unknown>, file?: File | null): Promise<void> {
  console.info('[BSA] quote request', data, file?.name)
  await new Promise((r) => setTimeout(r, 1200))
}

export async function submitBooking(data: Record<string, unknown>): Promise<void> {
  console.info('[BSA] sampling booking', data)
  await new Promise((r) => setTimeout(r, 1000))
}
