import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import KioskLayout, { type KioskStep } from './_kiosk-layout'

export default function DistributionSample() {
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
      title="유통형 샘플"
      subtitle="매장 상품 선택 → 결제까지 공통 레이아웃 예시"
      steps={steps}
      activeStepIndex={activeStepIndex}
      rightPanel={
        <div className="space-y-4">
          <h2 className="font-bold">요약</h2>
          <Card className="p-0">
            <CardHeader className="pb-4">
              <CardTitle>선택 상품</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>샘플 상품 A</span>
                <span className="font-bold">9,900원</span>
              </div>
              <div className="flex justify-between">
                <span>샘플 상품 B</span>
                <span className="font-bold">5,000원</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span>총액</span>
                <span className="font-bold">14,900원</span>
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
            <CardTitle>정보 영역</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-slate-700">
              이 영역은 사용자에게 현재 단계에서 필요한 안내(예: 프로모션, 주의사항, 선택한 카테고리)를 제공합니다.
            </p>
            <p className="text-slate-700">
              공통 UI 가이드에 따라 정보와 컨트롤은 명확히 구분하고, 불필요한 꾸밈은 최소화합니다.
            </p>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="pb-4">
            <CardTitle>컨트롤 영역</CardTitle>
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
      </div>
    </KioskLayout>
  )
}


