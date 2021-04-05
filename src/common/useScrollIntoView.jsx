import { useRef } from 'react'

/**
 * Provides a ref and a function that will scroll to the it
 * @param {object} options for scrollIntoView
 */
export const useScrollIntoView = (options) => {
  const defaultOpts = { behavior: 'smooth', block: 'start' }
  const opts = { ...defaultOpts, ...options }
  const ref = useRef()
  const scrollToRef = (scrollOpts) =>
    ref && ref.current && ref.current.scrollIntoView({ ...opts, ...scrollOpts })
  return [ref, scrollToRef]
}
