import { useEffect } from "react"
import { useLocation } from "react-router"

/**
 *
 * Component wraps around react-router-dom <Switch /> component
 * to allow <Link /> component to take user back to the top of a page
 * @param props acts as children
 */

const ScrollToTop = (props) => {
  const location = useLocation()
  useEffect(() => {
    const { hash } = window.location
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location])

  return <>{props.children}</>
}

export default ScrollToTop
