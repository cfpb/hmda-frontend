import React from 'react'
import ExternalLink from '../common/ExternalLink'

const ExternalAPIs = () => {
  return (
    <ul>
      <li>
        <ExternalLink
          url='https://cfpb.github.io/hmda-platform/'
          text='HMDA APIs - Overview'
        />
      </li>
      <li>
        <ExternalLink
          url='https://cfpb.github.io/hmda-platform/#data-browser-api'
          text='HMDA Data Browser API'
        />
      </li>
      <li>
        <ExternalLink
          url='https://cfpb.github.io/hmda-platform/#hmda-filing-api'
          text='HMDA Filing API'
        />
      </li>
      <li>
        <ExternalLink
          url='https://cfpb.github.io/hmda-platform/#hmda-public-verification-api'
          text='HMDA Public Verification API'
        />
      </li>
      <li>
        <ExternalLink
          url='https://cfpb.github.io/hmda-platform/#rate-spread-rate-spread-api'
          text='HMDA Rate Spread API'
        />
      </li>
      <li>
        <ExternalLink
          url='https://cfpb.github.io/hmda-platform/#check-digit'
          text='HMDA Check Digit API'
        />
      </li>
      <li>
        <ExternalLink
          url='https://cfpb.github.io/hmda-platform/#hmda-file-serving'
          text='HMDA File Serving API'
        />
      </li>
    </ul>
  )
}

export default ExternalAPIs