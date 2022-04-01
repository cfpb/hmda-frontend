import React, { useLayoutEffect } from 'react'

export const Error = ({ text, onClick }) => {
  const err_id = 'file-error'
  useLayoutEffect(() => {
    document.getElementById(err_id).scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div id={err_id} className='error' onClick={onClick}>
      <span>{text}</span> <span className='close'>x</span>
    </div>
  )
}
