import type { Bi } from '../lib/i18n-helpers'

export const industries: { icon: string; title: Bi; text: Bi }[] = [
  { icon: 'droplets', title: { en: 'Municipal STPs & water utilities', ar: 'محطات المعالجة البلدية ومرافق المياه' }, text: { en: 'Routine influent/effluent monitoring and TSE reuse compliance.', ar: 'رصد دوري للمياه الداخلة والخارجة والتزام بمعايير إعادة استخدام المياه المعالجة.' } },
  { icon: 'flame', title: { en: 'Oil, gas & petrochemicals', ar: 'النفط والغاز والبتروكيماويات' }, text: { en: 'Hydrocarbon contamination, produced water and oily sludge.', ar: 'تلوث الهيدروكربونات والمياه المصاحبة والحمأة الزيتية.' } },
  { icon: 'building', title: { en: 'Construction & real estate', ar: 'الإنشاءات والتطوير العقاري' }, text: { en: 'Baseline soil and groundwater checks before and during works.', ar: 'فحوص خط الأساس للتربة والمياه الجوفية قبل الأعمال وأثناءها.' } },
  { icon: 'factory', title: { en: 'Manufacturing & factories', ar: 'التصنيع والمصانع' }, text: { en: 'Discharge permits, process water and cooling-tower testing.', ar: 'تصاريح التصريف ومياه العمليات وتحاليل أبراج التبريد.' } },
  { icon: 'wheat', title: { en: 'Agriculture & farms', ar: 'الزراعة والمزارع' }, text: { en: 'Irrigation water, well water and soil fertility.', ar: 'مياه الري ومياه الآبار وخصوبة التربة.' } },
  { icon: 'hospital', title: { en: 'Hospitals & hotels', ar: 'المستشفيات والفنادق' }, text: { en: 'Potable water, Legionella and pool water safety.', ar: 'مياه الشرب وبكتيريا الليجيونيلا وسلامة مياه المسابح.' } },
  { icon: 'anchor', title: { en: 'Giga-projects & coastal developments', ar: 'المشاريع الكبرى والتطوير الساحلي' }, text: { en: 'Marine baseline, desalination and multi-site monitoring.', ar: 'خط الأساس البحري والتحلية والرصد متعدد المواقع.' } },
  { icon: 'landmark', title: { en: 'Government & consultants', ar: 'الجهات الحكومية والاستشاريون' }, text: { en: 'Reliable lab data for EIAs, audits and compliance reports.', ar: 'بيانات مخبرية موثوقة لدراسات تقييم الأثر والتدقيق وتقارير الالتزام.' } },
]

