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
  { q: { en: 'What methods do you use?', ar: 'ما الطرق التحليلية التي تستخدمونها؟' }, a: { en: 'We follow US EPA methods: EPA 8260 and 8270 for organics by gas chromatography, EPA 200.7 and 200.8 for metals by ICP-MS, and HACH pre-programmed methods for anions and nutrients, with QA/QC on every batch.', ar: 'نتبع طرق وكالة حماية البيئة الأمريكية: EPA 8260 و8270 للمركبات العضوية بالكروماتوغرافيا الغازية، وEPA 200.7 و200.8 للمعادن بتقنية ICP-MS، وطرق HACH المبرمجة للأنيونات والمغذيات، مع ضبط الجودة لكل دفعة.' } },
  { q: { en: 'Do I need an appointment as a walk-in client?', ar: 'هل أحتاج إلى موعد كعميل حضور مباشر؟' }, a: { en: 'No appointment is needed during working hours. A quick WhatsApp message before you come helps us prepare.', ar: 'لا حاجة إلى موعد خلال ساعات العمل، لكن رسالة سريعة عبر واتساب قبل حضورك تساعدنا على الاستعداد.' } },
  { q: { en: 'How do I receive my report?', ar: 'كيف أستلم التقرير؟' }, a: { en: 'Reports are emailed as signed PDFs. Hard copies can be collected from the lab. An online results portal is coming soon.', ar: 'تُرسل التقارير بالبريد الإلكتروني بصيغة PDF موقعة، ويمكن استلام النسخ الورقية من المختبر. بوابة النتائج الإلكترونية قادمة قريباً.' } },
  { q: { en: 'Can you help interpret the results?', ar: 'هل تساعدون في تفسير النتائج؟' }, a: { en: 'Yes. Every report compares results to the relevant limits, and AECON’s consultants can advise on corrective action when something exceeds a limit.', ar: 'نعم. يقارن كل تقرير النتائج بالحدود المعتمدة، ويمكن لاستشاريي إيكون تقديم المشورة بشأن الإجراءات التصحيحية عند تجاوز أي حد.' } },
  { q: { en: 'How do I pay?', ar: 'كيف يتم الدفع؟' }, a: { en: 'Walk-in clients pay at reception by card or bank transfer. Corporate clients are invoiced against a purchase order or contract.', ar: 'يدفع عملاء الحضور المباشر في الاستقبال بالبطاقة أو التحويل البنكي، وتصدر فواتير الشركات بموجب أمر شراء أو عقد.' }, todo: true },
]

export const holdTimes: { test: Bi; container: Bi; keep: Bi; max: Bi }[] = [
  { test: { en: 'Drinking / well water: bacteria', ar: 'مياه الشرب / الآبار: البكتيريا' }, container: { en: 'Sterile bottle from BSA (250 mL)', ar: 'عبوة معقمة من BSA (250 مل)' }, keep: { en: 'Fridge or cool box, 2–8 °C', ar: 'ثلاجة أو صندوق مبرد، 2–8 °م' }, max: { en: '24 hours', ar: '24 ساعة' } },
  { test: { en: 'Drinking / well water: chemistry', ar: 'مياه الشرب / الآبار: كيميائي' }, container: { en: 'Clean plastic bottle (1 L)', ar: 'عبوة بلاستيكية نظيفة (1 لتر)' }, keep: { en: 'Cool, out of sunlight', ar: 'مكان بارد بعيداً عن الشمس' }, max: { en: '48 hours', ar: '48 ساعة' } },
  { test: { en: 'Wastewater (COD, nutrients)', ar: 'مياه الصرف (COD والمغذيات)' }, container: { en: 'Plastic bottle (1–2 L)', ar: 'عبوة بلاستيكية (1–2 لتر)' }, keep: { en: 'Cool box with ice, 2–6 °C', ar: 'صندوق مبرد مع ثلج، 2–6 °م' }, max: { en: '24 hours', ar: '24 ساعة' } },
  { test: { en: 'Soil (agricultural)', ar: 'التربة (زراعية)' }, container: { en: 'Clean zip bag (~1 kg)', ar: 'كيس محكم نظيف (~1 كغ)' }, keep: { en: 'Dry, shaded place', ar: 'مكان جاف ومظلل' }, max: { en: '7 days', ar: '7 أيام' } },
  { test: { en: 'Soil (oil / hydrocarbons)', ar: 'التربة (زيوت / هيدروكربونات)' }, container: { en: 'Glass jar from BSA', ar: 'برطمان زجاجي من BSA' }, keep: { en: 'Cool box, 4 °C', ar: 'صندوق مبرد، 4 °م' }, max: { en: '48 hours', ar: '48 ساعة' } },
  { test: { en: 'Sludge', ar: 'الحمأة' }, container: { en: 'Wide-mouth jar (~500 g)', ar: 'برطمان واسع الفوهة (~500 غ)' }, keep: { en: 'Cool box, 4 °C', ar: 'صندوق مبرد، 4 °م' }, max: { en: '24–48 hours', ar: '24–48 ساعة' } },
]

