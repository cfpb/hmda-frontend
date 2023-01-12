import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  2017: [],
  v2: [
    <li key="v2-0"><Link to="/documentation/v2/ad-changes/">A&amp;D Report Changes Between 2017 and 2018</Link></li>,
    <li key="v2-1"><Link to="/documentation/v2/derived-data-fields/">Derived Data Fields</Link></li>
  ]
}

const ADReports = props => {
  const { version, inList, url } = props
    return (
      <Product
        heading="Aggregate and Disclosure Reports"
        lead="These reports summarize nationwide and MSA/MD lending activity."
        list={links[version]}
        inList={inList}
        version={version}
        url={url}
        collection="publications"
        slug="ad-reports"
      />
  )
}

export default ADReports
