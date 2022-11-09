import React from 'react'
import { Link } from 'react-router-dom'

// Show `documentation` link if TOC sidebar doesn't show up on that page
export const BackLink = ({ year, hide }) => {
  if (hide) return null

  return (
    <Link className='BackLink' to={`/documentation/${year}`}>
      {'\u2b05'} {year} DOCUMENTATION
    </Link>
  )
}
