import React from 'react'
import Product from '../Product.jsx'

const links = {
  2017: [],
  v2: [
    <li key='v2-0'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='/tools/rate-spread/requirements'
      >
        Data Requirements
      </a>
    </li>,
    <li key='v2-1'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='/tools/rate-spread/methodology'
      >
        Methodology for Determining Average Prime Offer Rates
      </a>
    </li>,
  ],
}

const RateSpread = props => {
  const { version, inList, url } = props
  return (
    <Product
      heading='Rate Spread'
      lead='This calculator provides rate spreads for HMDA reportable loans with a final action date on or after January 1st, 2018.'
      list={links[version]}
      inList={inList}
      version={version}
      url={url}
      collection='tools'
      slug='rate-spread'
    />
  )
}

export default RateSpread
