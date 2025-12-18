import { type ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) { 
  return (    
    <div className="w-screen h-screen bg-blue-50">
      {children}
    </div>
  )
}


