import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/**
 * Enhanced ScrollToTop component that only scrolls on actual route changes,
 * ignoring query parameter updates and hash changes
 * @param {Object} props Contains children and optional configuration
 * @returns {JSX.Element} Wrapper component
 */
const ScrollToTop = (props) => {
  const location = useLocation()
  const prevPathname = useRef(location.pathname)

  useEffect(() => {
    // Don't scroll if there's a hash in the URL
    if (location.hash) return

    // Only scroll if the pathname actually changed
    // This ignores query parameter changes
    if (prevPathname.current !== location.pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      prevPathname.current = location.pathname
    }
  }, [location]) // We still watch the full location to track changes

  return <>{props.children}</>
}

export default ScrollToTop
