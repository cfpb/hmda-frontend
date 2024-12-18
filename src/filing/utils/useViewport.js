import { useState, useEffect } from 'react'

export const useViewport = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425)

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobile(window.innerWidth <= 425)
    }

    // Add event listener
    window.addEventListener('resize', handleWindowResize)

    // Call handler right away so state gets updated with initial window size
    handleWindowResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return { isMobile }
}
