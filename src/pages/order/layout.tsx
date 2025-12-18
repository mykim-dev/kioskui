import { type ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) { 
  return (    
    <div className="w-full h-screen mx-auto bg-blue-50">
      {children}
    </div>
  )
}


