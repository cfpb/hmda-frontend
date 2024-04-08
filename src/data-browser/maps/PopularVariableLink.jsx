import React from 'react'

export const PopularVariableLink = ({
  children = 'popular variables',
  year,
}) => (
  <a
    target='_blank'
    rel='noopener noreferrer'
    href={`/documentation/${year}/data-browser-filters/#action_taken`}
  >
    {children}
  </a>
)

export default PopularVariableLink
