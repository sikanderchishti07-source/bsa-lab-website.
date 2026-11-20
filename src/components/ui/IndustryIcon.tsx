import { Anchor, Building2, Droplets, Factory, Flame, Hospital, Landmark, Wheat } from 'lucide-react'

const map: Record<string, typeof Anchor> = { droplets: Droplets, flame: Flame, building: Building2, factory: Factory, wheat: Wheat, hospital: Hospital, anchor: Anchor, landmark: Landmark }

export function IndustryIcon({ name, className = 'h-6 w-6' }: { name: string; className?: string }) {
  const I = map[name] ?? Factory
  return <I className={className} strokeWidth={1.7} />
}
