import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { isBeta } from '../../../common/Beta.jsx'
import DownloadIRS from './DownloadIRS.jsx'
import ExternalLink from '../../../common/ExternalLink'

import './IRSReport.css'

// IRS reports are NOT generated for quarterly filings
const IRSReport = ({ filingPeriod, lei }) => {
  if (isBeta()) return null
  const [quarter, setQuarter] = useState('')
  const quarterlyInURL = ['Q1', 'Q2', 'Q3']

  useEffect(() => {
    if (filingPeriod.split('-')) {
      setQuarter(filingPeriod.split('-')[1])
    }
  }, [filingPeriod])

  let noQuarterlyIRSReportText =
    'No IRS will be made available for quarterly HMDA submissions.'

  return (
    <section className='IRSReport'>
      <header>
        <h2>Institution Register Summary</h2>
        {quarter && quarterlyInURL.includes(quarter) ? (
          <p>{noQuarterlyIRSReportText}</p>
        ) : (
          <>
            <p className='font-lead'>
              During the {filingPeriod} filing period, the IRS will be made
              available in the HMDA Platform after signing and submitting your
              HMDA data. The IRS will not be available immediately. Please check
              back shortly after submitting your data to access your IRS.
            </p>
            <DownloadIRS period={filingPeriod} lei={lei} />
            <p className='text-small'>
              Loan amounts in the IRS are binned and disclosed in accordance
              with the 2018 HMDA data publication policy guidance. An overview
              of the policy guidance can be found in this{' '}
              <ExternalLink
                url={
                  'https://www.consumerfinance.gov/documents/7052/HMDA_Data_Disclosure_Policy_Guidance.Executive_Summary.FINAL.12212018.pdf'
                }
                text='executive summary'
              />
              .
            </p>
          </>
        )}
      </header>

      <hr />
    </section>
  )
}

IRSReport.propTypes = {
  filingPeriod: PropTypes.string,
  lei: PropTypes.string,
}

export default IRSReport
