import React, { useLayoutEffect } from 'react'

/**
 * Displays a dismissable error for issues which prevent file actions
 * ex. Please create at least one LAR row before saving!
 *
 * @param {String} text Error message
 * @param {Function} onClick Handler function to close error banner
 */
export const Error = ({ text, onClick }) => {
  const err_id = 'file-error'

  useLayoutEffect(() => {
    document.getElementById(err_id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  if (!text) return null

  return (
    <div id={err_id} className='error' onClick={onClick}>
      <span>{text}</span> <span className='close'>x</span>
    </div>
  )
}
