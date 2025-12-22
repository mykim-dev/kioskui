import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SubLayout from './sub-layout'
import { ORDER_STEPS } from './mock'
import { useOrder } from './order-context'

function ReviewSidePanel() {
  const navigate = useNavigate()
  const { totalAmount, totalItems } = useOrder()

  return (
    <div className="flex h-full flex-col gap-4">
      <h2 className="font-bold">결제 전 확인</h2>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">총 수량</div>
        <div className="text-xl font-bold" aria-live="polite" aria-atomic="true">
          {totalItems}개
        </div>
      </Card>
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">총 금액</div>
        <div className="text-xl font-bold" aria-live="polite" aria-atomic="true">
          {totalAmount.toLocaleString()}원
        </div>
      </Card>
      <Button type="button" size="lg" onClick={() => navigate('/order/pay')} disabled={totalItems === 0}>
        결제하기
      </Button>
      <Button type="button" variant="secondary" size="lg" onClick={() => navigate('/order/menu')}>
        메뉴 더 담기
      </Button>
    </div>
  )
}

export default function OrderReview() {
  const navigate = useNavigate()
  const { cart, setQuantity, removeMenu, totalItems, totalAmount } = useOrder()

  useEffect(() => {
    if (totalItems === 0) navigate('/order/menu', { replace: true })
  }, [navigate, totalItems])

  return (
    <SubLayout
      title="주문 내역 확인"
      subtitle="선택한 메뉴와 수량을 확인해주세요"
      steps={ORDER_STEPS}
      activeStepIndex={1}
      homePath="/"
      rightPanel={<ReviewSidePanel />}
    >
      <div className="space-y-4">
        {cart.length === 0 ? (
          <Card className="p-6 text-muted-foreground">장바구니가 비어있습니다.</Card>
        ) : (
          cart.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-bold">{item.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.price.toLocaleString()}원
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label={`${item.name} 수량 감소`}
                    >
                      -
                    </Button>
                    <div className="min-w-[44px] text-center font-bold" aria-live="polite" aria-atomic="true">
                      {item.quantity}
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label={`${item.name} 수량 증가`}
                    >
                      +
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeMenu(item.id)} className="ml-auto">
                      삭제
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">금액</div>
                  <div className="font-bold" aria-live="polite" aria-atomic="true">
                    {(item.price * item.quantity).toLocaleString()}원
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">총 금액</div>
            <div className="text-xl font-bold" aria-live="polite" aria-atomic="true">
              {totalAmount.toLocaleString()}원
            </div>
          </div>
        </Card>
      </div>
    </SubLayout>
  )
}


