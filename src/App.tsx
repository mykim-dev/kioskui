import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Guide from './pages/guide'
import DistributionSample from './pages/distribution'
import InfoEtcSample from './pages/info-etc'
import OrderFlowSample from './pages/order-flow'
import Order from './pages/order'
import TicketingSample from './pages/ticketing'

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
            <Link
              to="/guide"
              className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition"
            >
              가이드(문서)
            </Link>
            <Link
              to="/samples/distribution"
              className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition"
            >
              유통 샘플
            </Link>
            <Link
              to="/samples/order"
              className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition"
            >
              주문 샘플
            </Link>
            <Link
              to="/samples/ticketing"
              className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition"
            >
              발권 샘플
            </Link>
            <Link
              to="/samples/info-etc"
              className="px-6 py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition"
            >
              안내/기타 샘플
            </Link>
          </nav>
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/order/normal" replace />} />
          <Route path="/order/normal" element={<Order mode="light" />} />
          <Route path="/order/high-contrast" element={<Order mode="dark" />} />
          <Route path="/order/low-contrast" element={<Order mode="low-contrast" />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/samples/distribution" element={<DistributionSample />} />
          <Route path="/samples/order" element={<OrderFlowSample />} />
          <Route path="/samples/ticketing" element={<TicketingSample />} />
          <Route path="/samples/info-etc" element={<InfoEtcSample />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

