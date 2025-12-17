import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { categories, filterMenus, menus, type CategoryId, type Menu } from '../lib/mockData'

export type KioskMode = 'light' | 'dark' | 'low-contrast'

function applyKioskModeToHtml(mode: KioskMode) {
  const el = document.documentElement
  el.classList.remove('light', 'dark', 'low-contrast')
  el.classList.add(`${mode}`)
}

interface orderProps {
  mode: KioskMode
}

const order: React.FC<orderProps> = ({ mode }) => {
  const navigate = useNavigate()
  const [cart, setCart] = useState<Menu[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all')

  useEffect(() => {
    applyKioskModeToHtml(mode)
  }, [mode])

  const filteredMenus = useMemo(() => filterMenus(menus, selectedCategory), [selectedCategory])

  const addToCart = (menu: Menu) => {
    setCart((prev) => [...prev, menu])
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: quantity } : item))
  }

  const removeFromCart = (id: number) => {
      setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0)
  const totalItems = cart.length

  const handleCheckout = () => {
    alert(`주문이 완료되었습니다!\n총 ${totalItems}개, ${totalAmount.toLocaleString()}원`)
    setCart([])
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="h-[88px] border-b-4 px-6">
        <div className="flex h-full items-center gap-4">
          <Button variant="secondary" size="lg" onClick={() => navigate('/')}>
            이전
          </Button>
          <div className="flex-1 text-center">
            <h1 className="font-bold leading-none">주문하기</h1>
            <p className="mt-1">원하시는 메뉴를 선택해주세요</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex">
        {/* 메뉴 영역 */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* 카테고리 선택 */}
          <div className="flex gap-3 mb-6">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? 'default' : 'secondary'}
                  size="lg"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </Button>
              )
            })}
          </div>

          {/* 메뉴 그리드 */}
          <div className="grid grid-cols-2 gap-6">
            {filteredMenus.map((menu) => (
              <button
                key={menu.id}
                type="button"
                onClick={() => addToCart(menu)}
                className="text-left focus-visible:outline-none"
              >
                <Card className="overflow-hidden">
                  <div className="h-[105px] w-full" aria-hidden="true" />
                  <div className="flex h-[165px] flex-col justify-between px-4 py-3">
                    <div className="min-h-0">
                      <h3 className="font-bold leading-tight">{menu.name}</h3>
                      <p className="mt-2 line-clamp-2 text-kiosk-sm leading-snug">
                        {menu.description}
                      </p>
                    </div>
                    <div className="font-bold">{menu.price.toLocaleString()}원</div>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* 장바구니 영역 */}
        <div className="w-96 border-l-4 p-6 overflow-y-auto flex flex-col">
          <h2 className="font-bold mb-6">장바구니</h2>

          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              장바구니가 비어있습니다
            </div>
          ) : (
            <div className="flex-1 space-y-4 mb-6">
              {cart.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="mb-2 font-bold">{item.name}</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                          <input type="number" value={(item as any).quantity || 0} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} />

                          <div className="min-w-[80px] text-center font-bold" aria-live="polite" aria-atomic="true">
                            {((item as any).quantity || 0)}
                          </div>

                          
                        </div>

                        <div className="font-bold">
                          {(item.price * ((item as any).quantity || 0)).toLocaleString()}원
                        </div>
                      </div>
                    </div>

                    <Button variant="secondary" size="sm" onClick={() => removeFromCart(item.id)} aria-label={`${item.name} 삭제`}>
                      삭제
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <footer className="mt-auto border-t-4 p-6">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="mb-2">
                  총 {totalItems}개
                </div>
                <div className="font-bold">
                  {totalAmount.toLocaleString()}원
                </div>
              </div>
              <Button onClick={handleCheckout} disabled={totalItems === 0} className="min-w-[200px]">
                주문하기
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default order


