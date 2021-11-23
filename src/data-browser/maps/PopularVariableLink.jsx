import React from 'react'
import ExternalLink from '../../common/ExternalLink'

export const PopularVariableLink = ({ children = 'popular variables', year }) => (
  <ExternalLink
    url={`/documentation/${year}/data-browser-filters/#action_taken`}
  >
    {children}
  </ExternalLink>
)

export default PopularVariableLink