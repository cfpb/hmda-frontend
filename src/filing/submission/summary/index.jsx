import React from 'react'
import PropTypes from 'prop-types'
import { splitYearQuarter } from '../../api/utils'

import './Summary.css'

const Summary = props => {
  if (!props.submission || !props.ts) return null
  const quarter = splitYearQuarter(props.filingPeriod)[1]

  return (
    <section className="Summary full-width" id="summary">
      <header>
        <h2>HMDA Filing Summary</h2>
        <p className="font-lead">
          You have completed the verification process for your HMDA data.
        </p>
        <p className="font-lead">Please review your Respondent Information.</p>
      </header>
      <div className="info full-width">
        <section className="usa-width-one-half info-section">
          <h3>Respondent Information</h3>
          <p className='info-section-lead'>
            This information is pulled directly from the Transmittal Sheet
            (first row) of your submitted LAR file. <b><em>If changes are needed, please
            update your file's Transmittal Sheet and resubmit your data for{' '}
            {props.filingPeriod}.</em></b>
          </p>
          <dl>
            <dt>Name:</dt>
            <dd>{props.ts.institutionName}</dd>
            <dt>Respondent LEI:</dt>
            <dd>{props.ts.LEI}</dd>
            <dt>Tax ID:</dt>
            <dd>{props.ts.taxId}</dd>
            <dt>Agency:</dt>
            <dd className="text-uppercase">{props.ts.agency}</dd>
            <dt>Contact Name:</dt>
            <dd>{props.ts.contact && props.ts.contact.name}</dd>
            <dt>Phone:</dt>
            <dd>
              {props.ts.contact && props.ts.contact.phone}
            </dd>
            <dt>Email</dt>
            <dd>
              {props.ts.contact && props.ts.contact.email}
            </dd>
          </dl>
        </section>
        <section className="usa-width-one-half info-section">
          <h3>File Information</h3>
          <p className='info-section-lead'>
            This section provides a high-level summary of the data you've provided in your LAR file.
          </p>
          <dl>
            <dt>File Name:</dt>
            <dd>{props.submission.fileName}</dd>
            <dt>Year:</dt>
            <dd>{props.ts.year}</dd>
            {quarter && 
              <>
                <dt>Quarter:</dt>
                <dd>{quarter}</dd>
              </>
            }
            <dt>Total Loans/Applications:</dt>
            <dd>{props.ts.totalLines}</dd>
          </dl>
        </section>
      </div>

      <hr />
    </section>
  )
}

Summary.propTypes = {
  submission: PropTypes.object,
  ts: PropTypes.object
}

export default Summary
