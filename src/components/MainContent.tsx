import { useState } from 'react'
import { LayoutDashboard, TrendingUp } from 'lucide-react'
import DashboardView from '../pages/DashboardView'
import AnalyticsView from '../pages/AnalyticsView'

type View = 'dashboard' | 'analytics'

export default function MainContent() {
  const [activeView, setActiveView] = useState<View>('dashboard')

  const views = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics' as View, label: 'Analytics', icon: TrendingUp },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Static Top Navigation Bar */}
      <div className="sticky top-0 z-40 bg-bg-elevated border-b border-[rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-1 p-2">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center gap-2 px-6 h-12 rounded-md font-medium transition-all duration-fast ${
                activeView === view.id
                  ? 'bg-accent-primary text-white shadow-glow-accent'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              <view.icon size={20} />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Switches Views Without Page Refresh */}
      <div className="flex-1 overflow-auto">
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'analytics' && <AnalyticsView />}
      </div>
    </div>
  )
}