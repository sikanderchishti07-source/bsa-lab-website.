import { PageHero } from '../components/layout/PageHero'
import { site } from '../config/site'
import { useL } from '../lib/i18n-helpers'
import { useSeo } from '../hooks/useSeo'

// TODO_CONFIRM: have these texts reviewed by AECON's legal adviser before launch.
const privacy = {
  en: [
    ['Who we are', `BSA.lab (Biological System Analysis Company), a member of AECON, Riyadh, Saudi Arabia. Contact: ${site.email}.`],
    ['What we collect', 'When you request a quote, book sampling or contact us, we collect your name, company, phone number, email, project location and any files you upload. We also collect basic, anonymous usage data to improve the website.'],
    ['Why we use it', 'To respond to your request, prepare quotations, schedule sampling, issue test reports and meet our legal obligations. We do not sell your data.'],
    ['Legal basis & PDPL', 'We process personal data in line with the Saudi Personal Data Protection Law (PDPL) and its implementing regulations, based on your consent and on the need to perform a contract with you.'],
    ['Sharing', 'Data is shared only with AECON group staff and service providers who need it to deliver our services, and with authorities when required by law.'],
    ['Retention', 'We keep personal data only as long as needed for the purposes above or as required by law.'],
    ['Your rights', 'You may request access to, correction of or deletion of your personal data, and withdraw consent, by emailing us.'],
  ],
  ar: [
    ['من نحن', `شركة بيولوجيكال سيستم اناليسيس (BSA.lab)، عضو في إيكون، الرياض، المملكة العربية السعودية. للتواصل: ${site.email}.`],
    ['البيانات التي نجمعها', 'عند طلب عرض سعر أو حجز جمع العينات أو التواصل معنا، نجمع اسمك وشركتك ورقم جوالك وبريدك الإلكتروني وموقع المشروع وأي ملفات ترفعها، إضافة إلى بيانات استخدام أساسية مجهولة لتحسين الموقع.'],
    ['أسباب الاستخدام', 'للرد على طلبك، وإعداد عروض الأسعار، وجدولة جمع العينات، وإصدار تقارير التحليل، والوفاء بالتزاماتنا النظامية. لا نبيع بياناتك.'],
    ['الأساس النظامي ونظام حماية البيانات الشخصية', 'نعالج البيانات الشخصية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية ولوائحه التنفيذية، بناءً على موافقتك وحاجتنا لتنفيذ العقد معك.'],
    ['المشاركة', 'لا نشارك البيانات إلا مع موظفي مجموعة إيكون ومقدمي الخدمات الذين يحتاجونها لتقديم خدماتنا، ومع الجهات المختصة عندما يقتضي النظام ذلك.'],
    ['الاحتفاظ', 'نحتفظ بالبيانات الشخصية فقط للمدة اللازمة للأغراض المذكورة أو وفق ما يقتضيه النظام.'],
    ['حقوقك', 'يحق لك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها، وسحب موافقتك، عبر مراسلتنا بالبريد الإلكتروني.'],
  ],
}
const terms = {
  en: [
    ['Use of this website', 'This website provides general information about BSA.lab services. Content may change without notice.'],
    ['Quotations and reports', 'Quotations are valid only when issued in writing by BSA.lab. Test results relate only to the samples as received and tested.'],
    ['Samples supplied by clients', 'For walk-in samples, BSA.lab is not responsible for how the sample was collected, stored or transported before it reached the laboratory.'],
    ['Intellectual property', 'The BSA.lab name, logo and website content belong to BSA.lab / AECON and may not be reused without permission.'],
    ['Governing law', 'These terms are governed by the laws of the Kingdom of Saudi Arabia.'],
  ],
  ar: [
    ['استخدام الموقع', 'يقدم هذا الموقع معلومات عامة عن خدمات BSA.lab، وقد يتغير المحتوى دون إشعار مسبق.'],
    ['عروض الأسعار والتقارير', 'لا تكون عروض الأسعار سارية إلا إذا صدرت كتابياً من BSA.lab. تتعلق نتائج التحاليل بالعينات كما استُلمت وحُللت فقط.'],
    ['العينات المقدمة من العملاء', 'بالنسبة لعينات الحضور المباشر، لا يتحمل BSA.lab مسؤولية طريقة جمع العينة أو حفظها أو نقلها قبل وصولها إلى المختبر.'],
    ['الملكية الفكرية', 'اسم BSA.lab وشعاره ومحتوى الموقع ملك لـ BSA.lab / إيكون، ولا يجوز إعادة استخدامها دون إذن.'],
    ['النظام الحاكم', 'تخضع هذه الشروط لأنظمة المملكة العربية السعودية.'],
  ],
}

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const { t, lang } = useL()
  const title = kind === 'privacy' ? t('legal.privacyTitle') : t('legal.termsTitle')
  useSeo(t(`seo.${kind}`))
  const body = (kind === 'privacy' ? privacy : terms)[lang]
  return (
    <>
      <PageHero eyebrow="BSA.lab" title={title} sub={t('legal.updated')} crumbs={[{ label: title }]} />
      <section className="py-20">
        <div className="container max-w-3xl space-y-10">
          {body.map(([h, p], i) => (
            <div key={i}>
              <h2 className="text-xl font-bold">{i + 1}. {h}</h2>
              <p className="mt-3 leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
