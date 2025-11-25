import { NavLink } from 'react-router-dom'
import { 
  ListPlus, 
  PiggyBank, 
  FileText, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

export default function Sidebar() {
  const { signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Main navigation items - Removed Dashboard and Analytics as they're in top nav
  const mainNavItems = [
    { to: '/home', icon: ListPlus, label: 'Home' },
    { to: '/entries', icon: ListPlus, label: 'Entries' },
    { to: '/budget', icon: PiggyBank, label: 'Budget & Goals' },
  ]

  // Bottom navigation items (lower priority)
  const bottomNavItems = [
    { to: '/tax-reports', icon: FileText, label: 'Tax Reports' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-md flex items-center justify-center text-text-primary hover:bg-bg-hover transition-colors duration-fast"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-60 bg-bg-pure-black border-r border-[rgba(255,255,255,0.1)] flex flex-col z-40 transition-transform duration-slow lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[rgba(255,255,255,0.1)]">
          <h1 className="text-h3 font-display font-bold text-text-primary">
            Tracker
          </h1>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 h-12 rounded-md text-body transition-all duration-fast ${
                  isActive
                    ? 'bg-bg-hover text-text-primary border-l-3 border-accent-primary'
                    : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Navigation - Tax Reports & Settings */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.1)] space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 h-10 rounded-md text-small transition-all duration-fast ${
                  isActive
                    ? 'bg-bg-hover text-text-primary'
                    : 'text-text-tertiary hover:bg-bg-hover hover:text-text-secondary'
                }`
              }
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          {/* Sign out button */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 h-10 rounded-md text-small text-text-tertiary hover:bg-bg-hover hover:text-loss transition-all duration-fast mt-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}