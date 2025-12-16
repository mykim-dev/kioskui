import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Order from './pages/Order'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">무인정보단말기 UI 플랫폼 - 주문형 샘플</h1>
          <nav className="flex gap-4 justify-center mb-8">
            <Link 
              to="/order/normal" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              일반 모드
            </Link>
            <Link 
              to="/order/high-contrast" 
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              고대비 모드
            </Link>
            <Link 
              to="/order/low-contrast" 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              저대비 모드
            </Link>
          </nav>
        </div>
        <Routes>
          <Route path="/order/normal" element={<Order mode="light" />} />
          <Route path="/order/high-contrast" element={<Order mode="dark" />} />
          <Route path="/order/low-contrast" element={<Order mode="low-contrast" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

