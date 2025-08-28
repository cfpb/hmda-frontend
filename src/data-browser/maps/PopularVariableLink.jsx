import React from 'react'

export function PopularVariableLink({ children = 'popular variables', year }) {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={`/documentation/${year}/data-browser-filters/#action_taken`}
    >
      {children}
    </a>
  )
}

export default PopularVariableLink
