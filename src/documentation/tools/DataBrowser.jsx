import React from 'react'
import { Link } from 'react-router-dom'
import Product from '../Product.jsx'
import ExternalLink from '../../common/ExternalLink.jsx'

const links = {
  v1: [
    <li key='v1-0'>
      The HMDA Data Browser currently allows users to filter and download HMDA
      datasets for 2018 and beyond. Historic data from 2007-2017 is{' '}
      <ExternalLink
        url={
          'https://www.consumerfinance.gov/data-research/hmda/historic-data/'
        }
        text='available for download here'
      />
    </li>,
    // <li key="1"><Link to="/documentation/2017/data-browser-filters/">Available Filters</Link></li>, // TODO: Uncomment when 2017 DB is released.
  ],
  v2: [
    <li key='v2-1'>
      <Link to='/documentation/v2/data-browser-faq/'>
        Frequently Asked Questions
      </Link>
    </li>,
    <li key='v2-2'>
      <Link to='/documentation/v2/data-browser-filters/'>
        Available Filters
      </Link>
    </li>,
    <li key='v2-3'>
      <Link to='/documentation/v2/derived-data-fields/'>
        Derived Data Fields
      </Link>
    </li>,
    <li key='v2-4'>
      <Link to='/documentation/v2/lar-data-fields/'>
        Public HMDA Data Fields with Values and Definitions
      </Link>
    </li>,
    <li key='v2-5'>
      <Link to='/documentation/v2/data-browser-maps-faq/'>
        Maps - Frequently Asked Questions
      </Link>
    </li>,
  ],
}

const DataBrowser = props => {
  const { version, inList, url } = props
  return (
    <Product
      heading='Data Browser'
      lead='This tool allows users to filter and download HMDA datasets.'
      list={links[version]}
      inList={inList}
      version={version}
      url={url}
      collection='tools'
      slug='data-browser'
    />
  )
}

export default DataBrowser
