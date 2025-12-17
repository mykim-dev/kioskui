import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import KioskLayout, { type KioskStep } from './kiosk-layout'

export default function OrderFlowSample() {
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
      title="주문형 샘플"
      subtitle="주문형 화면을 공통 레이아웃으로 구성한 예시"
      steps={steps}
      activeStepIndex={activeStepIndex}
      rightPanel={
        <div className="space-y-4">
          <h2 className="font-bold">장바구니(샘플)</h2>
          <Card className="p-0">
            <CardHeader className="pb-4">
              <CardTitle>선택 항목</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>아메리카노</span>
                <span className="font-bold">4,500원</span>
              </div>
              <div className="flex justify-between">
                <span>카페라떼</span>
                <span className="font-bold">5,000원</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span>총액</span>
                <span className="font-bold">9,500원</span>
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
            <CardTitle>메뉴/옵션 영역(샘플)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button size="lg" onClick={() => alert('샘플: 메뉴 선택')}>
              메뉴 선택
            </Button>
            <Button size="lg" variant="secondary" onClick={() => alert('샘플: 옵션 선택')}>
              옵션 선택
            </Button>
            <Button size="lg" variant="secondary" onClick={() => alert('샘플: 수량 조절')}>
              수량 조절
            </Button>
            <Button size="lg" variant="secondary" onClick={() => alert('샘플: 쿠폰/할인')}>
              쿠폰/할인
            </Button>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader className="pb-4">
            <CardTitle>단계 이동(샘플)</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(0)}>
              1) 시작안내
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(1)}>
              2) 기본선택
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(2)}>
              3) 내역확인
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(3)}>
              4) 결제하기
            </Button>
            <Button size="lg" variant="secondary" onClick={() => setActiveStepIndex(4)}>
              5) 완료
            </Button>
          </CardContent>
        </Card>
      </div>
    </KioskLayout>
  )
}


