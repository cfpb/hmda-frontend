import React, { useState } from 'react'
import './Accordion.css'

export const Accordion = ({ header, body }) => {
  const [open, setOpen] = useState(false)
  const openClass = open ? 'open' : ''

  return (
    <div className={'accordion ' + openClass}>
      <span className='title' onClick={() => setOpen(!open)}>
        <span className='icon'>{open ? '▾' : '▸'}</span>
        <span className='text'> {header}</span>
      </span>
      <span className='body'>{body}</span>
    </div>
  )
}
