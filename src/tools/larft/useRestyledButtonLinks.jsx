import { useLayoutEffect } from 'react'

// Remove .button-link to show `Return to top` as a button
export const useRestyledButtonLinks = () => {
  useLayoutEffect(
    () => document
      .querySelectorAll('.button-link')
      .forEach(
        e => (e.className = (e.className || '').replace('button-link', ''))
      ),
    []
  )
}
