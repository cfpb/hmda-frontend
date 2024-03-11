import React from 'react'

export const ValidationStatus = ({ items }) => {
  if (!items || !items.length) return null
  const { type, text } = items[0]
  return (
    <div id='validation' className={type}>
      {text}
    </div>
  )
}