export const faqs: { q: Bi; a: Bi; todo?: boolean }[] = [
  { q: { en: 'How long do results take?', ar: 'كم تستغرق النتائج؟' }, a: { en: 'Most routine water, wastewater and soil packages are reported within 3–7 working days. Microbiology needs at least 2–3 days of incubation. Urgent service is available on request.', ar: 'تصدر معظم باقات المياه والصرف والتربة الاعتيادية خلال 3 إلى 7 أيام عمل. تحتاج تحاليل الميكروبيولوجي إلى يومين أو ثلاثة أيام حضانة على الأقل. تتوفر خدمة مستعجلة عند الطلب.' }, todo: true },
  { q: { en: 'Do you collect samples outside Riyadh?', ar: 'هل تجمعون العينات خارج الرياض؟' }, a: { en: 'Yes. Our field engineers travel across the Kingdom, including Jeddah, the Eastern Province, Qassim, Tabuk, Madinah, Makkah and Abha. Travel is quoted per trip.', ar: 'نعم. يتنقل مهندسونا الميدانيون في جميع أنحاء المملكة، بما في ذلك جدة والمنطقة الشرقية والقصيم وتبوك والمدينة المنورة ومكة المكرمة وأبها، وتُسعَّر الرحلة حسب كل زيارة.' } },
  { q: { en: 'Are your reports accepted by NCEC?', ar: 'هل تقبل تقاريركم لدى المركز الوطني للرقابة على الالتزام البيئي؟' }, a: { en: 'Our reports are prepared to support NCEC and MEWA compliance submissions. Please contact us for our current accreditation and registration certificates.', ar: 'تُعد تقاريرنا لدعم ملفات الالتزام المقدمة إلى المركز الوطني للرقابة على الالتزام البيئي ووزارة البيئة والمياه والزراعة. يرجى التواصل معنا للاطلاع على شهادات الاعتماد والتسجيل الحالية.' }, todo: true },
  { q: { en: 'How should I store my water sample before bringing it in?', ar: 'كيف أحفظ عينة المياه قبل إحضارها؟' }, a: { en: 'Use a clean bottle (we can give you sterile ones), fill it to the top, close it tightly and keep it in a fridge or cool box. Bring it to the lab within 24 hours for microbiology.', ar: 'استخدم عبوة نظيفة (يمكننا تزويدك بعبوات معقمة)، واملأها حتى الأعلى، وأحكم إغلاقها واحفظها في الثلاجة أو صندوق مبرد. أحضرها إلى المختبر خلال 24 ساعة لتحاليل الميكروبيولوجي.' } },
  { q: { en: 'Can I get sample bottles from you?', ar: 'هل يمكنني الحصول على عبوات العينات منكم؟' }, a: { en: 'Yes. Walk-in clients can collect free bottles from our reception, and project clients receive full sampling kits.', ar: 'نعم. يمكن لعملاء الحضور المباشر استلام عبوات مجانية من الاستقبال، ويحصل عملاء المشاريع على حقائب جمع عينات كاملة.' } },
  { q: { en: 'What methods do you use?', ar: 'ما الطرق التحليلية التي تستخدمونها؟' }, a: { en: 'We follow internationally recognised methods, including APHA Standard Methods, ASTM, US EPA and ISO, with documented QA/QC on every batch.', ar: 'نتبع طرقاً معترفاً بها دولياً، منها الطرق القياسية APHA وASTM ووكالة حماية البيئة الأمريكية EPA وISO، مع ضبط جودة موثق لكل دفعة تحليل.' } },
  { q: { en: 'Do I need an appointment as a walk-in client?', ar: 'هل أحتاج إلى موعد كعميل حضور مباشر؟' }, a: { en: 'No appointment is needed during working hours. A quick WhatsApp message before you come helps us prepare.', ar: 'لا حاجة إلى موعد خلال ساعات العمل، لكن رسالة سريعة عبر واتساب قبل حضورك تساعدنا على الاستعداد.' } },
  { q: { en: 'How do I receive my report?', ar: 'كيف أستلم التقرير؟' }, a: { en: 'Reports are emailed as signed PDFs. Hard copies can be collected from the lab. An online results portal is coming soon.', ar: 'تُرسل التقارير بالبريد الإلكتروني بصيغة PDF موقعة، ويمكن استلام النسخ الورقية من المختبر. بوابة النتائج الإلكترونية قادمة قريباً.' } },
  { q: { en: 'Can you help interpret the results?', ar: 'هل تساعدون في تفسير النتائج؟' }, a: { en: 'Yes. Every report compares results to the relevant limits, and AECON’s consultants can advise on corrective action when something exceeds a limit.', ar: 'نعم. يقارن كل تقرير النتائج بالحدود المعتمدة، ويمكن لاستشاريي إيكون تقديم المشورة بشأن الإجراءات التصحيحية عند تجاوز أي حد.' } },
  { q: { en: 'How do I pay?', ar: 'كيف يتم الدفع؟' }, a: { en: 'Walk-in clients pay at reception by card or bank transfer. Corporate clients are invoiced against a purchase order or contract.', ar: 'يدفع عملاء الحضور المباشر في الاستقبال بالبطاقة أو التحويل البنكي، وتصدر فواتير الشركات بموجب أمر شراء أو عقد.' }, todo: true },
]

