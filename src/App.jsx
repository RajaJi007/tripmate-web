import { Outlet, NavLink } from 'react-router-dom'
import { Plane, Wallet, Users, Camera, AlertTriangle, BookText } from 'lucide-react'

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition
       ${isActive ? 'bg-black text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`
    }
  >
    <Icon size={16} />
    <span>{label}</span>
  </NavLink>
)

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-2 font-semibold">
            <Plane /> TripMate
          </div>
          <nav className="flex gap-2">
            <NavItem to="/expenses" icon={Wallet} label="Expenses" />
            <NavItem to="/planning" icon={Users} label="Planning" />
            <NavItem to="/safety" icon={AlertTriangle} label="Safety" />
            <NavItem to="/photos" icon={Camera} label="Photos" />
            <NavItem to="/logs" icon={BookText} label="Logs" />
          </nav>
        </div>
      </header>

      <main className="container py-6">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="container py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} TripMate • MVP demo
        </div>
      </footer>
    </div>
  )
}
