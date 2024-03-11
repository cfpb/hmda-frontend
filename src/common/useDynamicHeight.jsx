import { useEffect, useState } from 'react'
/**
 * Adjust container height based on the longest
 * option message and the current window width.
 * @param {String} fixedHeight Static height used by parent container
 * @param {Integer} maxLength Length of longest option text, used to calculate minimum height
 * @param {Function} setCurrHeight Callback to set dynamic height
 */
export const useDynamicHeight = ({ setCurrHeight, maxLength, fixedHeight }) => {
  const [winWidth, setWinWidth] = useState(window.innerWidth)

  if (fixedHeight) return null // Skip dynamic height adjustment

  /* Debounced window resize event listener used to track window width */
  let timeout = false
  window.onresize = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => setWinWidth(window.innerWidth), 250)
  }

  /* Adjust height on window resize */
  useEffect(() => {
    // Minimum height in pixels
    const baseHeight = () => {
      if (winWidth > 675) return 50
      if (winWidth > 500) return 70
      if (winWidth > 300) return 85
      return 100
    }

    // Values derived from observation
    const multiplier = () => {
      if (winWidth > 500) return 13
      if (winWidth > 400) return 14
      if (winWidth > 300) return 15
      return 20
    }

    // Estimate how many rows the text will occupy, adding a 2 row cushion
    const estimatedRows = Math.round((maxLength / winWidth) * multiplier()) + 2

    // Calculate container height based on # rows * presumed px height of text
    const estHeight = baseHeight() + estimatedRows * 17

    // Set height in pixels
    setCurrHeight(`${estHeight}px`)
  }, [winWidth])
}
