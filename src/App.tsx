import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import QuickEntry from './pages/QuickEntry'
import CompleteEntry from './pages/CompleteEntry'
import Home from './pages/Home'
import Entries from './pages/Entries'
import Budget from './pages/Budget'
import TaxReports from './pages/TaxReports'
import Settings from './pages/Settings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<QuickEntry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-entry" element={<CompleteEntry />} />

          {/* Protected routes with layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex min-h-screen bg-bg-base">
                  <Sidebar />
                  <main className="flex-1 lg:ml-60 h-screen">
                    <Routes>
                      <Route path="/home" element={<Home />} />
                      <Route path="/entries" element={<Entries />} />
                      <Route path="/budget" element={<Budget />} />
                      <Route path="/tax-reports" element={<TaxReports />} />
                      <Route path="/settings" element={<Settings />} />
                      {/* Redirect old routes to new home */}
                      <Route path="/dashboard" element={<Navigate to="/home" replace />} />
                      <Route path="/analytics" element={<Navigate to="/home" replace />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App