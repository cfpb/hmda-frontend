import React from 'react'

export const PopularVariableLink = ({ children = 'popular variable', year }) => (
  <a
    target='_blank'
    rel='noopener noreferrer'
    href={`/documentation/${year}/data-browser-filters/#action_taken`}
  >
    {children}
  </a>
)
