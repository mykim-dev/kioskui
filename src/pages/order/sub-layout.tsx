import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { BellIcon, HomeIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export type Step = {
  label: string
}

type SubLayoutProps = {
  title: string
  subtitle?: string
  steps?: Step[]
  activeStepIndex?: number
  children: ReactNode
  rightPanel?: ReactNode
  homePath?: string
}

export default function SubLayout({
  title,
  subtitle,
  steps,
  activeStepIndex = 0,
  children,
  rightPanel,
  homePath = '/',
}: SubLayoutProps) {
  const navigate = useNavigate()
  const [isA11yDialogOpen, setIsA11yDialogOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    const prev = document.body.style.zoom
    document.body.style.zoom = String(zoomLevel)
    return () => {
      document.body.style.zoom = prev
    }
  }, [zoomLevel])

  const ZOOM_STEP = 0.2
  const ZOOM_MIN = 0.8
  const ZOOM_MAX = 2

  const zoomIn = () => {
    setZoomLevel((z) => Math.min(ZOOM_MAX, Math.round((z + ZOOM_STEP) * 10) / 10))
  }

  const zoomOut = () => {
    setZoomLevel((z) => Math.max(ZOOM_MIN, Math.round((z - ZOOM_STEP) * 10) / 10))
  }

  return (
    <div className="w-full h-screen mx-auto bg-amber-50">
      <header className="h-[90px] border">
        <div className="flex h-full items-center gap-4 p-6">
          <Button variant="secondary" size="lg" onClick={() => navigate(homePath)}>
            <HomeIcon className="w-4 h-4" />
            처음으로
          </Button>
          <div className="flex-1 text-center space-y-1">
            <h1 className="text-xl font-bold">{title}</h1>
            {subtitle ? <p className="text-sm text-muted-foreground truncate">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-4">
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
        <section className="h-[90px] border">
          <div className="flex gap-4 p-6">
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
                    !isDone && !isActive && 'bg-background text-slate-500 border-slate-200'
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {idx + 1}. {s.label}
                </div>
              )
            })}
          </div>
        </section>
      ) : null}

      <section className="h-[calc(100vh-270px)] border">
        <div className="h-full grid grid-cols-[3fr_1fr]">
          <main className="flex-1 p-6">
            <ScrollArea className="h-[calc(100vh-270px)] border border-red-500">
              {children}
            </ScrollArea>
          </main>
          {rightPanel ? (
            <aside className="p-6 border-l-2">
              <ScrollArea className="h-[calc(100vh-270px)] border border-green-500">
              {rightPanel}
              </ScrollArea>
            </aside>
          ) : null}
        </div>
      </section>

      <footer className="h-[90px] border">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate(-1)}>
              이전
            </Button>
            <Button type="button" variant="secondary" size="lg" onClick={() => navigate(homePath)}>
              처음으로
            </Button>
          </div>
          <Button type="button" variant="secondary" size="lg" onClick={() => setIsA11yDialogOpen(true)}>
            접근성 기능
          </Button>
        </div>
      </footer>

      <Dialog open={isA11yDialogOpen} onOpenChange={setIsA11yDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>안내</DialogTitle>
            <DialogDescription>
              고대비/확대 등 접근성 기능은 샘플입니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/order/normal')}
            >
              일반 모드
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/order/high-contrast')}
            >
              고대비 모드
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/order/low-contrast')}
            >
              저대비 모드
            </Button>
            <Button
              variant="outline"
              size="lg"              
              onClick={zoomIn}
              disabled={zoomLevel >= ZOOM_MAX}
            >
              <ZoomInIcon className="w-4 h-4" />
              확대 ({Math.round(zoomLevel * 100)}%)
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={zoomOut}
              disabled={zoomLevel <= ZOOM_MIN}
            >
              <ZoomOutIcon className="w-4 h-4" />
              축소
            </Button>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              size="lg"
              onClick={() => setIsA11yDialogOpen(false)}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


