import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BellIcon, HomeIcon } from 'lucide-react'

export type KioskStep = {
  label: string
}

type KioskLayoutProps = {
  title: string
  subtitle?: string
  steps?: KioskStep[]
  activeStepIndex?: number
  children: ReactNode
  rightPanel?: ReactNode
  homePath?: string
}

export default function KioskLayout({
  title,
  subtitle,
  steps,
  activeStepIndex = 0,
  children,
  rightPanel,
  homePath = '/',
}: KioskLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col">
      <header className="h-[88px] border-b-4 px-6">
        <div className="flex h-full items-center gap-4">
          <Button variant="secondary" size="lg" onClick={() => navigate(homePath)}>
            <HomeIcon className="w-4 h-4" />
            처음으로
          </Button>
          <div className="flex-1 text-center min-w-0">
            <h1 className="font-bold leading-none truncate">{title}</h1>
            {subtitle ? <p className="mt-1 truncate">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => alert('직원 호출이 접수되었습니다.')}
            >
              <BellIcon className="w-4 h-4" />
              직원 호출
            </Button>
          </div>
        </div>
      </header>

      {steps && steps.length > 0 ? (
        <div className="border-b-4 px-6 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {steps.map((s, idx) => {
                const isActive = idx === activeStepIndex
                const isDone = idx < activeStepIndex
                return (
                  <div
                    key={`${s.label}-${idx}`}
                    className={cn(
                      'px-4 py-2 rounded-full border text-sm font-semibold',
                      isActive && 'bg-slate-900 text-white border-slate-900',
                      isDone && !isActive && 'bg-slate-100 text-slate-900 border-slate-200',
                      !isDone && !isActive && 'bg-white text-slate-500 border-slate-200'
                    )}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {idx + 1}. {s.label}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-6xl mx-auto flex gap-6 p-6">
          <main className="flex-1 overflow-y-auto">{children}</main>
          {rightPanel ? (
            <aside className="w-96 shrink-0 overflow-y-auto border-l-4 pl-6">{rightPanel}</aside>
          ) : null}
        </div>
      </div>

      <footer className="border-t-4 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate(-1)}>
              이전
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate(homePath)}>
              처음으로
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={() => alert('고대비/확대 등 접근성 기능은 샘플입니다.')}
            >
              접근성 기능
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}


