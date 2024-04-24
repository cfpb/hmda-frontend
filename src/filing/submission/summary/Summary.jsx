import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import fetchSummary from '../../actions/fetchSummary.js'
import { splitYearQuarter } from '../../api/utils'
import ExternalLink from '../../../common/ExternalLink'

import './Summary.css'
import { useDispatch, useSelector } from 'react-redux'

const tsSchemaLink = () => (
  <ExternalLink
    url={`/documentation/publications/loan-level-datasets/ts-data-fields`}
    text='Transmittal Sheet'
    className='dotted'
  />
)

/**
 * Component display a summary of the submitted HMDA File
 * Component can be found within the UI when viewing a completed filing
 */

const Summary = ({ filingPeriod }) => {
  const dispatch = useDispatch()
  const { isFetching, submission, ts } = useSelector(
    (state) => state.app.summary,
  )

  useEffect(() => {
    if (
      !isFetching &&
      (!submission ||
        (!Object.keys(submission).length && !Object.keys(ts).length))
    ) {
      dispatch(fetchSummary())
    }
  }, [isFetching, submission, ts])

  if (!submission || !ts) return null
  const [year, quarter] = splitYearQuarter(filingPeriod)

  return (
    <section className='Summary full-width' id='summary'>
      <header>
        <h2>HMDA Filing Summary</h2>
        <p className='font-lead'>
          You have completed the verification process for your HMDA data.
        </p>
        <p className='font-lead'>
          The values below come from your {tsSchemaLink()}, the first row of
          your LAR file.
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
            To make changes, update your Transmittal Sheet and resubmit your
            data for {filingPeriod}.
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
            <dd>{ts.institutionName}</dd>
            <dt>Respondent LEI:</dt>
            <dd>{ts.LEI}</dd>
            <dt>Tax ID:</dt>
            <dd>{ts.taxId}</dd>
            <dt>Agency:</dt>
            <dd className='text-uppercase'>{ts.agency}</dd>
            <dt>Contact Name:</dt>
            <dd>{ts.contact && ts.contact.name}</dd>
            <dt>Phone:</dt>
            <dd>{ts.contact && ts.contact.phone}</dd>
            <dt>Email</dt>
            <dd>{ts.contact && ts.contact.email}</dd>
          </dl>
        </section>
        <section className='info-section'>
          <div className='section-heading flex'>
            <h3>File Information *</h3>
            <p className='info-section-lead'>
              Filing Period details and LAR count
            </p>
          </div>
          <dl>
            <dt>File Name:</dt>
            <dd>{submission.fileName}</dd>
            <dt>Year:</dt>
            <dd>{ts.year}</dd>
            {quarter && (
              <>
                <dt>Quarter:</dt>
                <dd>{quarter}</dd>
              </>
            )}
            <dt>Total Loans/Applications:</dt>
            <dd>{ts.totalLines}</dd>
          </dl>
        </section>
      </div>

      <hr />
    </section>
  )
}

Summary.propTypes = {
  filingPeriod: PropTypes.string.isRequired,
}

export default Summary
