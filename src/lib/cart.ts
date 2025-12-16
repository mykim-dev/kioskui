import type { Menu } from './mockData'

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export function addMenuToCart(cart: CartItem[], menu: Menu): CartItem[] {
  const idx = cart.findIndex((it) => it.id === menu.id)
  if (idx === -1) return [...cart, { id: menu.id, name: menu.name, price: menu.price, quantity: 1 }]

  const next = cart.slice()
  next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 }
  return next
}

export function setCartItemQuantity(cart: CartItem[], id: number, quantity: number): CartItem[] {
  const q = Math.max(0, quantity)
  if (q === 0) return cart.filter((it) => it.id !== id)
  return cart.map((it) => (it.id === id ? { ...it, quantity: q } : it))
}

export function removeCartItem(cart: CartItem[], id: number): CartItem[] {
  return cart.filter((it) => it.id !== id)
}

export function getCartTotals(cart: CartItem[]) {
  return cart.reduce(
    (acc, it) => {
      acc.totalItems += it.quantity
      acc.totalAmount += it.price * it.quantity
      return acc
    },
    { totalItems: 0, totalAmount: 0 },
  )
}


