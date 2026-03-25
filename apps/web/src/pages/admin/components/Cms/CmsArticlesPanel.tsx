import React from 'react'
import { NoticiasPanel } from '@/pages/admin/components/Cms/NoticiasPanel'
import { CursosPanel } from '@/pages/admin/components/Cms/CursosPanel'
import { ConveniosPanel } from '@/pages/admin/components/Cms/ConveniosPanel'
import { DirectivaPanel } from '@/pages/admin/components/Cms/DirectivaPanel'
import { HitosPanel } from '@/pages/admin/components/Cms/HitosPanel'
import { ConfigPanel } from '@/pages/admin/components/Cms/ConfigPanel'

export type CmsTab = 'noticias' | 'cursos' | 'convenios' | 'directiva' | 'hitos' | 'config'

export default function CmsArticlesPanel({ externalTab = 'config' }: { externalTab?: CmsTab }) {
  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex-1 overflow-hidden relative">
        {externalTab === 'noticias' && <NoticiasPanel />}
        {externalTab === 'cursos' && <CursosPanel />}
        {externalTab === 'convenios' && <ConveniosPanel />}
        {externalTab === 'directiva' && <DirectivaPanel />}
        {externalTab === 'hitos' && <HitosPanel />}
        {externalTab === 'config' && <ConfigPanel />}
      </div>
    </div>
  )
}
