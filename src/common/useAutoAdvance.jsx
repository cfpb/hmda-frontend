import { useState, useEffect } from 'react'
let advanceTimeout = null

/**
 * Custom hook to encapsulate logic for manually and automatically
 * cycling through a series of options.
 * @param {Integer} cycleTime Number of seconds to wait before displaying the next option, if multiple options are passed. Setting this to 0 will turn off the auto advance behavior.
 * @param {Integer} totalCount Number of available options
 * @param {Boolean} autoAdvance Enable auto-advance by default
 * @returns {Object} Values and callbacks for option navigation
 */
export const useAutoAdvance = ({
  cycleTime = 2,
  totalCount = 0,
  autoAdvance = true,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPaused, setPaused] = useState(!autoAdvance) // Auto-advance?

  const showNext = () => setCurrentIdx((currentIdx + 1) % totalCount)
  const showPrevious = () =>
    setCurrentIdx(
      currentIdx - 1 < 0 ? totalCount - 1 : (currentIdx - 1) % totalCount,
    )

  /* Automatically cycle through available options */
  useEffect(() => {
    if (isPaused) clearTimeout(advanceTimeout)
    else {
      if (totalCount < 2) return null
      const secs = parseInt(cycleTime)
      if (secs > 0) {
        advanceTimeout = setTimeout(showNext, secs * 1000)
        return () => clearTimeout(advanceTimeout)
      }
    }
  }, [currentIdx, isPaused, totalCount])

  return {
    currentIdx,
    isPaused,
    setPaused,
    showNext,
    showPrevious,
  }
}
