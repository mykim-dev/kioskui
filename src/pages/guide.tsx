import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'

import commonUiGuideMd from '../../docs/common-ui-guide.md?raw'
import checklistMd from '../../docs/component-accessibility-checklist.md?raw'
import guidelinesMd from '../../docs/kiosk-accessibility-guidelines.md?raw'
import kioskTypesMd from '../../docs/kiosk-types.md?raw'

type DocKey = 'guidelines' | 'kiosk-types' | 'common-ui-guide' | 'checklist'

const DOCS: Record<DocKey, { title: string; description: string; md: string }> = {
  'kiosk-types': {
    title: '키오스크 유형 가이드(유통/주문/발권/안내 및 기타)',
    description: '유형별 단말기/대표 step/샘플 화면 구성 요약',
    md: kioskTypesMd,
  },
  guidelines: {
    title: '키오스크 UI 접근성 제작 가이드',
    description: '사이즈/대비/확대·축소/키보드 등 제작 시 필수 항목 요약',
    md: guidelinesMd,
  },
  'common-ui-guide': {
    title: '공통 UI 가이드',
    description: '개요/화면 레이아웃 가이드/사용성 체크리스트 핵심 정리',
    md: commonUiGuideMd,
  },
  checklist: {
    title: '컴포넌트별 접근성 체크리스트',
    description: '버튼/카드/모달/수량조절/결제 체크 항목',
    md: checklistMd,
  },
}

export default function Guide() {
  const [docKey, setDocKey] = useState<DocKey>('kiosk-types')
  const doc = useMemo(() => DOCS[docKey], [docKey])

  return (
    <div className="w-full h-full p-6">
      <h1 className="text-3xl font-bold py-4">무인정보단말기 UI 플랫폼</h1>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{doc.title}</h2>
          <p className="text-sm text-muted-foreground">{doc.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 my-4">
      <Button
          type="button"
          onClick={() => setDocKey('kiosk-types')}
          variant={docKey === 'kiosk-types' ? 'default' : 'outline'}
          aria-pressed={docKey === 'kiosk-types'}
        >
          키오스크 유형
        </Button>
        <Button
          onClick={() => setDocKey('guidelines')}
          size="lg"
          variant={docKey === 'guidelines' ? 'default' : 'outline'}
          aria-pressed={docKey === 'guidelines'}
        >
          키오스크 UI 가이드
        </Button>
        <Button
          type="button"
          onClick={() => setDocKey('common-ui-guide')}
          variant={docKey === 'common-ui-guide' ? 'default' : 'outline'}
          aria-pressed={docKey === 'common-ui-guide'}
        >
          공통 UI 가이드
        </Button>
        <Button
          type="button"
          onClick={() => setDocKey('checklist')}
          variant={docKey === 'checklist' ? 'default' : 'outline'}
          aria-pressed={docKey === 'checklist'}
        >
          컴포넌트 체크리스트
        </Button>
      </div>

      <div className="h-[calc(100vh-16rem)] rounded-xl border p-5 overflow-auto">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold mb-4 leading-tight">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-bold mt-8 mb-3 leading-tight">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-semibold mt-6 mb-2 leading-tight">{children}</h3>
            ),
            p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            a: ({ children, href }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline underline-offset-2 hover:text-blue-800"
              >
                {children}
              </a>
            ),
            pre: ({ children }) => (
              <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-auto mb-4">
                {children}
              </pre>
            ),
            img: ({ src, alt }) => (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <img src={src as any} alt={alt ?? ''} className="max-w-full h-auto rounded-lg border my-4" />
            ),
            code: ({ children, className }) => (
              <code
                className={
                  className
                    ? className
                    : 'px-1 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-900'
                }
              >
                {children}
              </code>
            ),
            hr: () => <hr className="my-6 border-slate-200" />,
          }}
        >
          {doc.md}
        </ReactMarkdown>
      </div>
    </div>
  )
}