export const holdTimes: { test: Bi; container: Bi; keep: Bi; max: Bi }[] = [
  { test: { en: 'Drinking / well water: bacteria', ar: 'مياه الشرب / الآبار: البكتيريا' }, container: { en: 'Sterile bottle from BSA (250 mL)', ar: 'عبوة معقمة من BSA (250 مل)' }, keep: { en: 'Fridge or cool box, 2–8 °C', ar: 'ثلاجة أو صندوق مبرد، 2–8 °م' }, max: { en: '24 hours', ar: '24 ساعة' } },
  { test: { en: 'Drinking / well water: chemistry', ar: 'مياه الشرب / الآبار: كيميائي' }, container: { en: 'Clean plastic bottle (1 L)', ar: 'عبوة بلاستيكية نظيفة (1 لتر)' }, keep: { en: 'Cool, out of sunlight', ar: 'مكان بارد بعيداً عن الشمس' }, max: { en: '48 hours', ar: '48 ساعة' } },
  { test: { en: 'Wastewater (BOD, COD, TSS)', ar: 'مياه الصرف (BOD وCOD وTSS)' }, container: { en: 'Plastic bottle (1–2 L)', ar: 'عبوة بلاستيكية (1–2 لتر)' }, keep: { en: 'Cool box with ice, 2–6 °C', ar: 'صندوق مبرد مع ثلج، 2–6 °م' }, max: { en: '24 hours', ar: '24 ساعة' } },
  { test: { en: 'Soil (agricultural)', ar: 'التربة (زراعية)' }, container: { en: 'Clean zip bag (~1 kg)', ar: 'كيس محكم نظيف (~1 كغ)' }, keep: { en: 'Dry, shaded place', ar: 'مكان جاف ومظلل' }, max: { en: '7 days', ar: '7 أيام' } },
  { test: { en: 'Soil (oil / hydrocarbons)', ar: 'التربة (زيوت / هيدروكربونات)' }, container: { en: 'Glass jar from BSA', ar: 'برطمان زجاجي من BSA' }, keep: { en: 'Cool box, 4 °C', ar: 'صندوق مبرد، 4 °م' }, max: { en: '48 hours', ar: '48 ساعة' } },
  { test: { en: 'Sludge', ar: 'الحمأة' }, container: { en: 'Wide-mouth jar (~500 g)', ar: 'برطمان واسع الفوهة (~500 غ)' }, keep: { en: 'Cool box, 4 °C', ar: 'صندوق مبرد، 4 °م' }, max: { en: '24–48 hours', ar: '24–48 ساعة' } },
]

export const packages: { name: Bi; includes: Bi; price: string }[] = [
  { name: { en: 'Drinking Water Basic', ar: 'مياه الشرب الأساسية' }, includes: { en: 'pH, TDS, hardness, chloride, nitrate, total coliform, E. coli', ar: 'pH وTDS والعسر والكلوريد والنترات والقولونيات الكلية وE. coli' }, price: 'TODO' },
  { name: { en: 'Well Water Full', ar: 'مياه الآبار الشامل' }, includes: { en: 'Full physical & chemical suite, metals, bacteria', ar: 'التحاليل الفيزيائية والكيميائية الشاملة والمعادن والبكتيريا' }, price: 'TODO' },
  { name: { en: 'Irrigation Water', ar: 'مياه الري' }, includes: { en: 'EC, SAR, sodium, chloride, boron, bicarbonate, pH', ar: 'EC وSAR والصوديوم والكلوريد والبورون والبيكربونات وpH' }, price: 'TODO' },
  { name: { en: 'Soil Fertility', ar: 'خصوبة التربة' }, includes: { en: 'pH, EC, organic matter, N-P-K, texture', ar: 'pH وEC والمادة العضوية وN-P-K والقوام' }, price: 'TODO' },
]

export const equipment: { name: string; use: Bi }[] = [
  { name: 'ICP-OES / ICP-MS', use: { en: 'Trace and heavy metals', ar: 'المعادن الثقيلة والنزرة' } },
  { name: 'GC-MS', use: { en: 'TPH, BTEX, PAHs, pesticides', ar: 'TPH وBTEX وPAHs والمبيدات' } },
  { name: 'UV-Vis spectrophotometer', use: { en: 'Nutrients and anions', ar: 'المغذيات والأنيونات' } },
  { name: 'BOD incubator', use: { en: '5-day biochemical oxygen demand', ar: 'الطلب الحيوي على الأكسجين لـ 5 أيام' } },
  { name: 'COD digester', use: { en: 'Chemical oxygen demand', ar: 'الطلب الكيميائي على الأكسجين' } },
  { name: 'TOC analyser', use: { en: 'Total organic carbon', ar: 'الكربون العضوي الكلي' } },
  { name: 'Autoclave', use: { en: 'Sterilisation for microbiology', ar: 'التعقيم لتحاليل الميكروبيولوجي' } },
  { name: 'Laminar flow cabinet', use: { en: 'Clean microbiology work', ar: 'عمل ميكروبيولوجي معقم' } },
]

export const ksaCities = ['Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam', 'Al Khobar', 'Jubail', 'Dhahran', 'Qassim (Buraydah)', 'Tabuk', 'NEOM', 'Abha', 'Jazan', 'Najran', 'Hail', 'Al Jouf', 'Taif', 'Yanbu', 'Al Ahsa', 'Other']

export const parametersMarquee = ['pH', 'BOD₅', 'COD', 'TSS', 'TDS', 'Heavy Metals', 'TPH', 'BTEX', 'Coliforms', 'E. coli', 'Nitrates', 'Phosphates', 'Ammonia', 'Salinity', 'Chlorophyll-a', 'Oil & Grease', 'Legionella', 'Helminth Eggs', 'TCLP', 'PAHs']
