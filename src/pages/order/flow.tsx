import { Outlet } from 'react-router-dom'
import Layout from './layout'
import { OrderProvider } from './order-context'

export default function OrderFlow() {
  return (
    <Layout>
      <OrderProvider>
        <Outlet />
      </OrderProvider>
    </Layout>
  )
}


