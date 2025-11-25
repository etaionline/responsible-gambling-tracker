import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { TrendingUp, AlertCircle, Target } from 'lucide-react'

interface Budget {
  id: string
  monthly_limit: number
  current_month_spent: number
  alert_threshold: number
}

export default function BudgetWidget() {
  const { user } = useAuth()
  const [budget, setBudget] = useState<Budget | null>(null)
  const [showSetup, setShowSetup] = useState(false)
  const [monthlyLimit, setMonthlyLimit] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadBudget()
    }
  }, [user])

  const loadBudget = async () => {
    if (!user) return

    try {
      // Get budget - use maybeSingle() to avoid 406 errors when no row exists
      const { data: budgetData, error: budgetError } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (budgetError) throw budgetError

      if (!budgetData) {
        setShowSetup(true)
        setLoading(false)
        return
      }

      // Calculate current month spent
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { data: entries, error: entriesError } = await supabase
        .from('gambling_entries')
        .select('money_spent_in')
        .eq('user_id', user.id)
        .gte('entry_date', startOfMonth.toISOString())

      if (entriesError) throw entriesError

      const monthSpent = entries?.reduce((sum, e) => sum + Number(e.money_spent_in), 0) || 0

      setBudget({
        ...budgetData,
        current_month_spent: monthSpent
      })
    } catch (error) {
      console.error('Error loading budget:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveBudget = async () => {
    if (!user || !monthlyLimit) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('budgets')
        .upsert({
          user_id: user.id,
          monthly_limit: parseFloat(monthlyLimit),
          alert_threshold: 80,
        })

      if (error) throw error

      await loadBudget()
      setShowSetup(false)
    } catch (error) {
      console.error('Error saving budget:', error)
      alert('Failed to save budget')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-lg p-6">
        <div className="flex items-center justify-center h-32">
          <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (showSetup || !budget) {
    return (
      <div className="bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target size={24} className="text-accent-primary" />
          <h2 className="text-h3 font-semibold text-text-primary">Set Your Budget</h2>
        </div>
        <p className="text-body text-text-secondary mb-4">
          Set a monthly gambling budget to track your spending and stay in control.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-small text-text-secondary mb-2">Monthly Limit</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-tertiary">
                $
              </div>
              <input
                type="number"
                step="0.01"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value)}
                placeholder="500.00"
                className="w-full h-12 pl-10 pr-4 bg-bg-hover border border-[rgba(255,255,255,0.1)] rounded-md text-body font-mono text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 transition-all"
              />
            </div>
          </div>
          <button
            onClick={handleSaveBudget}
            disabled={!monthlyLimit}
            className="w-full h-12 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-md transition-all duration-fast hover:shadow-glow-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Set Budget
          </button>
        </div>
      </div>
    )
  }

  const percentUsed = (budget.current_month_spent / budget.monthly_limit) * 100
  const isOverBudget = percentUsed >= 100
  const isNearLimit = percentUsed >= budget.alert_threshold && percentUsed < 100

  return (
    <div className={`bg-bg-elevated border rounded-lg p-6 ${isOverBudget ? 'border-loss shadow-glow-loss' : isNearLimit ? 'border-warning' : 'border-[rgba(255,255,255,0.1)]'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Target size={24} className="text-accent-primary" />
          <h2 className="text-h3 font-semibold text-text-primary">Monthly Budget</h2>
        </div>
        <button
          onClick={() => setShowSetup(true)}
          className="text-small text-accent-primary hover:text-accent-hover transition-colors"
        >
          Edit
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-body text-text-secondary">
            ${budget.current_month_spent.toFixed(2)} spent
          </span>
          <span className="text-body text-text-secondary">
            ${budget.monthly_limit.toFixed(2)} limit
          </span>
        </div>
        <div className="w-full h-3 bg-bg-hover rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${isOverBudget ? 'bg-loss' : isNearLimit ? 'bg-warning' : 'bg-profit'}`}
            style={{ width: `${Math.min(percentUsed, 100)}%` }}
          ></div>
        </div>
        <p className="text-small text-text-tertiary mt-2">
          {percentUsed.toFixed(1)}% of monthly budget used
        </p>
      </div>

      {/* Alerts */}
      {isOverBudget && (
        <div className="flex items-start gap-2 p-3 bg-loss/10 border border-loss/30 rounded-md">
          <AlertCircle size={16} className="text-loss mt-0.5" />
          <div>
            <p className="text-small font-semibold text-loss">Over Budget</p>
            <p className="text-xs text-text-tertiary mt-1">
              You've exceeded your monthly limit by ${(budget.current_month_spent - budget.monthly_limit).toFixed(2)}
            </p>
          </div>
        </div>
      )}

      {isNearLimit && !isOverBudget && (
        <div className="flex items-start gap-2 p-3 bg-warning/10 border border-warning/30 rounded-md">
          <TrendingUp size={16} className="text-warning mt-0.5" />
          <div>
            <p className="text-small font-semibold text-warning">Approaching Limit</p>
            <p className="text-xs text-text-tertiary mt-1">
              You have ${(budget.monthly_limit - budget.current_month_spent).toFixed(2)} remaining
            </p>
          </div>
        </div>
      )}

      {!isNearLimit && !isOverBudget && (
        <div className="flex items-start gap-2 p-3 bg-profit/10 border border-profit/30 rounded-md">
          <Target size={16} className="text-profit mt-0.5" />
          <div>
            <p className="text-small font-semibold text-profit">On Track</p>
            <p className="text-xs text-text-tertiary mt-1">
              You have ${(budget.monthly_limit - budget.current_month_spent).toFixed(2)} remaining this month
            </p>
          </div>
        </div>
      )}
    </div>
  )
}