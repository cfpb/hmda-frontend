import React from 'react'
import ExternalLink from '../../common/ExternalLink'

function makeUrl({ year, definition }) {
  return `/documentation/${year}/data-browser-filters/#${definition}`
}

const DocLink = (props) => (
  <ExternalLink url={makeUrl(props)}>
    {props.children}
  </ExternalLink>
)

export default DocLink
