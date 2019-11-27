import React from 'react'
import Product from '../Product.jsx'

const links = {
  2017: [],
  2018: [
    <li key="0"><a target="_blank" rel="noopener noreferrer" href="/tools/rate-spread/requirements">Data Requirements</a></li>,
    <li key="1"><a target="_blank" rel="noopener noreferrer" href="/tools/rate-spread/methodology">Methodology for Determining Average Prime Offer Rates</a></li>
  ],
  2019: [
    <li key="2019-0"><a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/rate-spread/requirements">Data Requirements</a></li>,
    <li key="2019-1"><a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/rate-spread/methodology">Methodology for Determining Average Prime Offer Rates</a></li>
  ],
  2020: [
    <li key="2020-0"><a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/rate-spread/requirements">Data Requirements</a></li>,
    <li key="2020-1"><a target="_blank" rel="noopener noreferrer" href="https://ffiec.cfpb.gov/tools/rate-spread/methodology">Methodology for Determining Average Prime Offer Rates</a></li>
  ]
}

const RateSpread = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading="Rate Spread"
      lead="This calculator provides rate spreads for HMDA reportable loans with a final action date on or after January 1st, 2018."
      list={links[year]}
      inList={inList}
      year={year}
      url={url}
      collection="tools"
      slug="rate-spread"
    />
  )
}

export default RateSpread
