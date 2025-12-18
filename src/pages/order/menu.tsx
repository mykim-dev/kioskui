import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { categories, filterMenus, menus, type CategoryId, type Menu } from '@/mocks/ondemand'
import SubLayout from './sub-layout'
import { ORDER_STEPS } from './steps'
import { useOrder } from './order-context'

function CartPanel() {
  const navigate = useNavigate()
  const { cart, totalAmount, totalItems, setQuantity, removeMenu } = useOrder()

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">장바구니</h2>
        <div className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
          총 {totalItems}개
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 grid place-items-center text-muted-foreground">선택한 메뉴가 없습니다.</div>
      ) : (
        <div className="flex-1 space-y-3">
          {cart.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold">{item.name}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.price.toLocaleString()}원 · 수량 {item.quantity}
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
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMenu(item.id)}
                      className="ml-auto"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">합계</div>
            <div className="text-xl font-bold" aria-live="polite" aria-atomic="true">
              {totalAmount.toLocaleString()}원
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            onClick={() => navigate('/order/review')}
            disabled={totalItems === 0}
          >
            내역 확인
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function OrderMenu() {
  const { addMenu } = useOrder()
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all')

  const filteredMenus = useMemo(() => filterMenus(menus, selectedCategory), [selectedCategory])

  const onSelectMenu = (menu: Menu) => {
    addMenu(menu)
  }

  return (
    <SubLayout
      title="주문하기"
      subtitle="원하시는 메뉴를 선택해주세요"
      steps={ORDER_STEPS}
      activeStepIndex={0}
      homePath="/"
      rightPanel={<CartPanel />}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id
            return (
              <Button
                key={category.id}
                type="button"
                variant={isSelected ? 'default' : 'secondary'}
                size="lg"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={isSelected}
              >
                {category.name}
              </Button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {filteredMenus.map((menu) => (
            <button
              key={menu.id}
              type="button"
              onClick={() => onSelectMenu(menu)}
              className="text-left focus-visible:outline-none"
            >
              <Card className="overflow-hidden">
                <div className="h-[105px] w-full bg-slate-200" aria-hidden="true" />
                <div className="flex h-[165px] flex-col justify-between px-4 py-3">
                  <div className="min-h-0">
                    <h3 className="font-bold leading-tight">{menu.name}</h3>
                    <p className="mt-2 line-clamp-2 text-kiosk-sm leading-snug">{menu.description}</p>
                  </div>
                  <div className="font-bold">{menu.price.toLocaleString()}원</div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      </div>
    </SubLayout>
  )
}


