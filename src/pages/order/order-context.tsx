import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { type Menu } from '@/mocks/ondemand'

export type CartItem = Menu & { quantity: number }

type OrderState = {
  cart: CartItem[]
  addMenu: (menu: Menu) => void
  setQuantity: (menuId: number, quantity: number) => void
  removeMenu: (menuId: number) => void
  clearCart: () => void
  totalItems: number
  totalAmount: number
  lastOrderId: string | null
  setLastOrderId: (id: string | null) => void
}

const OrderContext = createContext<OrderState | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [lastOrderId, setLastOrderId] = useState<string | null>(null)

  const addMenu = (menu: Menu) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === menu.id)
      if (!found) return [...prev, { ...menu, quantity: 1 }]
      return prev.map((i) => (i.id === menu.id ? { ...i, quantity: i.quantity + 1 } : i))
    })
  }

  const setQuantity = (menuId: number, quantity: number) => {
    const q = Number.isFinite(quantity) ? quantity : 0
    setCart((prev) => {
      if (q <= 0) return prev.filter((i) => i.id !== menuId)
      return prev.map((i) => (i.id === menuId ? { ...i, quantity: q } : i))
    })
  }

  const removeMenu = (menuId: number) => {
    setCart((prev) => prev.filter((i) => i.id !== menuId))
  }

  const clearCart = () => setCart([])

  const totalItems = useMemo(() => cart.reduce((acc, i) => acc + i.quantity, 0), [cart])
  const totalAmount = useMemo(() => cart.reduce((acc, i) => acc + i.price * i.quantity, 0), [cart])

  const value: OrderState = {
    cart,
    addMenu,
    setQuantity,
    removeMenu,
    clearCart,
    totalItems,
    totalAmount,
    lastOrderId,
    setLastOrderId,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within <OrderProvider>')
  return ctx
}


