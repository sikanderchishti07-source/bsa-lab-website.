import { useTranslation } from 'react-i18next'

export type Bi = { en: string; ar: string }
export type Lang = 'en' | 'ar'

/** Returns the current language, a picker for bilingual objects, and `t`. */
export function useL() {
  const { t, i18n } = useTranslation()
  const lang: Lang = i18n.language?.startsWith('ar') ? 'ar' : 'en'
  const pick = (b: Bi) => b[lang]
  return { t, lang, pick, isRtl: lang === 'ar', i18n }
}
