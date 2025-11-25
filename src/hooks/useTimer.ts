import { useState, useEffect } from 'react'

export function useTimer() {
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setElapsed(Date.now() - startTime.getTime())
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [startTime])

  const start = () => {
    setStartTime(new Date())
  }

  const pause = () => {
    setStartTime(null)
  }

  const reset = () => {
    setStartTime(null)
    setElapsed(0)
  }

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
    } else {
      return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
    }
  }

  return {
    elapsed,
    start,
    pause,
    reset,
    formattedTime: formatTime(elapsed)
  }
}