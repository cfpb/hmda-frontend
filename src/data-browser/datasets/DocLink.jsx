import React from 'react'

function makeUrl({definition}) {
  return `/documentation/tools/data-browser/data-browser-filters#${definition}`
}

const DocLink = props => {
  return (
    <a href={makeUrl(props)} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}

export default DocLink
