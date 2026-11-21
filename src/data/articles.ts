/**
 * Insights / blog articles. Add a new object to `articles` to publish a post
 * (newest first), then add its URL to public/sitemap.xml.
 */
type Bi = { en: string; ar: string }
export type Block = { h?: string; p?: string; ul?: string[]; tip?: string }

export type Article = {
  slug: string
  date: string // ISO
  readMins: number
  category: Bi
  title: Bi
  excerpt: Bi
  cover: string // path under /public
  related: string[] // service slugs
  body: { en: Block[]; ar: Block[] }
}

export const articles: Article[] = [
  {
    slug: 'how-to-collect-a-water-sample',
    date: '2026-11-20',
    readMins: 5,
    category: { en: 'Sampling guide', ar: 'دليل جمع العينات' },
    title: {
      en: 'How to collect a water sample for laboratory testing',
      ar: 'كيف تجمع عينة مياه للتحليل المخبري',
    },
    excerpt: {
      en: 'Most wrong results start before the sample reaches the lab. Here is how to fill, label, cool and deliver a water sample so the result reflects your water — not the bottle.',
      ar: 'معظم النتائج الخاطئة تبدأ قبل وصول العينة إلى المختبر. إليك طريقة تعبئة عينة المياه وترقيمها وتبريدها وتسليمها لتعكس النتيجة مياهك فعلاً لا العبوة.',
    },
    cover: 'images/services/water-testing.webp',
    related: ['water-testing', 'field-sampling'],
    body: {
      en: [
        { p: 'A laboratory can only analyse what it receives. If a bottle is dirty, warm or several days old, even the best instrument will report a number that does not describe your water. Good sampling takes a few minutes and makes the difference between a useful result and a wasted test.' },
        { h: '1. Use the right container' },
        { ul: [
          'Bacteria tests (E. coli, coliforms): a sterile bottle supplied by the lab, usually 250 mL. Some contain a small amount of chemical that neutralises chlorine — do not rinse it out.',
          'General chemistry (pH, hardness, nitrate, chloride…): a clean plastic bottle of about 1 L.',
          'Oil, fuel or hydrocarbons: a glass container from the lab — plastic can absorb or release organic compounds.',
        ] },
        { tip: 'BSA.lab provides the correct bottles free of charge when you book a test.' },
        { h: '2. Fill the bottle correctly' },
        { ul: [
          'For a tap, remove any filter or aerator and let the water run for 2–3 minutes first.',
          'Wash your hands, open the bottle only at the moment of filling and never touch the inside of the cap or neck.',
          'For bacteria, fill to the shoulder and leave a small air gap. For chemistry, fill to the top unless told otherwise.',
          'Close the cap tightly straight away.',
        ] },
        { h: '3. Label it' },
        { p: 'Write the location, date and time of sampling and your name on the bottle. If you are sending several samples, make sure each label matches what you write on the request form.' },
        { h: '4. Keep it cool and deliver it quickly' },
        { p: 'Keep bacteria samples in a fridge or a cool box at 6 °C or below and deliver them within 24 hours. Chemistry samples should be kept cool and out of sunlight and delivered within 48 hours. Never freeze a water sample.' },
        { h: 'Common mistakes we see' },
        { ul: [
          'Re-using a drinks bottle instead of a lab bottle.',
          'Leaving the sample in a hot car.',
          'Sampling from a hose or a dirty tap spout.',
          'Delivering bacteria samples after the 24-hour window.',
        ] },
        { p: 'If you are not sure how to sample, book our field team — our engineers collect, preserve and deliver the sample under chain of custody.' },
      ],
      ar: [
        { p: 'لا يستطيع المختبر أن يحلل إلا ما يصله. فإذا كانت العبوة متسخة أو دافئة أو مضى عليها عدة أيام، فحتى أفضل جهاز سيعطي رقماً لا يصف مياهك. جمع العينة بشكل صحيح يستغرق دقائق، لكنه الفرق بين نتيجة مفيدة وتحليل ضائع.' },
        { h: '1. استخدم العبوة الصحيحة' },
        { ul: [
          'تحاليل البكتيريا (E. coli والقولونيات): عبوة معقمة من المختبر، عادة 250 مل. بعضها يحتوي على مادة تعادل الكلور، فلا تشطفها.',
          'الكيمياء العامة (pH والعسر والنترات والكلوريد…): عبوة بلاستيكية نظيفة بسعة لتر تقريباً.',
          'الزيوت والوقود والهيدروكربونات: عبوة زجاجية من المختبر، لأن البلاستيك قد يمتص المركبات العضوية أو يطلقها.',
        ] },
        { tip: 'يوفر مختبر BSA العبوات المناسبة مجاناً عند حجز التحليل.' },
        { h: '2. املأ العبوة بشكل صحيح' },
        { ul: [
          'إذا كانت العينة من صنبور، أزل أي فلتر أو مِرشّة واترك الماء يجري دقيقتين إلى ثلاث أولاً.',
          'اغسل يديك، ولا تفتح العبوة إلا لحظة التعبئة، ولا تلمس داخل الغطاء أو عنق العبوة.',
          'لتحاليل البكتيريا املأ حتى الكتف واترك فراغاً هوائياً صغيراً، وللكيمياء املأ حتى الأعلى ما لم يُطلب غير ذلك.',
          'أغلق الغطاء بإحكام فوراً.',
        ] },
        { h: '3. ضع بطاقة على العبوة' },
        { p: 'اكتب الموقع وتاريخ ووقت الجمع واسمك على العبوة. وإذا كانت لديك عدة عينات، فتأكد من مطابقة كل بطاقة لما تكتبه في نموذج الطلب.' },
        { h: '4. حافظ على برودتها وسلّمها بسرعة' },
        { p: 'احفظ عينات البكتيريا في ثلاجة أو صندوق مبرد عند 6 °م أو أقل وسلّمها خلال 24 ساعة. أما عينات الكيمياء فتُحفظ باردة بعيداً عن الشمس وتُسلَّم خلال 48 ساعة. لا تجمّد عينة المياه أبداً.' },
        { h: 'أخطاء شائعة نراها' },
        { ul: [
          'استخدام عبوة مشروبات بدلاً من عبوة المختبر.',
          'ترك العينة في سيارة حارة.',
          'أخذ العينة من خرطوم أو صنبور متسخ.',
          'تسليم عينات البكتيريا بعد مرور 24 ساعة.',
        ] },
        { p: 'إذا لم تكن متأكداً من طريقة الجمع، احجز فريقنا الميداني، فمهندسونا يجمعون العينة ويحفظونها ويسلّمونها وفق سلسلة الحيازة.' },
      ],
    },
  },
  {
    slug: 'stp-effluent-testing-key-parameters',
    date: '2026-11-17',
    readMins: 6,
    category: { en: 'Wastewater', ar: 'مياه الصرف' },
    title: {
      en: 'STP effluent testing: the key parameters explained',
      ar: 'تحليل مياه محطات المعالجة: شرح أهم المعايير',
    },
    excerpt: {
      en: 'BOD, COD, TSS, ammonia, coliforms — what each parameter on your sewage treatment plant report actually tells you, and why grab and composite samples give different answers.',
      ar: 'BOD وCOD وTSS والأمونيا والقولونيات: ماذا يخبرك كل معيار في تقرير محطة معالجة الصرف الصحي، ولماذا تختلف نتائج العينة اللحظية عن المركّبة.',
    },
    cover: 'images/services/wastewater-stp-testing.webp',
    related: ['wastewater-stp-testing', 'monitoring-programmes', 'sewer-discharge-compliance'],
    body: {
      en: [
        { p: 'A sewage treatment plant (STP) is only as good as its effluent. Regular laboratory testing shows whether the plant is treating properly, whether treated water can be reused, and whether you are meeting the limits in your environmental permit.' },
        { h: 'Organic load: BOD and COD' },
        { p: 'Biochemical oxygen demand (BOD) measures how much oxygen bacteria need to break down the organic matter in the water over five days. Chemical oxygen demand (COD) measures the same load chemically, in a few hours. High values mean organic matter is passing through the plant untreated. The COD/BOD ratio also hints at whether the waste is easily biodegradable.' },
        { h: 'Solids: TSS' },
        { p: 'Total suspended solids (TSS) are the particles you could filter out. High TSS usually points to problems in settling or clarification and can block irrigation systems that use treated water.' },
        { h: 'Nutrients: ammonia, nitrate and phosphate' },
        { p: 'Ammonia shows whether nitrification is working. Nitrate and phosphate matter when effluent is discharged to the environment or reused for landscaping, because they feed algae and can affect groundwater.' },
        { h: 'Hygiene: coliforms and E. coli' },
        { p: 'Faecal coliforms and E. coli indicate whether disinfection is effective. They are central for any reuse of treated sewage effluent (TSE), for example for irrigation.' },
        { h: 'Other common parameters' },
        { ul: ['pH and temperature', 'Oil and grease (FOG)', 'Residual chlorine after disinfection', 'Metals, where industrial wastewater enters the network'] },
        { h: 'Grab or composite sample?' },
        { p: 'A grab sample is a snapshot taken at one moment. A composite sample combines several portions over a period — often 24 hours — and better represents average performance. Your permit or consultant will specify which one is required; our field team can collect both.' },
        { tip: 'BSA.lab reports compare each result against the applicable Saudi limits, so you can see at a glance where the plant stands.' },
      ],
      ar: [
        { p: 'جودة محطة معالجة الصرف الصحي تُقاس بجودة المياه الخارجة منها. والتحليل المخبري المنتظم يبيّن ما إذا كانت المحطة تعالج بشكل صحيح، وما إذا كان يمكن إعادة استخدام المياه المعالجة، وما إذا كنت ملتزماً بحدود تصريحك البيئي.' },
        { h: 'الحمل العضوي: BOD وCOD' },
        { p: 'يقيس الطلب الحيوي على الأكسجين (BOD) كمية الأكسجين التي تحتاجها البكتيريا لتحليل المواد العضوية خلال خمسة أيام، بينما يقيس الطلب الكيميائي على الأكسجين (COD) الحمل نفسه كيميائياً خلال ساعات. القيم المرتفعة تعني أن مواد عضوية تمر عبر المحطة دون معالجة، كما تعطي نسبة COD إلى BOD فكرة عن سهولة التحلل الحيوي للمخلفات.' },
        { h: 'المواد الصلبة: TSS' },
        { p: 'المواد الصلبة العالقة الكلية (TSS) هي الجسيمات التي يمكن ترشيحها. وارتفاعها يشير عادة إلى مشكلة في الترسيب أو التصفية، وقد يسد أنظمة الري التي تستخدم المياه المعالجة.' },
        { h: 'المغذيات: الأمونيا والنترات والفوسفات' },
        { p: 'تبيّن الأمونيا ما إذا كانت عملية النترجة تعمل. أما النترات والفوسفات فمهمة عند تصريف المياه إلى البيئة أو إعادة استخدامها في ري المسطحات، لأنها تغذي الطحالب وقد تؤثر في المياه الجوفية.' },
        { h: 'النظافة الصحية: القولونيات وE. coli' },
        { p: 'تدل القولونيات البرازية وE. coli على فاعلية التعقيم، وهي أساسية لأي إعادة استخدام للمياه المعالجة، مثل الري.' },
        { h: 'معايير شائعة أخرى' },
        { ul: ['الأس الهيدروجيني (pH) ودرجة الحرارة', 'الزيوت والشحوم', 'الكلور المتبقي بعد التعقيم', 'المعادن، عند دخول مياه صرف صناعية إلى الشبكة'] },
        { h: 'عينة لحظية أم مركّبة؟' },
        { p: 'العينة اللحظية لقطة في لحظة واحدة، أما العينة المركّبة فتجمع عدة أجزاء على مدى فترة، غالباً 24 ساعة، فتمثل متوسط الأداء بشكل أفضل. ويحدد تصريحك أو استشاريك النوع المطلوب، ويستطيع فريقنا الميداني جمع النوعين.' },
        { tip: 'تقارن تقارير مختبر BSA كل نتيجة بالحدود السعودية المعمول بها، فترى وضع المحطة بنظرة واحدة.' },
      ],
    },
  },
  {
    slug: 'legionella-in-cooling-towers',
    date: '2026-11-10',
    readMins: 4,
    category: { en: 'Microbiology', ar: 'الأحياء الدقيقة' },
    title: {
      en: 'Legionella in cooling towers: why routine testing matters',
      ar: 'الليجيونيلا في أبراج التبريد: لماذا يهم الفحص الدوري',
    },
    excerpt: {
      en: 'Warm water, sediment and spray make cooling towers an ideal home for Legionella. Here is where the risk comes from and how a simple monitoring routine keeps it under control.',
      ar: 'الماء الدافئ والرواسب والرذاذ تجعل أبراج التبريد بيئة مثالية لبكتيريا الليجيونيلا. إليك مصدر الخطر وكيف يبقيه برنامج مراقبة بسيط تحت السيطرة.',
    },
    cover: 'images/services/legionella-cooling-tower.webp',
    related: ['legionella-cooling-tower', 'monitoring-programmes'],
    body: {
      en: [
        { p: 'Legionella bacteria live naturally in water. They become a health risk when they multiply in man-made systems and are released as fine droplets that people breathe in. In a hot climate, cooling towers that serve buildings, hospitals and industrial sites need particular attention.' },
        { h: 'Why cooling towers?' },
        { ul: [
          'The water is warm — Legionella grows best at roughly 20–45 °C.',
          'Sediment, scale and biofilm give the bacteria shelter and food.',
          'The tower creates spray and drift that can travel beyond the site.',
        ] },
        { h: 'What a monitoring routine looks like' },
        { p: 'A typical programme combines regular Legionella sampling with checks on the water treatment itself — biocide levels, temperature, and general bacteria counts. Samples are usually taken from the tower basin or the return water, in sterile bottles, and analysed by culture in the laboratory.' },
        { h: 'Reading the result' },
        { p: 'Results are reported as colony-forming units per litre (CFU/L). A rising trend matters as much as a single number: it shows that treatment is losing control before counts become high.' },
        { h: 'If the count is high' },
        { ul: ['Review the water treatment and biocide dosing.', 'Clean and disinfect the system where required.', 'Re-sample to confirm the system is back under control.'] },
        { tip: 'BSA.lab can set up a scheduled Legionella and cooling-tower programme, with sampling, analysis and reporting on a fixed calendar.' },
      ],
      ar: [
        { p: 'تعيش بكتيريا الليجيونيلا طبيعياً في الماء، لكنها تصبح خطراً صحياً عندما تتكاثر في الأنظمة المصنّعة وتنتشر في رذاذ دقيق يستنشقه الناس. وفي المناخ الحار تحتاج أبراج التبريد التي تخدم المباني والمستشفيات والمواقع الصناعية إلى اهتمام خاص.' },
        { h: 'لماذا أبراج التبريد؟' },
        { ul: [
          'الماء دافئ، وأفضل نمو لليجيونيلا يكون تقريباً بين 20 و45 °م.',
          'الرواسب والقشور والأغشية الحيوية توفر للبكتيريا مأوى وغذاء.',
          'يُنتج البرج رذاذاً قد ينتقل إلى خارج الموقع.',
        ] },
        { h: 'شكل برنامج المراقبة' },
        { p: 'يجمع البرنامج المعتاد بين أخذ عينات الليجيونيلا بانتظام وفحص معالجة المياه نفسها: مستويات المبيد الحيوي ودرجة الحرارة والعد البكتيري العام. وتؤخذ العينات عادة من حوض البرج أو مياه الرجوع في عبوات معقمة، وتُحلَّل بالزراعة في المختبر.' },
        { h: 'قراءة النتيجة' },
        { p: 'تُعطى النتائج بوحدات تكوين المستعمرات لكل لتر (CFU/L). والاتجاه المتصاعد مهم بقدر الرقم الواحد، لأنه يبيّن أن المعالجة بدأت تفقد السيطرة قبل أن ترتفع الأعداد.' },
        { h: 'إذا كان العدد مرتفعاً' },
        { ul: ['راجع معالجة المياه وجرعات المبيد الحيوي.', 'نظّف النظام وعقّمه عند الحاجة.', 'أعد أخذ العينة للتأكد من عودة النظام تحت السيطرة.'] },
        { tip: 'يستطيع مختبر BSA إعداد برنامج دوري لفحص الليجيونيلا وأبراج التبريد يشمل الجمع والتحليل والتقارير وفق جدول ثابت.' },
      ],
    },
  },
  {
    slug: 'soil-testing-before-construction-or-farming',
    date: '2026-11-03',
    readMins: 5,
    category: { en: 'Soil', ar: 'التربة' },
    title: {
      en: 'Soil testing before construction or farming: what to test',
      ar: 'تحليل التربة قبل البناء أو الزراعة: ماذا تفحص؟',
    },
    excerpt: {
      en: 'Agricultural soil and a former industrial site need very different tests. A practical guide to choosing parameters and taking soil samples that the lab can rely on.',
      ar: 'التربة الزراعية وموقع صناعي سابق يحتاجان تحاليل مختلفة تماماً. دليل عملي لاختيار المعايير وجمع عينات تربة يمكن للمختبر الاعتماد عليها.',
    },
    cover: 'images/services/soil-testing.webp',
    related: ['soil-testing', 'field-sampling'],
    body: {
      en: [
        { p: 'Soil tests answer two very different questions. For farming and landscaping: will plants grow well here? For development and site assessment: is the ground contaminated? Knowing which question you are asking decides what you should test.' },
        { h: 'For agriculture and landscaping' },
        { ul: [
          'pH — controls how available nutrients are to plants.',
          'Electrical conductivity (EC) and salinity — a key issue in many Saudi soils.',
          'Nutrients such as nitrogen, phosphorus and potassium.',
          'Sodium and related ratios, which affect soil structure and irrigation.',
        ] },
        { h: 'For contamination and site assessment' },
        { ul: [
          'Total petroleum hydrocarbons (TPH) on former fuel, workshop or industrial sites.',
          'Heavy metals such as lead, cadmium, chromium and arsenic.',
          'Other organics where the site history suggests them.',
        ] },
        { h: 'How to take a good soil sample' },
        { ul: [
          'Take several small portions across the area and mix them into one composite sample, unless you need to locate a specific hotspot.',
          'Sample at a consistent depth and remove stones, roots and debris.',
          'For general and agricultural tests, use a clean zip bag with about 1 kg of soil and keep it dry and shaded — deliver within 7 days.',
          'For oil or hydrocarbons, use a glass jar from the lab, keep it in a cool box at about 4 °C and deliver within 48 hours.',
        ] },
        { tip: 'Not sure which tests you need? Tell us the land use and site history and we will recommend a test package.' },
      ],
      ar: [
        { p: 'تجيب تحاليل التربة عن سؤالين مختلفين تماماً: للزراعة والتشجير، هل ستنمو النباتات جيداً هنا؟ وللتطوير وتقييم المواقع، هل الأرض ملوثة؟ ومعرفة سؤالك تحدد ما يجب تحليله.' },
        { h: 'للزراعة والتشجير' },
        { ul: [
          'الأس الهيدروجيني (pH)، ويتحكم في مدى إتاحة العناصر الغذائية للنبات.',
          'التوصيلية الكهربائية (EC) والملوحة، وهي قضية أساسية في كثير من ترب المملكة.',
          'العناصر الغذائية مثل النيتروجين والفوسفور والبوتاسيوم.',
          'الصوديوم والنسب المرتبطة به، وتؤثر في بنية التربة والري.',
        ] },
        { h: 'لتقييم التلوث والمواقع' },
        { ul: [
          'الهيدروكربونات البترولية الكلية (TPH) في مواقع الوقود أو الورش أو المصانع السابقة.',
          'المعادن الثقيلة مثل الرصاص والكادميوم والكروم والزرنيخ.',
          'مركبات عضوية أخرى إذا دل تاريخ الموقع عليها.',
        ] },
        { h: 'كيف تجمع عينة تربة جيدة' },
        { ul: [
          'خذ عدة أجزاء صغيرة من أنحاء المنطقة واخلطها في عينة مركّبة واحدة، إلا إذا كنت تبحث عن بقعة ملوثة محددة.',
          'اجمع العينات على عمق ثابت وأزل الحجارة والجذور والمخلفات.',
          'للتحاليل العامة والزراعية استخدم كيساً محكماً نظيفاً بنحو 1 كغ من التربة واحفظه في مكان جاف ومظلل، وسلّمه خلال 7 أيام.',
          'للزيوت والهيدروكربونات استخدم برطماناً زجاجياً من المختبر واحفظه في صندوق مبرد عند نحو 4 °م، وسلّمه خلال 48 ساعة.',
        ] },
        { tip: 'لست متأكداً من التحاليل التي تحتاجها؟ أخبرنا باستخدام الأرض وتاريخ الموقع وسنقترح لك باقة التحاليل المناسبة.' },
      ],
    },
  },
]

export const articleImage = (a: Article) => `${import.meta.env.BASE_URL}${a.cover}`
