import { useL } from '../../lib/i18n-helpers'

/** Small marker for content awaiting client confirmation. */
export function Pending({ className = '' }: { className?: string }) {
  const { t } = useL()
  return <span className={`inline-block rounded-full border border-dashed border-amber-400/70 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 rtl:tracking-normal ${className}`}>{t('common.pendingConfirmation')}</span>
}
