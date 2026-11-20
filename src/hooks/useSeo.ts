import { useEffect } from 'react'

/** Sets document title + meta description per page (client-side SEO). */
export function useSeo(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) {
        m = document.createElement('meta')
        m.setAttribute('name', 'description')
        document.head.appendChild(m)
      }
      m.setAttribute('content', description)
    }
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
  }, [title, description])
}
