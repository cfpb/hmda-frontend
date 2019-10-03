import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  2017: [],
  2018: [
    <li key="0"><Link to="/documentation/2018/ad-changes/">A&D Report Changes Between 2017 and 2018</Link></li>,
    <li key="1"><Link to="/documentation/2018/derived-data-fields/">Derived Data Fields</Link></li>
  ]
}

const ADReports = props => {
  const { year, inList, url } = props
    return (
      <Product
        heading="Aggregate and Disclosure Reports"
        lead="These reports summarize nationwide and MSA/MD lending activity."
        list={links[year]}
        inList={inList}
        year={year}
        url={url}
        collection="publications"
        slug="ad-reports"
      />
  )
}

export default ADReports
