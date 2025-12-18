import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SubLayout from './sub-layout'
import { ORDER_STEPS } from './steps'
import { useOrder } from './order-context'

type PayMethod = 'card' | 'cash' | 'qr'

function makeOrderId() {
  // kiosk sample order id (short + readable)
  const n = Date.now().toString().slice(-6)
  return `K-${n}`
}

export default function OrderPay() {
  const navigate = useNavigate()
  const { totalItems, totalAmount, setLastOrderId } = useOrder()
  const [method, setMethod] = useState<PayMethod>('card')

  useEffect(() => {
    if (totalItems === 0) navigate('/order/menu', { replace: true })
  }, [navigate, totalItems])

  const methodLabel = useMemo(() => {
    if (method === 'card') return '카드'
    if (method === 'cash') return '현금'
    return 'QR'
  }, [method])

  const pay = () => {
    const id = makeOrderId()
    setLastOrderId(id)
    navigate('/order/complete', { replace: true })
  }

  return (
    <SubLayout
      title="결제하기"
      subtitle="결제 수단을 선택해주세요"
      steps={ORDER_STEPS}
      activeStepIndex={2}
      homePath="/"
      rightPanel={
        <div className="flex h-full flex-col gap-4">
          <h2 className="font-bold">결제 요약</h2>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">선택 수단</div>
            <div className="text-xl font-bold" aria-live="polite" aria-atomic="true">
              {methodLabel}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">총 금액</div>
            <div className="text-xl font-bold" aria-live="polite" aria-atomic="true">
              {totalAmount.toLocaleString()}원
            </div>
          </Card>
          <Button type="button" size="lg" onClick={pay} disabled={totalItems === 0}>
            결제 완료(샘플)
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/order/review')}>
            내역으로
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Card className="p-4">
          <div className="font-bold">결제 수단</div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Button
              type="button"
              size="lg"
              variant={method === 'card' ? 'default' : 'secondary'}
              onClick={() => setMethod('card')}
              aria-pressed={method === 'card'}
            >
              카드
            </Button>
            <Button
              type="button"
              size="lg"
              variant={method === 'cash' ? 'default' : 'secondary'}
              onClick={() => setMethod('cash')}
              aria-pressed={method === 'cash'}
            >
              현금
            </Button>
            <Button
              type="button"
              size="lg"
              variant={method === 'qr' ? 'default' : 'secondary'}
              onClick={() => setMethod('qr')}
              aria-pressed={method === 'qr'}
            >
              QR
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-sm text-muted-foreground">안내</div>
          <div className="mt-2 leading-relaxed">
            이 화면은 <span className="font-bold">결제 UX 샘플</span>입니다. 실제 결제 연동은 되어있지 않으며, “결제 완료(샘플)”을 누르면 완료 화면으로 이동합니다.
          </div>
        </Card>
      </div>
    </SubLayout>
  )
}


