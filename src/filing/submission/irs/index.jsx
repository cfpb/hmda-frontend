import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { isBeta } from '../../../common/Beta.jsx'
import { IRS } from '../../../common/s3/fileProxy.js'
import DownloadIRS from './DownloadIRS.jsx'
import { fetchData } from '../../api/fetch.js'

import './IRSReport.css'

// Check if IRS file exists
// TODO: Needs Proxy service to support HEAD
const checkStatusIRS = (period, lei, handleResponse) => {
  const options = {
    method: 'HEAD',
    url: IRS.buildURL(period, lei),
  }

  fetchData(options).then(data => {
    console.log('checkStatusIRS Response: ', data)
    handleResponse(data)
  })
}

const IRSReport = props => {
  const filingPeriod = props.filingPeriod
  const [irsReady, setIrsReady] = useState(false)

  useEffect(() => {
    checkStatusIRS(filingPeriod, props.lei, setIrsReady)
  }, [])

  if(isBeta()) return null
  return (
    <section className="IRSReport">
      <header>
        <h2>Institution Register Summary</h2>
        <p className="font-lead">
          During the {filingPeriod} filing period, the IRS will be made available in the
          HMDA Platform after signing and submitting your HMDA data. The IRS
          will not be available immediately. Please check back shortly after
          submitting your data to access your IRS.
        </p>
        <DownloadIRS
          period={filingPeriod}
          lei={props.lei}
          isReady={irsReady}
          setIrsReady={setIrsReady}
        />
        <p className="text-small">
          Loan amounts in the IRS are binned and disclosed in accordance
          with the 2018 HMDA data publication policy guidance. An overview
          of the policy guidance can be found in this <a href="https://www.consumerfinance.gov/documents/7052/HMDA_Data_Disclosure_Policy_Guidance.Executive_Summary.FINAL.12212018.pdf">executive summary</a>.
        </p>
      </header>

      <hr />
    </section>
  )
}

IRSReport.propTypes = {
  lei: PropTypes.string
}

export default IRSReport
