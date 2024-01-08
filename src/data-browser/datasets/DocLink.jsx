import React from 'react'

function makeUrl(id, definition) {
  let idFromChildren = id
  if (Array.isArray(id)) {
    idFromChildren = id[0]
  }
  idFromChildren = idFromChildren.replace(' ', '-').toLowerCase()
  return `/documentation/tools/data-browser/data-browser-filters#${idFromChildren}-${definition}`
}

const DocLink = (props) => {
  let id = props.children.props.children
  return (
    <a
      href={makeUrl(id, props.definition)}
      target='_blank'
      rel='noopener noreferrer'
    >
      {props.children}
    </a>
  )
}

export default DocLink
