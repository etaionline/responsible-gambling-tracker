import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface AddEntryModalProps {
  onClose: () => void
  onSuccess: () => void
  entry?: any
}

export default function AddEntryModal({ onClose, onSuccess, entry }: AddEntryModalProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    money_spent_in: entry?.money_spent_in || '',
    money_pulled_out: entry?.money_pulled_out || '',
    game_type: entry?.game_type || '',
    notes: entry?.notes || '',
    entry_date: entry?.entry_date || new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setError('')
    setLoading(true)

    try {
      const entryData = {
        user_id: user.id,
        money_spent_in: Number(formData.money_spent_in) || 0,
        money_pulled_out: Number(formData.money_pulled_out) || 0,
        game_type: formData.game_type,
        notes: formData.notes || null,
        entry_date: formData.entry_date,
      }

      if (entry?.id) {
        // Update existing entry
        const { error } = await supabase
          .from('gambling_entries')
          .update(entryData)
          .eq('id', entry.id)
          .eq('user_id', user.id)

        if (error) throw error
      } else {
        // Create new entry
        const { error } = await supabase
          .from('gambling_entries')
          .insert([entryData])

        if (error) throw error
      }

      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-elevated border border-[rgba(255,255,255,0.15)] rounded-lg w-full max-w-md shadow-glow-card-hover">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.1)]">
          <h2 className="text-h3 font-semibold text-text-primary">
            {entry ? 'Edit Entry' : 'Add Entry'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors duration-fast"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-loss/10 border border-loss rounded-md p-4">
              <p className="text-small text-loss">{error}</p>
            </div>
          )}

          {/* Money Spent In */}
          <div>
            <label htmlFor="money_spent_in" className="block text-small text-text-secondary mb-2">
              Money Spent In
            </label>
            <input
              id="money_spent_in"
              type="number"
              step="0.01"
              min="0"
              value={formData.money_spent_in}
              onChange={(e) => setFormData({ ...formData, money_spent_in: e.target.value })}
              required
              className="w-full h-12 px-4 bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-md text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 transition-all duration-fast"
              placeholder="0.00"
            />
            <p className="text-small text-text-tertiary mt-1">Amount wagered or invested</p>
          </div>

          {/* Money Pulled Out */}
          <div>
            <label htmlFor="money_pulled_out" className="block text-small text-text-secondary mb-2">
              Money Pulled Out
            </label>
            <input
              id="money_pulled_out"
              type="number"
              step="0.01"
              min="0"
              value={formData.money_pulled_out}
              onChange={(e) => setFormData({ ...formData, money_pulled_out: e.target.value })}
              required
              className="w-full h-12 px-4 bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-md text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 transition-all duration-fast"
              placeholder="0.00"
            />
            <p className="text-small text-text-tertiary mt-1">Amount won or withdrawn</p>
          </div>

          {/* Game Type */}
          <div>
            <label htmlFor="game_type" className="block text-small text-text-secondary mb-2">
              Game Type
            </label>
            <input
              id="game_type"
              type="text"
              value={formData.game_type}
              onChange={(e) => setFormData({ ...formData, game_type: e.target.value })}
              required
              className="w-full h-12 px-4 bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-md text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 transition-all duration-fast"
              placeholder="e.g., Poker, Blackjack, Slots"
            />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="entry_date" className="block text-small text-text-secondary mb-2">
              Date
            </label>
            <input
              id="entry_date"
              type="date"
              value={formData.entry_date}
              onChange={(e) => setFormData({ ...formData, entry_date: e.target.value })}
              required
              className="w-full h-12 px-4 bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-md text-body text-text-primary focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 transition-all duration-fast"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-small text-text-secondary mb-2">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-bg-elevated border border-[rgba(255,255,255,0.1)] rounded-md text-body text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/50 transition-all duration-fast resize-none"
              placeholder="Any additional notes..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-12 bg-transparent border border-[rgba(255,255,255,0.1)] text-text-secondary hover:bg-bg-hover hover:text-text-primary rounded-md transition-all duration-fast"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 bg-accent-primary hover:bg-accent-hover text-white font-semibold rounded-md transition-all duration-fast hover:shadow-glow-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : entry ? 'Update' : 'Add Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}