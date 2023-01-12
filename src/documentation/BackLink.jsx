import React from 'react'
import { Link } from 'react-router-dom'

// Show `documentation` link if TOC sidebar doesn't show up on that page
export const BackLink = ({ version, hide }) => {
  if (hide) return null

  return (
    <Link className='BackLink' to={`/documentation/${version}`}>
      {'\u2b05'} {version} DOCUMENTATION
    </Link>
  )
}
