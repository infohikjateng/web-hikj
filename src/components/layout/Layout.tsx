import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { RateBanner } from '../ui/RateBanner'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <RateBanner />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
