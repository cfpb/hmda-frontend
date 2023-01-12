import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  v1: [],
  v2: [
    <li key="v2-0"><Link to="/documentation/v2/file-format-verification/">File Format Verification Tool Instructions</Link></li>,
  ]
}

const FFVT = props => {
  const { version, inList, url } = props
  return (
    <Product
      heading="File Format Verification Tool"
      lead="The File Format Verification Tool (FFVT) is a resource for testing whether your file meets certain formatting requirements specified in the HMDA Filing Instructions Guide."
      list={links[version]}
      inList={inList}
      version={version}
      url={url}
      collection="tools"
      slug="file-format-verification"
    />
  )
}

export default FFVT
