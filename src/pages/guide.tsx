import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

import commonUiGuideMd from '../../docs/common-ui-guide.md?raw'
import checklistMd from '../../docs/component-accessibility-checklist.md?raw'
import guidelinesMd from '../../docs/kiosk-accessibility-guidelines.md?raw'

type DocKey = 'guidelines' | 'common-ui-guide' | 'checklist'

const DOCS: Record<DocKey, { title: string; description: string; md: string }> = {
  guidelines: {
    title: '키오스크 UI 접근성 제작 가이드(요약)',
    description: '사이즈/대비/확대·축소/키보드 등 제작 시 필수 항목 요약',
    md: guidelinesMd,
  },
  'common-ui-guide': {
    title: '공통 UI 가이드(요약) — kioskui.or.kr 정리',
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
  const [docKey, setDocKey] = useState<DocKey>('guidelines')

  const doc = useMemo(() => DOCS[docKey], [docKey])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">{doc.title}</h2>
          <p className="text-slate-600">{doc.description}</p>
        </div>
        <Link
          to="/order/normal"
          className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 transition"
        >
          주문 화면으로
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setDocKey('guidelines')}
          className={[
            'px-4 py-2 rounded-lg border transition',
            docKey === 'guidelines'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50',
          ].join(' ')}
          aria-pressed={docKey === 'guidelines'}
        >
          제작 가이드
        </button>
        <button
          type="button"
          onClick={() => setDocKey('common-ui-guide')}
          className={[
            'px-4 py-2 rounded-lg border transition',
            docKey === 'common-ui-guide'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50',
          ].join(' ')}
          aria-pressed={docKey === 'common-ui-guide'}
        >
          공통 UI 가이드
        </button>
        <button
          type="button"
          onClick={() => setDocKey('checklist')}
          className={[
            'px-4 py-2 rounded-lg border transition',
            docKey === 'checklist'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50',
          ].join(' ')}
          aria-pressed={docKey === 'checklist'}
        >
          컴포넌트 체크리스트
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
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


