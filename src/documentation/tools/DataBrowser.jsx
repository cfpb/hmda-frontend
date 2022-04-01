import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'

const links = {
  2017: [
    <li key="0">The HMDA Data Browser currently allows users to filter and download HMDA datasets for 2018 and beyond. Historic data from 2007-2017 is <a target="_blank" rel="noopener noreferrer" href="https://www.consumerfinance.gov/data-research/hmda/historic-data/">available for download here</a>.</li>,
    // <li key="1"><Link to="/documentation/2017/data-browser-filters/">Available Filters</Link></li>, // TODO: Uncomment when 2017 DB is released.
  ],
  2018: [
    <li key="1"><Link to="/documentation/2018/data-browser-faq/">Frequently Asked Questions</Link></li>,
    <li key="2"><Link to="/documentation/2018/data-browser-filters/">Available Filters</Link></li>,
    <li key="3"><Link to="/documentation/2018/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="4"><Link to="/documentation/2018/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2018-5"><Link to="/documentation/2018/data-browser-maps-faq/">Maps - Frequently Asked Questions</Link></li>,
  ],
  2019: [
    <li key="2019-1"><Link to="/documentation/2019/data-browser-faq/">Frequently Asked Questions</Link></li>,
    <li key="2019-2"><Link to="/documentation/2019/data-browser-filters/">Available Filters</Link></li>,
    <li key="2019-3"><Link to="/documentation/2019/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="2019-4"><Link to="/documentation/2019/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2019-5"><Link to="/documentation/2019/data-browser-maps-faq/">Maps - Frequently Asked Questions</Link></li>,
  ],
  2020: [
    <li key="2020-1"><Link to="/documentation/2020/data-browser-faq/">Frequently Asked Questions</Link></li>,
    <li key="2020-2"><Link to="/documentation/2020/data-browser-filters/">Available Filters</Link></li>,
    <li key="2020-3"><Link to="/documentation/2020/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="2020-4"><Link to="/documentation/2020/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2020-5"><Link to="/documentation/2020/data-browser-maps-faq/">Maps - Frequently Asked Questions</Link></li>,
  ],
  2021: [
    <li key="2021-1"><Link to="/documentation/2021/data-browser-faq/">Frequently Asked Questions</Link></li>,
    <li key="2021-2"><Link to="/documentation/2021/data-browser-filters/">Available Filters</Link></li>,
    <li key="2021-3"><Link to="/documentation/2021/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="2021-4"><Link to="/documentation/2021/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2021-5"><Link to="/documentation/2021/data-browser-maps-faq/">Maps - Frequently Asked Questions</Link></li>,
  ],
  2022: [
    <li key="2022-1"><Link to="/documentation/2022/data-browser-faq/">Frequently Asked Questions</Link></li>,
    <li key="2022-2"><Link to="/documentation/2022/data-browser-filters/">Available Filters</Link></li>,
    <li key="2022-3"><Link to="/documentation/2022/derived-data-fields/">Derived Data Fields</Link></li>,
    <li key="2022-4"><Link to="/documentation/2022/lar-data-fields/">Public HMDA Data Fields with Values and Definitions</Link></li>,
    <li key="2022-5"><Link to="/documentation/2022/data-browser-maps-faq/">Maps - Frequently Asked Questions</Link></li>,
  ]
}

const DataBrowser = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="Data Browser"
      lead="This tool allows users to filter and download HMDA datasets."
      list={links[year]}
      inList={inList}
      year={year}
      url={url}
      collection="tools"
      slug="data-browser"
    />
  )
}

export default DataBrowser
