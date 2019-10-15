import React from 'react'
import PropTypes from 'prop-types'

import './Summary.css'

const Summary = props => {
  if (!props.submission || !props.ts) return null

  return (
    <section className="Summary usa-grid-full" id="summary">
      <header>
        <h2>HMDA Filing Summary</h2>
        <p className="font-lead">
          You have completed the verification process for your HMDA data. Please
          review the respondent and file information below from your HMDA file.
        </p>
      </header>
      <div className="info usa-grid-full">
        <section className="usa-width-one-half">
          <h3>Respondent Information</h3>
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
        <section className="usa-width-one-half">
          <h3>File Information</h3>
          <dl>
            <dt>File Name:</dt>
            <dd>{props.submission.fileName}</dd>
            <dt>Year:</dt>
            <dd>{props.ts.year}</dd>
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
