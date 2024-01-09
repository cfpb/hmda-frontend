import { useEffect } from 'react'
import { useSelector } from 'react-redux'

/**
 * Enable display of popup warning when users begin navigating
 * away from the current page.
 */
export const useWarningWhenLeaving = () => {
  const hasNewChanges = useSelector(({ larft }) => larft.hasNewChanges)

  useEffect(() => {
    if (hasNewChanges) window.onbeforeunload = () => true
    else window.onbeforeunload = null

    return () => (window.onbeforeunload = null)
  }, [hasNewChanges])
}
