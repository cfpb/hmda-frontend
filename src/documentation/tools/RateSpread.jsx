import React from 'react'
import Product from '../Product.jsx'
import ExternalLink from '../../common/ExternalLink.jsx'

const links = {
  2017: [],
  2018: [
    <li key='0'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='/tools/rate-spread/requirements'
      >
        Data Requirements
      </a>
    </li>,
    <li key='1'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='/tools/rate-spread/methodology'
      >
        Methodology for Determining Average Prime Offer Rates
      </a>
    </li>,
  ],
  2019: [
    <li key='2019-0'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/requirements'}
        text='Data Requirements'
      />
    </li>,
    <li key='2019-1'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/methodology'}
        text='Methodology for Determining Average Prime Offer Rates'
      />
    </li>,
  ],
  2020: [
    <li key='2020-0'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/requirements'}
        text='Data Requirements'
      />
    </li>,
    <li key='2020-1'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/methodology'}
        text='Methodology for Determining Average Prime Offer Rates'
      />
    </li>,
  ],
  2021: [
    <li key='2021-0'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/requirements'}
        text='Data Requirements'
      />
    </li>,
    <li key='2021-1'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/methodology'}
        text='Methodology for Determining Average Prime Offer Rates'
      />
    </li>,
  ],
  2022: [
    <li key='2022-0'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/requirements'}
        text='Data Requirements'
      />
    </li>,
    <li key='2022-1'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/methodology'}
        text='Methodology for Determining Average Prime Offer Rates'
      />
    </li>,
  ],
  2023: [
    <li key='2023-0'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/requirements'}
        text='Data Requirements'
      />
    </li>,
    <li key='2023-1'>
      <ExternalLink
        url={'https://ffiec.cfpb.gov/tools/rate-spread/methodology'}
        text='Methodology for Determining Average Prime Offer Rates'
      />
    </li>,
  ],
}

const RateSpread = props => {
  const { year, inList, url } = props
  return (
    <Product
      heading='Rate Spread'
      lead='This calculator provides rate spreads for HMDA reportable loans with a final action date on or after January 1st, 2018.'
      list={links[year]}
      inList={inList}
      year={year}
      url={url}
      collection='tools'
      slug='rate-spread'
    />
  )
}

export default RateSpread
