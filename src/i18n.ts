import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ar from './locales/ar.json'

function initialLang(): 'en' | 'ar' {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'ar' || q === 'en') return q
    const s = localStorage.getItem('bsa-lang')
    if (s === 'ar' || s === 'en') return s
  } catch {
    /* storage unavailable */
  }
  return 'en'
}

export function applyDir(lang: string) {
  const ar = lang.startsWith('ar')
  document.documentElement.lang = ar ? 'ar' : 'en'
  document.documentElement.dir = ar ? 'rtl' : 'ltr'
}

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ar: { translation: ar } },
  lng: initialLang(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
})

applyDir(i18n.language)
i18n.on('languageChanged', (l) => {
  applyDir(l)
  try {
    localStorage.setItem('bsa-lang', l)
  } catch {
    /* ignore */
  }
})

export default i18n
