import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Guide from './pages/guide'
import Order from './pages/order/list'
import OrderFlow from './pages/order/flow'
import OrderMenu from './pages/order/menu'
import OrderReview from './pages/order/review'
import OrderPay from './pages/order/pay'
import OrderComplete from './pages/order/complete'
import { Button } from './components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle } from './components/ui/drawer'
import { MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

function App() {
  const navigate = useNavigate()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/order/normal" replace />} />

        <Route path="/order" element={<OrderFlow />}>
          <Route index element={<Navigate to="menu" replace />} />
          <Route path="menu" element={<OrderMenu />} />
          <Route path="review" element={<OrderReview />} />
          <Route path="pay" element={<OrderPay />} />
          <Route path="complete" element={<OrderComplete />} />
        </Route>

        <Route path="/order/normal" element={<Order mode="light" />} />
        <Route path="/order/high-contrast" element={<Order mode="dark" />} />
        <Route path="/order/low-contrast" element={<Order mode="low-contrast" />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>

      <Button variant="outline" size="icon" onClick={() => setIsDrawerOpen(true)} className="fixed bottom-1 right-1">
        <MenuIcon className="w-4 h-4" />
        <span className="sr-only">메뉴</span>
      </Button>
      
      <Drawer direction="right" open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>샘플 목록</DrawerTitle>
            <DrawerClose asChild className="absolute top-3 right-4">
              <Button variant="outline" size="icon">
                <XIcon className="w-4 h-4" />
                <span className="sr-only">닫기</span>
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <nav className="flex flex-col gap-4 p-4">
            <Button variant="outline" size="lg" onClick={() => navigate('/guide')}>
              가이드
            </Button>            
            <Button variant="outline" size="lg" onClick={() => navigate('/order')}>
              주문 플로우(4단계)
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/order/normal')}
            >
              주문 샘플
            </Button>
          </nav>
        </DrawerContent>
      </Drawer> 
    </div>
  )
}

export default App

