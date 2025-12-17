import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import KioskLayout, { type KioskStep } from './kiosk-layout'

export default function TicketingSample() {
  const steps = useMemo<KioskStep[]>(
    () => [
      { label: '시작안내' },
      { label: '기본선택' },
      { label: '내역확인' },
      { label: '결제하기' },
      { label: '완료' },
    ],
    []
  )
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  return (
    <KioskLayout
      title="발권형 샘플"
      subtitle="발권 흐름(구간/좌석/결제/발권) 공통 레이아웃 예시"
      steps={steps}
      activeStepIndex={activeStepIndex}
      rightPanel={
        <div className="space-y-4">
          <h2 className="font-bold">선택 요약(샘플)</h2>
          <Card className="p-0">
            <CardHeader className="pb-4">
              <CardTitle>발권 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>출발</span>
                <span className="font-bold">서울</span>
              </div>
              <div className="flex justify-between">
                <span>도착</span>
                <span className="font-bold">부산</span>
              </div>
              <div className="flex justify-between">
                <span>좌석</span>
                <span className="font-bold">A-12</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span>요금</span>
                <span className="font-bold">49,000원</span>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      homePath="/order/normal"
    >
      <div className="space-y-6">
        <Card className="p-0">
          <CardHeader className="pb-4">
            <CardTitle>컨트롤(샘플)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button size="lg" onClick={() => setActiveStepIndex(0)}>
              시작안내
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(1)}>
              기본선택
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(2)}>
              내역확인
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(3)}>
              결제하기
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(4)}>
              완료
            </Button>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="pb-4">
            <CardTitle>안내(샘플)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-slate-700">
              발권형은 “진행 단계 표시”, “이전/처음으로”, “결제 중 중복 클릭 방지” 같은 사용성 요소가 특히 중요합니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </KioskLayout>
  )
}


