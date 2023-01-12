import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  v1: [],
  v2: [    
    <li key="v2-0"><Link to="/documentation/v2/lar-formatting/">LAR Formatting Tool Instructions</Link></li>,
  ]
}

const LARFT = props => {
  const { version, inList, url } = props
  return (
    <Product
      heading="LAR Formatting Tool"
      lead="The LAR Formatting Tool is intended to help financial institutions, typically those with small volumes of covered loans and applications, to create an electronic file that can be submitted to the HMDA Platform."
      list={links[version]}
      inList={inList}
      version={version}
      url={url}
      collection="tools"
      slug="lar-formatting"
    />
  )
}

export default LARFT
