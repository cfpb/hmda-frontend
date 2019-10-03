import React from 'react'

function makeUrl({year, definition}) {
  return `https://ffiec.cfpb.gov/documentation/${year}/data-browser-filters/#${definition}`
}

const DocLink = props => {
  return (
    <a href={makeUrl(props)} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}

export default DocLink
