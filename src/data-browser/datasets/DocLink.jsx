import React from 'react'

function makeUrl(id, definition) {
  id = id.replace(' ', '-').toLowerCase()
  return `/documentation/tools/data-browser/data-browser-filters#${id}-${definition}`
}

const DocLink = props => {
  let id = props.children.props.children
  return (
    <a href={makeUrl(id, props.definition)} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}

export default DocLink
