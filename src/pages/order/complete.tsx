import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SubLayout from './sub-layout'
import { ORDER_STEPS } from './mock'
import { useOrder } from './order-context'

export default function OrderComplete() {
  const navigate = useNavigate()
  const { cart, totalAmount, totalItems, clearCart, lastOrderId, setLastOrderId } = useOrder()

  const safeOrderId = useMemo(() => lastOrderId ?? 'K-000000', [lastOrderId])

  const startNewOrder = () => {
    clearCart()
    setLastOrderId(null)
    navigate('/order/menu', { replace: true })
  }

  return (
    <SubLayout
      title="완료"
      subtitle="주문이 접수되었습니다"
      steps={ORDER_STEPS}
      activeStepIndex={3}
      homePath="/"
      rightPanel={
        <div className="flex h-full flex-col gap-4">
          <h2 className="font-bold">다음</h2>
          <Button type="button" size="lg" onClick={startNewOrder}>
            새 주문 시작
          </Button>
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/')}>
            홈으로
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground">주문번호</div>
          <div className="mt-2 text-3xl font-black tracking-tight" aria-live="polite" aria-atomic="true">
            {safeOrderId}
          </div>
        </Card>

        <Card className="p-6">
          <div className="font-bold">주문 요약</div>
          <div className="mt-2 text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            총 {totalItems}개 · {totalAmount.toLocaleString()}원
          </div>
          <div className="mt-4 space-y-2">
            {cart.length === 0 ? (
              <div className="text-muted-foreground">내역이 없습니다. (샘플 화면)</div>
            ) : (
              cart.map((i) => (
                <div key={i.id} className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {i.quantity}개 · {(i.price * i.quantity).toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </SubLayout>
  )
}