export const packages: { name: Bi; includes: Bi; price: string }[] = [
  { name: { en: 'Drinking Water Basic', ar: 'مياه الشرب الأساسية' }, includes: { en: 'pH, EC, turbidity, chloride, nitrate, total coliforms, E. coli', ar: 'pH وEC والعكارة والكلوريد والنترات والقولونيات الكلية وE. coli' }, price: 'TODO' },
  { name: { en: 'Well Water Full', ar: 'مياه الآبار الشامل' }, includes: { en: 'Physical & chemical suite, 21 metals by ICP-MS, bacteria', ar: 'التحاليل الفيزيائية والكيميائية، و21 معدناً بتقنية ICP-MS، والبكتيريا' }, price: 'TODO' },
  { name: { en: 'Irrigation Water', ar: 'مياه الري' }, includes: { en: 'pH, EC, salinity, chloride, sulfate, nitrate, Ca, Mg, K', ar: 'pH وEC والملوحة والكلوريد والكبريتات والنترات وCa وMg وK' }, price: 'TODO' },
  { name: { en: 'Soil Fertility', ar: 'خصوبة التربة' }, includes: { en: 'pH, EC, organic matter, nitrate, phosphate, potassium, particle size', ar: 'pH وEC والمادة العضوية والنترات والفوسفات والبوتاسيوم وحجم الحبيبات' }, price: 'TODO' },
]

export type Department = { key: string; name: Bi; instrument: string; method: string; params: string[]; icon: 'organic' | 'icp' | 'spectro' | 'micro' }
export const departments: Department[] = [
  { key: 'organic', icon: 'organic', name: { en: 'Organic department', ar: 'قسم الكيمياء العضوية' }, instrument: 'BIOBASE BK-GC901 Gas Chromatograph (GC)', method: 'EPA 8270 & EPA 8260', params: ['Total petroleum hydrocarbons (TPH)', 'Cyclic hydrocarbons', 'Polychlorinated biphenyls (PCBs)', 'Chlorophenols', 'Chlorobenzene', 'Benzene', 'Toluene', 'Ethylbenzene', 'Xylene'] },
  { key: 'icp', icon: 'icp', name: { en: 'Inorganic department · ICP-MS', ar: 'قسم الكيمياء غير العضوية · ICP-MS' }, instrument: 'PerkinElmer NexION® 1000G ICP-MS', method: 'EPA 200.7 & EPA 200.8', params: ['Sb', 'Ag', 'Mn', 'Cu', 'As', 'Sn', 'Se', 'Pb', 'Be', 'Al', 'Tl', 'Hg', 'Fe', 'Ba', 'U', 'Ni', 'Cd', 'Zn', 'Cr', 'Co', 'V'] },
  { key: 'spectro', icon: 'spectro', name: { en: 'Inorganic department · Spectrophotometry', ar: 'قسم الكيمياء غير العضوية · المطيافية' }, instrument: 'HACH DR 3900 Spectrophotometer', method: 'HACH pre-programmed methods', params: ['Fluoride', 'Chloride', 'Sulfate', 'Phosphate (PO₄)', 'Ammonia (NH₄)', 'Nitrite', 'Nitrate', 'Calcium (Ca)', 'Potassium (K)', 'Magnesium (Mg)', 'Phenols', 'TOC', 'COD'] },
  { key: 'micro', icon: 'micro', name: { en: 'Microbiology department', ar: 'قسم الميكروبيولوجي' }, instrument: 'Enumeration & identification', method: 'Water & environmental samples', params: ['Aerobic & anaerobic count', 'Total coliforms', 'Enterobacteriaceae', 'Staphylococcus aureus', 'Colony count', 'E. coli', 'Pseudomonas aeruginosa', 'Yeast & moulds'] },
]

export const equipment: { name: string; use: Bi }[] = [
  { name: 'HACH HQ2200 Multi-Meter', use: { en: 'Electrical conductivity, pH and dissolved oxygen', ar: 'التوصيلية الكهربائية والأس الهيدروجيني والأكسجين المذاب' } },
  { name: 'HACH 2100Q Turbidity Meter', use: { en: 'Precise turbidity measurement for water quality', ar: 'قياس دقيق للعكارة لتقييم جودة المياه' } },
  { name: 'Sieve Shaker', use: { en: 'Particle size distribution for soil, aggregates and sand', ar: 'توزيع حجم الحبيبات للتربة والركام والرمل' } },
  { name: 'Muffle Furnace (up to 1200 °C)', use: { en: 'Ash content, loss on ignition (LOI) and mineral analysis', ar: 'محتوى الرماد والفقد بالحرق والتحليل المعدني' } },
]

export const ksaCities = ['Riyadh', 'Jeddah', 'Makkah', 'Madinah', 'Dammam', 'Al Khobar', 'Jubail', 'Dhahran', 'Qassim (Buraydah)', 'Tabuk', 'NEOM', 'Abha', 'Jazan', 'Najran', 'Hail', 'Al Jouf', 'Taif', 'Yanbu', 'Al Ahsa', 'Other']

export const parametersMarquee = ['pH', 'COD', 'TOC', 'Heavy Metals · ICP-MS', 'TPH', 'BTEX', 'PCBs', 'Phenols', 'Total Coliforms', 'E. coli', 'Nitrate', 'Phosphate', 'Ammonia', 'Fluoride', 'Salinity', 'Dissolved Oxygen', 'Turbidity', 'Pseudomonas', 'Yeast & Moulds', 'Particle Size']
