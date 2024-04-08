import { useLayoutEffect } from 'react'

/**
 * Remove .button-link to show `Return to top` as a button
 */
export const useRestyledButtonLinks = () => {
  useLayoutEffect(
    () =>
      document
        .querySelectorAll('.button-link')
        .forEach((e) => updateClassName(e)),
    [],
  )
}

const updateClassName = (element) => {
  const name = element.className || ''
  const adjustedName = name.replace('button-link', '')
  element.className = adjustedName
}
