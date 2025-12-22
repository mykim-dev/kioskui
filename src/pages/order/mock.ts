import { type Step } from "./sub-layout"

export type CategoryId = "all" | "burger" | "drink" | "side"

export interface Category {
  id: CategoryId
  name: string
}

export interface Menu {
  id: number
  name: string
  description: string
  price: number
  image?: string
}

export const menus: Menu[] = [
  { id: 1, name: "불고기 버거", description: "부드러운 불고기 패티와 신선한 야채", price: 5500 },
  { id: 2, name: "치즈 버거", description: "두툼한 치즈와 고소한 패티", price: 6000 },
  { id: 3, name: "치킨 버거", description: "바삭한 치킨 패티와 특제 소스", price: 6500 },
  { id: 4, name: "새우 버거", description: "통통한 새우와 타르타르 소스", price: 7000 },
  { id: 5, name: "콜라", description: "시원한 콜라", price: 2000 },
  { id: 6, name: "사이다", description: "시원한 사이다", price: 2000 },
  { id: 7, name: "감자튀김", description: "바삭한 감자튀김", price: 3000 },
  { id: 8, name: "치즈스틱", description: "고소한 치즈스틱", price: 4000 },
]

export const categories: Category[] = [
  { id: "all", name: "전체" },
  { id: "burger", name: "버거" },
  { id: "drink", name: "음료" },
  { id: "side", name: "사이드" },
]

export function filterMenus(allMenus: Menu[], selectedCategory: CategoryId): Menu[] {
  if (selectedCategory === "all") return allMenus

  return allMenus.filter((menu) => {
    if (selectedCategory === "burger") return menu.name.includes("버거")
    if (selectedCategory === "drink") return menu.name === "콜라" || menu.name === "사이다"
    if (selectedCategory === "side") return menu.name === "감자튀김" || menu.name === "치즈스틱"
    return true
  })
}

export const ORDER_STEPS: Step[] = [
  { label: "메뉴선택" },
  { label: "내역확인" },
  { label: "결제하기" },
  { label: "완료" },
]



