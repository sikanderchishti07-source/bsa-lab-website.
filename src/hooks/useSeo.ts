import { useEffect } from 'react'
import { site } from '../config/site'

type Extra = { path?: string; image?: string; type?: 'website' | 'article'; jsonLd?: Record<string, unknown> }

function meta(attr: 'name' | 'property', key: string, value: string) {
  let m = document.querySelector(`meta[${attr}="${key}"]`)
  if (!m) {
    m = document.createElement('meta')
    m.setAttribute(attr, key)
    document.head.appendChild(m)
  }
  m.setAttribute('content', value)
}

/** Sets title, description, canonical, Open Graph and optional JSON-LD per page (client-side SEO). */
export function useSeo(title: string, description?: string, extra: Extra = {}) {
  const { path, image, type, jsonLd } = extra
  const ld = jsonLd ? JSON.stringify(jsonLd) : ''
  useEffect(() => {
    document.title = title
    meta('property', 'og:title', title)
    meta('name', 'twitter:title', title)
    if (description) {
      meta('name', 'description', description)
      meta('property', 'og:description', description)
      meta('name', 'twitter:description', description)
    }
    meta('property', 'og:type', type ?? 'website')
    if (path !== undefined) {
      const url = site.url.replace(/\/$/, '') + path
      let link = document.querySelector('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', 'canonical')
        document.head.appendChild(link)
      }
      link.setAttribute('href', url)
      meta('property', 'og:url', url)
    }
    if (image) meta('property', 'og:image', site.url.replace(/\/$/, '') + '/' + image.replace(/^\.?\//, ''))

    let script: HTMLScriptElement | null = null
    if (ld) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.page = '1'
      script.text = ld
      document.head.appendChild(script)
    }
    return () => { script?.remove() }
  }, [title, description, path, image, type, ld])
}
