import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import KioskLayout, { type KioskStep } from './kiosk-layout'

export default function InfoEtcSample() {
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
      title="안내 및 기타 샘플"
      subtitle="시설 안내/민원/도움 요청 등 공통 레이아웃 예시"
      steps={steps}
      activeStepIndex={activeStepIndex}
      rightPanel={
        <div className="space-y-4">
          <h2 className="font-bold">바로가기(샘플)</h2>
          <div className="grid gap-3">
            <Button size="lg" variant="secondary" onClick={() => alert('샘플: 길찾기')}>
              길찾기
            </Button>
            <Button size="lg" variant="secondary" onClick={() => alert('샘플: FAQ')}>
              자주 묻는 질문
            </Button>
            <Button size="lg" variant="secondary" onClick={() => alert('샘플: 직원 호출')}>
              직원 호출
            </Button>
          </div>
        </div>
      }
      homePath="/order/normal"
    >
      <div className="space-y-6">
        <Card className="p-0">
          <CardHeader className="pb-4">
            <CardTitle>안내 주제(샘플)</CardTitle>
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
            <Button size="lg" variant="secondary" onClick={() => alert('샘플: 공지사항')}>
              기타 안내
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
            <CardTitle>내용 영역(샘플)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-slate-700">
              안내형 화면은 “정보 전달”이 중심이므로 글자 크기/대비/불필요한 이미지 최소화/명확한 용어 사용이 핵심입니다.
            </p>
            <p className="text-slate-700">
              또한 언제든지 홈/이전으로 돌아갈 수 있고, 직원 호출 등 지원 서비스가 쉽게 노출되어야 합니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </KioskLayout>
  )
}


