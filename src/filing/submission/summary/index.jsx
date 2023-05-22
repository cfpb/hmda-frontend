import React from 'react'
import PropTypes from 'prop-types'
import { splitYearQuarter } from '../../api/utils'
import ExternalLink from '../../../common/ExternalLink'

import './Summary.css'

const tsSchemaLink = () => (
  <ExternalLink
    url={`/documentation/publications/loan-level-datasets/ts-data-fields`}
    text='Transmittal Sheet'
    className='dotted'
  />
)

const Summary = props => {
  if (!props.submission || !props.ts) return null
  const [year, quarter] = splitYearQuarter(props.filingPeriod)

  return (
    <section className='Summary full-width' id='summary'>
      <header>
        <h2>HMDA Filing Summary</h2>
        <p className='font-lead'>
          You have completed the verification process for your HMDA data.
        </p>
        <p className='font-lead'>
          The values below come from your {tsSchemaLink()}, the first
          row of your LAR file.
        </p>
        <p className='emphasize'>
          Please review your Respondent Information and submit any necessary
          corrections.
        </p>
      </header>
      <div className='info'>
        <div className='note'>
          <span className='point'>*</span>
          <p className='emphasize'>
            To make changes, update your Transmittal Sheet and resubmit
            your data for {props.filingPeriod}.
          </p>
        </div>        
        <section className='info-section'>
          <div className='section-heading'>
            <h3>Respondent Information *</h3>
            <p className='info-section-lead'>
              Institution identifiers and contact details
            </p>
          </div>
          <dl>
            <dt>Name:</dt>
            <dd>{props.ts.institutionName}</dd>
            <dt>Respondent LEI:</dt>
            <dd>{props.ts.LEI}</dd>
            <dt>Tax ID:</dt>
            <dd>{props.ts.taxId}</dd>
            <dt>Agency:</dt>
            <dd className='text-uppercase'>{props.ts.agency}</dd>
            <dt>Contact Name:</dt>
            <dd>{props.ts.contact && props.ts.contact.name}</dd>
            <dt>Phone:</dt>
            <dd>{props.ts.contact && props.ts.contact.phone}</dd>
            <dt>Email</dt>
            <dd>{props.ts.contact && props.ts.contact.email}</dd>
          </dl>
        </section>
        <section className='info-section'>
          <div className='section-heading flex'>
            <h3>File Information *</h3>
            <p className='info-section-lead'>Filing Period details and LAR count</p>
          </div>
          <dl>
            <dt>File Name:</dt>
            <dd>{props.submission.fileName}</dd>
            <dt>Year:</dt>
            <dd>{props.ts.year}</dd>
            {quarter && (
              <>
                <dt>Quarter:</dt>
                <dd>{quarter}</dd>
              </>
            )}
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
