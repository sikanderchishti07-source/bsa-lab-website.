import type { Bi } from '../lib/i18n-helpers'

export type ParamGroup = { title: Bi; items: string[] }
export type Service = {
  slug: string
  icon: 'droplet' | 'factory' | 'sprout' | 'layers' | 'waves' | 'mountain' | 'flask'
  title: Bi
  short: Bi
  overview: Bi
  scope: Bi
  whoNeeds: Bi[]
  params: ParamGroup[]
  sampling: Bi
  turnaround: Bi // TODO_CONFIRM
  related: string[]
}

const ta = { en: 'Typically 3–7 working days (urgent service available)', ar: 'عادةً من 3 إلى 7 أيام عمل — ‎تتوفر خدمة مستعجلة' } // TODO_CONFIRM

export const services: Service[] = [
  {
    slug: 'water-testing',
    icon: 'droplet',
    title: { en: 'Water Testing', ar: 'تحليل المياه' },
    short: { en: 'Drinking, well, irrigation, process and pool water analysed against Saudi limits.', ar: 'تحليل مياه الشرب والآبار والري والعمليات الصناعية والمسابح وفق الحدود السعودية.' },
    overview: {
      en: 'Clean water is the first thing regulators, residents and operators ask about. We test physical, chemical, metal and microbiological quality so you know exactly what is in your water and whether it meets the applicable Saudi and international limits.',
      ar: 'المياه النظيفة هي أول ما تسأل عنه الجهات الرقابية والسكان والمشغلون. نختبر الجودة الفيزيائية والكيميائية والمعادن والميكروبيولوجية لتعرف بدقة مكونات مياهك ومدى مطابقتها للحدود السعودية والدولية المعمول بها.',
    },
    scope: { en: 'Drinking & bottled water • Well and tank water • Irrigation water • Process & boiler feed • Cooling towers • Swimming pools', ar: 'مياه الشرب والمعبأة • مياه الآبار والخزانات • مياه الري • مياه العمليات والغلايات • أبراج التبريد • المسابح' },
    whoNeeds: [
      { en: 'Facility and property managers', ar: 'مديرو المرافق والعقارات' },
      { en: 'Bottled water and food producers', ar: 'منتجو المياه المعبأة والأغذية' },
      { en: 'Farms and landscaping contractors', ar: 'المزارع ومقاولو تنسيق المواقع' },
      { en: 'Hotels, hospitals and pool operators', ar: 'الفنادق والمستشفيات ومشغلو المسابح' },
    ],
    params: [
      { title: { en: 'Field & physical (HACH HQ2200 / 2100Q)', ar: 'ميدانية وفيزيائية — ‎HACH HQ2200 / 2100Q' }, items: ['pH', 'Temperature', 'EC / Conductivity', 'Salinity', 'Dissolved oxygen (DO)', 'Turbidity'] },
      { title: { en: 'Anions & nutrients (HACH DR 3900)', ar: 'الأنيونات والمغذيات — ‎HACH DR 3900' }, items: ['Fluoride', 'Chloride', 'Sulfate', 'Nitrate', 'Nitrite', 'Ammonia (NH₄)', 'Phosphate (PO₄)'] },
      { title: { en: 'Major cations', ar: 'الكاتيونات الرئيسية' }, items: ['Calcium (Ca)', 'Magnesium (Mg)', 'Potassium (K)'] },
      { title: { en: 'Metals (ICP-MS · EPA 200.7 / 200.8)', ar: 'المعادن — ‎ICP-MS · EPA 200.7 / 200.8' }, items: ['Antimony (Sb)', 'Silver (Ag)', 'Manganese (Mn)', 'Copper (Cu)', 'Arsenic (As)', 'Tin (Sn)', 'Selenium (Se)', 'Lead (Pb)', 'Beryllium (Be)', 'Aluminium (Al)', 'Thallium (Tl)', 'Mercury (Hg)', 'Iron (Fe)', 'Barium (Ba)', 'Uranium (U)', 'Nickel (Ni)', 'Cadmium (Cd)', 'Zinc (Zn)', 'Chromium (Cr)', 'Cobalt (Co)', 'Vanadium (V)'] },
      { title: { en: 'Organics (GC · EPA 8260 / 8270)', ar: 'المركبات العضوية — ‎GC · EPA 8260 / 8270' }, items: ['TPH', 'Benzene', 'Toluene', 'Ethylbenzene', 'Xylene', 'Phenols', 'TOC'] },
      { title: { en: 'Microbiology', ar: 'الميكروبيولوجي' }, items: ['Aerobic & anaerobic count', 'Total coliforms', 'Enterobacteriaceae', 'Staphylococcus aureus', 'Colony count', 'E. coli', 'Pseudomonas aeruginosa', 'Yeast & moulds'] },
    ],
    sampling: {
      en: 'Microbiology samples go in sterile bottles with thiosulfate and must reach the lab chilled within 24 hours. Chemistry samples use clean PE bottles; metals are acid-preserved.',
      ar: 'تُجمع عينات الميكروبيولوجي في عبوات معقمة تحتوي على الثيوكبريتات ويجب أن تصل إلى المختبر مبردة خلال 24 ساعة. تُستخدم عبوات بولي إيثيلين نظيفة للتحاليل الكيميائية، وتُحفظ عينات المعادن بالحمض.',
    },
    turnaround: ta,
    related: ['groundwater-testing', 'wastewater-stp-testing', 'field-sampling'],
  },
  {
    slug: 'wastewater-stp-testing',
    icon: 'factory',
    title: { en: 'Wastewater & STP Testing', ar: 'تحليل مياه الصرف ومحطات المعالجة' },
    short: { en: 'Influent, effluent and TSE monitoring for STP performance and reuse compliance.', ar: 'مراقبة المياه الداخلة والخارجة والمياه المعالجة لتقييم أداء المحطات ومطابقة اشتراطات إعادة الاستخدام.' },
    overview: {
      en: 'Saudi Arabia is pushing to reuse as much treated wastewater as possible, which means every STP and industrial discharge point is under closer scrutiny. We monitor influent, process stages and final effluent so operators can prove performance, optimise treatment and stay compliant.',
      ar: 'تسعى المملكة إلى إعادة استخدام أكبر قدر ممكن من مياه الصرف المعالجة، مما يعني رقابة أدق على كل محطة معالجة ونقطة تصريف صناعي. نراقب المياه الداخلة ومراحل المعالجة والمياه الخارجة النهائية ليتمكن المشغلون من إثبات الأداء وتحسين المعالجة والبقاء ملتزمين.',
    },
    scope: { en: 'STP influent & effluent • Treated sewage effluent (TSE) for irrigation & reuse • Industrial discharge • Septic & holding tanks • Process stage audits', ar: 'المياه الداخلة والخارجة لمحطات المعالجة • المياه المعالجة للري وإعادة الاستخدام • التصريف الصناعي • خزانات الصرف والتجميع • تدقيق مراحل المعالجة' },
    whoNeeds: [
      { en: 'Municipal and private STP operators', ar: 'مشغلو محطات المعالجة البلدية والخاصة' },
      { en: 'Factories with discharge permits', ar: 'المصانع الحاصلة على تصاريح تصريف' },
      { en: 'Compounds, camps and giga-project sites', ar: 'المجمعات السكنية والمخيمات ومواقع المشاريع الكبرى' },
      { en: 'Environmental consultants preparing compliance reports', ar: 'الاستشاريون البيئيون المعدّون لتقارير الالتزام' },
    ],
    params: [
      { title: { en: 'Organic load', ar: 'الحمل العضوي' }, items: ['COD', 'TOC', 'Phenols', 'TPH'] },
      { title: { en: 'Field & physical', ar: 'ميدانية وفيزيائية' }, items: ['pH', 'Temperature', 'EC', 'Dissolved oxygen (DO)', 'Turbidity'] },
      { title: { en: 'Nutrients', ar: 'المغذيات' }, items: ['Ammonia (NH₄)', 'Nitrate', 'Nitrite', 'Phosphate (PO₄)', 'Sulfate', 'Chloride'] },
      { title: { en: 'Metals (ICP-MS)', ar: 'المعادن — ‎ICP-MS' }, items: ['21-metal ICP-MS suite (Pb, Cd, Cr, As, Hg, Ni, Cu, Zn…)'] },
      { title: { en: 'Microbiology', ar: 'الميكروبيولوجي' }, items: ['Total coliforms', 'E. coli', 'Enterobacteriaceae', 'Pseudomonas aeruginosa'] },
    ],
    sampling: {
      en: 'We take grab or 24-hour composite samples depending on the permit. pH, temperature, EC and DO are measured on site; samples for COD and nutrients are acid-preserved and kept chilled.',
      ar: 'نأخذ عينات لحظية أو مركبة على مدى 24 ساعة حسب متطلبات التصريح. تُقاس درجة الحموضة والحرارة والتوصيلية والأكسجين المذاب في الموقع، وتُحفظ عينات COD والمغذيات بالحمض وتُبرَّد.',
    },
    turnaround: ta,
    related: ['sludge-testing', 'water-testing', 'field-sampling'],
  },
  {
    slug: 'soil-testing',
    icon: 'sprout',
    title: { en: 'Soil Testing', ar: 'تحليل التربة' },
    short: { en: 'Environmental and agricultural soil analysis, from contamination to fertility.', ar: 'تحليل التربة بيئياً وزراعياً، من التلوث إلى الخصوبة.' },
    overview: {
      en: 'Whether you are buying land, remediating a site, preparing an EIA baseline or planning a farm, the soil tells the story. We analyse chemical quality, nutrients and organic contaminants so decisions are based on data, not assumptions.',
      ar: 'سواء كنت تشتري أرضاً أو تعالج موقعاً أو تعد خط أساس لدراسة تقييم أثر بيئي أو تخطط لمزرعة، فالتربة تروي القصة. نحلل الجودة الكيميائية والمغذيات والملوثات العضوية لتُبنى القرارات على البيانات لا على الافتراضات.',
    },
    scope: { en: 'Contaminated land assessment • Site remediation verification • EIA baseline surveys • Agricultural & landscaping soil • Backfill and import soil checks', ar: 'تقييم الأراضي الملوثة • التحقق من معالجة المواقع • مسوحات خط الأساس لتقييم الأثر البيئي • تربة الزراعة وتنسيق المواقع • فحص تربة الردم والتربة المستوردة' },
    whoNeeds: [
      { en: 'Developers and real-estate buyers', ar: 'المطورون ومشترو العقارات' },
      { en: 'Oil, gas and industrial sites', ar: 'مواقع النفط والغاز والمنشآت الصناعية' },
      { en: 'Farms and agricultural investors', ar: 'المزارع والمستثمرون الزراعيون' },
      { en: 'EIA and remediation consultants', ar: 'استشاريو تقييم الأثر البيئي والمعالجة' },
    ],
    params: [
      { title: { en: 'Physical', ar: 'فيزيائية' }, items: ['pH', 'EC', 'Moisture content', 'Organic matter (LOI)', 'Ash content', 'Particle size (sieve analysis)'] },
      { title: { en: 'Salts & nutrients', ar: 'الأملاح والمغذيات' }, items: ['Chloride', 'Sulfate', 'Nitrate', 'Phosphate', 'Potassium', 'Calcium', 'Magnesium'] },
      { title: { en: 'Metals (ICP-MS)', ar: 'المعادن — ‎ICP-MS' }, items: ['21-metal ICP-MS suite (Pb, Cd, Cr, As, Hg, Ni, Cu, Zn…)'] },
      { title: { en: 'Organic contaminants (GC)', ar: 'الملوثات العضوية — ‎GC' }, items: ['TPH', 'BTEX', 'PCBs', 'Chlorophenols', 'Chlorobenzene', 'Cyclic hydrocarbons'] },
    ],
    sampling: {
      en: 'Samples are taken by depth with clean stainless tools, sealed in glass jars for organics and bags for general chemistry, then kept cool until they reach the lab.',
      ar: 'تُؤخذ العينات حسب العمق بأدوات نظيفة من الفولاذ المقاوم للصدأ، وتُحفظ في برطمانات زجاجية للملوثات العضوية وأكياس للتحاليل العامة، ثم تُبقى مبردة حتى وصولها إلى المختبر.',
    },
    turnaround: ta,
    related: ['groundwater-testing', 'sludge-testing', 'field-sampling'],
  },
  {
    slug: 'sludge-testing',
    icon: 'layers',
    title: { en: 'Sludge Testing', ar: 'تحليل الحمأة' },
    short: { en: 'STP and industrial sludge classified for disposal, landfill or reuse.', ar: 'تصنيف حمأة محطات المعالجة والحمأة الصناعية للتخلص أو الدفن أو إعادة الاستخدام.' },
    overview: {
      en: 'Sludge cannot leave site without knowing what is in it. We characterise STP sludge, biosolids and industrial sludge so you can choose the right disposal route, get landfill acceptance, or turn it into a usable soil conditioner.',
      ar: 'لا يمكن نقل الحمأة من الموقع دون معرفة مكوناتها. نحدد خصائص حمأة محطات المعالجة والمواد الصلبة الحيوية والحمأة الصناعية لتختار مسار التخلص المناسب أو تحصل على قبول المرادم أو تحولها إلى محسّن تربة قابل للاستخدام.',
    },
    scope: { en: 'STP sludge & biosolids • Industrial and oily sludge • Disposal classification • Reuse as fertiliser or soil conditioner', ar: 'حمأة محطات المعالجة والمواد الصلبة الحيوية • الحمأة الصناعية والزيتية • تصنيف التخلص • إعادة الاستخدام كسماد أو محسّن تربة' },
    whoNeeds: [
      { en: 'STP operators and O&M contractors', ar: 'مشغلو محطات المعالجة ومقاولو التشغيل والصيانة' },
      { en: 'Waste management companies', ar: 'شركات إدارة النفايات' },
      { en: 'Refineries and industrial plants', ar: 'المصافي والمصانع' },
      { en: 'Compost and fertiliser producers', ar: 'منتجو السماد العضوي والأسمدة' },
    ],
    params: [
      { title: { en: 'Physical', ar: 'فيزيائية' }, items: ['Moisture / dry solids', 'Volatile solids (LOI)', 'Ash content', 'pH'] },
      { title: { en: 'Metals (ICP-MS)', ar: 'المعادن — ‎ICP-MS' }, items: ['21-metal ICP-MS suite (Pb, Cd, Cr, As, Hg, Ni, Cu, Zn…)'] },
      { title: { en: 'Nutrients', ar: 'المغذيات' }, items: ['Nitrate', 'Ammonia (NH₄)', 'Phosphate', 'Potassium'] },
      { title: { en: 'Organics (GC)', ar: 'المركبات العضوية — ‎GC' }, items: ['TPH', 'PCBs', 'Phenols'] },
      { title: { en: 'Microbiology', ar: 'الميكروبيولوجي' }, items: ['Total coliforms', 'E. coli', 'Enterobacteriaceae', 'Yeast & moulds'] },
    ],
    sampling: {
      en: 'Composite samples are collected from several points of the drying bed, belt press or storage pile, packed in wide-mouth jars and chilled.',
      ar: 'تُجمع عينات مركبة من عدة نقاط في أحواض التجفيف أو المكبس الحزامي أو أكوام التخزين، وتُعبأ في برطمانات واسعة الفوهة وتُبرَّد.',
    },
    turnaround: ta,
    related: ['wastewater-stp-testing', 'soil-testing', 'field-sampling'],
  },
  {
    slug: 'marine-seawater-testing',
    icon: 'waves',
    title: { en: 'Marine & Seawater Testing', ar: 'تحليل المياه البحرية والساحلية' },
    short: { en: 'Seawater and sediment analysis for coastal, port and desalination projects.', ar: 'تحليل مياه البحر والرواسب لمشاريع السواحل والموانئ ومحطات التحلية.' },
    overview: {
      en: 'Red Sea and Arabian Gulf developments are held to strict marine protection standards. Together with AECON’s marine and coastal studies team, we sample seawater and sediment and analyse them for the parameters that matter to marine ecosystems.',
      ar: 'تخضع مشاريع البحر الأحمر والخليج العربي لمعايير صارمة لحماية البيئة البحرية. بالتعاون مع فريق الدراسات البحرية والساحلية في إيكون، نجمع عينات مياه البحر والرواسب ونحللها وفق المعايير المهمة للنظم البيئية البحرية.',
    },
    scope: { en: 'Coastal & marine baseline surveys • Desalination intake and brine outfall • Ports, marinas and dredging • Resort and island developments', ar: 'مسوحات خط الأساس الساحلية والبحرية • مآخذ محطات التحلية ومصبات المياه المالحة • الموانئ والمراسي وأعمال التجريف • تطوير المنتجعات والجزر' },
    whoNeeds: [
      { en: 'Coastal giga-project developers', ar: 'مطورو المشاريع الساحلية الكبرى' },
      { en: 'Desalination plant operators', ar: 'مشغلو محطات التحلية' },
      { en: 'Port and marine contractors', ar: 'مقاولو الموانئ والأعمال البحرية' },
      { en: 'Marine environmental consultants', ar: 'الاستشاريون البيئيون البحريون' },
    ],
    params: [
      { title: { en: 'Field measurements', ar: 'القياسات الميدانية' }, items: ['Salinity', 'Dissolved oxygen (DO)', 'pH', 'Temperature', 'Turbidity', 'EC'] },
      { title: { en: 'Nutrients', ar: 'المغذيات' }, items: ['Nitrate', 'Nitrite', 'Ammonia (NH₄)', 'Phosphate (PO₄)'] },
      { title: { en: 'Contaminants', ar: 'الملوثات' }, items: ['Metals (ICP-MS)', 'TPH', 'Phenols'] },
      { title: { en: 'Sediment & biology', ar: 'الرواسب والأحياء' }, items: ['Sediment particle size', 'Sediment metals & TPH', 'Total coliforms', 'E. coli'] },
    ],
    sampling: {
      en: 'Depth-specific water samples and seabed sediment grabs are collected, logged with GPS coordinates and kept cold until they reach the lab.',
      ar: 'تُجمع عينات المياه من أعماق محددة وعينات رواسب قاع البحر، وتُسجل بإحداثيات GPS وتُحفظ مبردة حتى وصولها إلى المختبر.',
    },
    turnaround: ta,
    related: ['water-testing', 'soil-testing', 'field-sampling'],
  },
  {
    slug: 'groundwater-testing',
    icon: 'mountain',
    title: { en: 'Groundwater Testing', ar: 'تحليل المياه الجوفية' },
    short: { en: 'Monitoring wells and aquifer quality for hydrogeological and contamination studies.', ar: 'مراقبة الآبار وجودة الخزانات الجوفية للدراسات الهيدروجيولوجية ودراسات التلوث.' },
    overview: {
      en: 'Groundwater is a strategic resource in the Kingdom. We sample monitoring and production wells, purge them correctly and analyse the water to track aquifer quality, map contamination plumes and support AECON’s hydrogeological studies.',
      ar: 'المياه الجوفية مورد استراتيجي في المملكة. نجمع العينات من آبار المراقبة والإنتاج بعد تطهيرها بالطريقة الصحيحة، ونحلل المياه لمتابعة جودة الخزان الجوفي ورسم نطاق انتشار التلوث ودعم الدراسات الهيدروجيولوجية لإيكون.',
    },
    scope: { en: 'Monitoring well programmes • Production and farm wells • Contamination plume mapping • Hydrogeological studies', ar: 'برامج آبار المراقبة • آبار الإنتاج والمزارع • رسم نطاق انتشار التلوث • الدراسات الهيدروجيولوجية' },
    whoNeeds: [
      { en: 'Industrial and fuel-storage sites', ar: 'المواقع الصناعية ومواقع تخزين الوقود' },
      { en: 'Farms relying on wells', ar: 'المزارع المعتمدة على الآبار' },
      { en: 'Landfills and waste facilities', ar: 'المرادم ومرافق النفايات' },
      { en: 'Hydrogeology consultants', ar: 'استشاريو الهيدروجيولوجيا' },
    ],
    params: [
      { title: { en: 'Field', ar: 'ميدانية' }, items: ['pH', 'EC', 'Temperature', 'Dissolved oxygen (DO)', 'Salinity'] },
      { title: { en: 'Major ions', ar: 'الأيونات الرئيسية' }, items: ['Calcium', 'Magnesium', 'Potassium', 'Chloride', 'Sulfate', 'Nitrate', 'Fluoride'] },
      { title: { en: 'Contaminants', ar: 'الملوثات' }, items: ['Metals (ICP-MS)', 'TPH', 'BTEX', 'Phenols'] },
      { title: { en: 'Microbiology', ar: 'الميكروبيولوجي' }, items: ['Total coliforms', 'E. coli'] },
    ],
    sampling: {
      en: 'Wells are purged until field readings stabilise, then sampled with dedicated bailers or low-flow pumps into preserved bottles.',
      ar: 'تُطهَّر الآبار حتى تستقر القراءات الميدانية، ثم تُجمع العينات باستخدام أدوات سحب مخصصة أو مضخات منخفضة التدفق في عبوات محفوظة.',
    },
    turnaround: ta,
    related: ['water-testing', 'soil-testing', 'field-sampling'],
  },
  {
    slug: 'field-sampling',
    icon: 'flask',
    title: { en: 'Field Sampling Services', ar: 'خدمات جمع العينات الميدانية' },
    short: { en: 'Our engineers collect, preserve and deliver your samples under chain of custody.', ar: 'يجمع مهندسونا عيناتك ويحفظونها ويوصلونها وفق سلسلة الحيازة.' },
    overview: {
      en: 'A result is only as good as the sample behind it. Our trained field engineers travel to your site anywhere in the Kingdom, collect representative samples with the right containers and preservatives, and bring them to our lab under documented chain of custody.',
      ar: 'دقة النتيجة من دقة العينة. يتوجه مهندسونا الميدانيون المدربون إلى موقعك في أي مكان بالمملكة، ويجمعون عينات ممثلة باستخدام العبوات والمواد الحافظة الصحيحة، وينقلونها إلى مختبرنا وفق سلسلة حيازة موثقة.',
    },
    scope: { en: 'Grab & composite sampling • Automatic samplers • Preservation & cool-box transport • Chain of custody • GPS-tagged points & photo logs', ar: 'عينات لحظية ومركبة • أجهزة جمع العينات الآلية • الحفظ والنقل في صناديق مبردة • سلسلة الحيازة • نقاط موثقة بـ GPS وسجلات مصورة' },
    whoNeeds: [
      { en: 'Clients without in-house sampling teams', ar: 'العملاء الذين ليس لديهم فرق جمع عينات' },
      { en: 'Remote and multi-site projects', ar: 'المشاريع البعيدة ومتعددة المواقع' },
      { en: 'Regulatory monitoring programmes', ar: 'برامج الرصد الرقابية' },
      { en: 'Consultants who need defensible data', ar: 'الاستشاريون الذين يحتاجون بيانات موثوقة' },
    ],
    params: [
      { title: { en: 'On-site measurements (HACH HQ2200 / 2100Q)', ar: 'القياسات الميدانية — ‎HACH HQ2200 / 2100Q' }, items: ['pH', 'EC', 'Temperature', 'Salinity', 'Dissolved oxygen (DO)', 'Turbidity'] },
      { title: { en: 'Documentation', ar: 'التوثيق' }, items: ['Chain-of-custody forms', 'GPS coordinates', 'Photo logs', 'Field sheets'] },
    ],
    sampling: {
      en: 'Every trip includes calibrated HACH field meters (HQ2200 multi-meter and 2100Q turbidity meter), clean containers, preservatives and ice boxes. Field measurements follow EPA recommendations.',
      ar: 'تتضمن كل زيارة أجهزة HACH ميدانية معايرة (جهاز HQ2200 متعدد القياسات وجهاز العكارة 2100Q)، وعبوات نظيفة، ومواد حافظة، وصناديق تبريد. تُجرى القياسات الميدانية وفق توصيات وكالة حماية البيئة الأمريكية.',
    },
    turnaround: { en: 'Site visits scheduled within 24–72 hours in Riyadh', ar: 'تُجدول الزيارات خلال 24–72 ساعة داخل الرياض' }, // TODO_CONFIRM
    related: ['water-testing', 'wastewater-stp-testing', 'soil-testing'],
  },
]

export const getService = (slug?: string) => services.find((s) => s.slug === slug)
