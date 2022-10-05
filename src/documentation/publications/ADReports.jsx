import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  2017: [],
  2018: [
    <li key="0"><Link to="/documentation/2018/ad-changes/">A&amp;D Report Changes Between 2017 and 2018</Link></li>,
    <li key="1"><Link to="/documentation/2018/derived-data-fields/">Derived Data Fields</Link></li>
  ],
  2019: [
    <li key="2019-0"><Link to="/documentation/2019/ad-changes/">A&amp;D Report Changes Between 2017 and 2018</Link></li>,
    <li key="2019-1"><Link to="/documentation/2019/derived-data-fields/">Derived Data Fields</Link></li>
  ],
  2020: [
    <li key="2020-0"><Link to="/documentation/2020/ad-changes/">A&amp;D Report Changes Between 2017 and 2018</Link></li>,
    <li key="2020-1"><Link to="/documentation/2020/derived-data-fields/">Derived Data Fields</Link></li>
  ],
  2021: [
    <li key="2021-0"><Link to="/documentation/2021/ad-changes/">A&amp;D Report Changes Between 2017 and 2018</Link></li>,
    <li key="2021-1"><Link to="/documentation/2021/derived-data-fields/">Derived Data Fields</Link></li>
  ],
  2022: [
    <li key="2022-0"><Link to="/documentation/2022/ad-changes/">A&amp;D Report Changes Between 2017 and 2018</Link></li>,
    <li key="2022-1"><Link to="/documentation/2022/derived-data-fields/">Derived Data Fields</Link></li>
  ],
  2023: [
    <li key="2023-0"><Link to="/documentation/2023/ad-changes/">A&amp;D Report Changes Between 2017 and 2018</Link></li>,
    <li key="2023-1"><Link to="/documentation/2023/derived-data-fields/">Derived Data Fields</Link></li>
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
