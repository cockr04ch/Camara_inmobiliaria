import * as Lucide from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export function getCmsIcon(name: string | undefined): LucideIcon {
  if (!name) return Lucide.FileText
  const Icon = (Lucide as unknown as Record<string, LucideIcon | undefined>)[name]
  return Icon ?? Lucide.FileText
}
