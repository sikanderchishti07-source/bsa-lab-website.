/**
 * Single source of truth for company facts.
 * Edit this file to change contact details, stats, accreditations and placeholders.
 * Anything marked TODO_CONFIRM must be confirmed by BSA management before going live.
 */
export const site = {
  brand: 'BSA.lab',
  nameEn: 'Biological System Analysis Company',
  nameAr: 'شركة بيولوجيكال سيستم اناليسيس',
  url: 'https://www.bsa-lab.sa', // TODO_CONFIRM: final domain

  phone: '+966 54 452 5423',
  phoneHref: 'tel:+966544525423',
  whatsappHref: 'https://wa.me/966544525423',
  email: 'environmental.lab@aecon-sa.com',

  addressEn: '2191 Al Masif District, 7521, Riyadh 12467, Kingdom of Saudi Arabia',
  addressAr: 'المملكة العربية السعودية - 2191 - حي المصيف - 7521 - الرياض 12467',
  mapEmbed: 'https://www.google.com/maps?q=Al+Masif,+Riyadh+12467&output=embed', // TODO_CONFIRM: exact pin
  mapDirections: 'https://www.google.com/maps/dir/?api=1&destination=Al+Masif+Riyadh+12467',

  hours: { en: 'Sunday – Thursday, 8:00 AM – 5:00 PM', ar: 'الأحد – الخميس، 8:00 ص – 5:00 م' },

  parent: {
    nameEn: 'AECON – Alemad Alarabi Environmental Consultancy',
    nameAr: 'إيكون – العماد العربي للاستشارات البيئية',
    url: 'https://www.aecon-sa.com',
  },

  /**
   * While true, unconfirmed items (stats, accreditation badges) are shown with a visible
   * "pending confirmation" marker. Set to false before launch to hide anything still unconfirmed.
   */
  showUnconfirmed: true,

  // TODO_CONFIRM: replace with real figures, then set todo: false.
  stats: [
    { key: 'samples', value: 5000, suffix: '+', todo: true },
    { key: 'parameters', value: 150, suffix: '+', todo: true },
    { key: 'projects', value: 300, suffix: '+', todo: true },
    { key: 'regions', value: 13, suffix: '', todo: true },
  ],

  // SAC application for ISO/IEC 17025 is in progress (not yet granted). Do NOT claim "accredited"
  // until the certificate is issued; then switch status to 'granted' and update the wording.
  accreditation: {
    status: 'in-progress' as 'in-progress' | 'granted',
    en: 'ISO/IEC 17025 · SAC accreditation in progress',
    ar: 'الأيزو 17025 · الاعتماد من المركز السعودي للاعتماد قيد الإجراء',
  },

  // TODO_REPLACE: real social profile links
  social: { linkedin: '#', x: '#', instagram: '#' },
} as const

export type Site = typeof site
