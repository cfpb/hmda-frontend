import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  2017: [],
  2018: [
    <li key="2018-0"><Link to="/documentation/2018/file-format-verification/">File Format Verification Tool Instructions</Link></li>,
  ],
  2019: [
    <li key="2019-0"><Link to="/documentation/2019/file-format-verification/">File Format Verification Tool Instructions</Link></li>,
  ],
  2020: [
    <li key="2020-0"><Link to="/documentation/2020/file-format-verification/">File Format Verification Tool Instructions</Link></li>,
  ],
  2021: [
    <li key="2021-0"><Link to="/documentation/2021/file-format-verification/">File Format Verification Tool Instructions</Link></li>,
  ],
}

const FFVT = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="File Format Verification Tool"
      lead="The File Format Verification Tool (FFVT) is a resource for testing whether your file meets certain formatting requirements specified in the HMDA Filing Instructions Guide."
      list={links[year]}
      inList={inList}
      year={year}
      url={url}
      collection="tools"
      slug="file-format-verification"
    />
  )
}

export default FFVT
