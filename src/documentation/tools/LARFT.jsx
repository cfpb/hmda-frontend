import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  2017: [],
  2018: [
    <li key="2018-0"><Link to="/documentation/2018/lar-formatting/">LAR Formatting Tool</Link></li>,
  ],
  2019: [
    <li key="2019-0"><Link to="/documentation/2019/lar-formatting/">LAR Formatting Tool</Link></li>,
  ],
  2020: []
}

const LARFT = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="LAR Formatting Tool"
      lead="The LAR Formatting Tool is intended to help financial institutions, typically those with small volumes of covered loans and applications, to create an electronic file that can be submitted to the HMDA Platform."
      list={links[year]}
      inList={inList}
      year={year}
      url={url}
      collection="tools"
      slug="lar-formatting"
    />
  )
}

export default LARFT
