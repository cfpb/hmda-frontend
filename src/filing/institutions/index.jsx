import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../common/LoadingIcon.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import Institution from './Institution.jsx'
import InstitutionsHeader from './Header.jsx'
import sortInstitutions from '../utils/sortInstitutions.js'
import YearSelector from '../../common/YearSelector.jsx'
import Alert from '../../common/Alert.jsx'
import { MissingInstitutionsBanner } from './MissingInstitutionsBanner'

import './Institutions.css'

const _setSubmission = (submission, latest, filingObj) => {
  if (
    submission.id &&
    submission.id.lei === filingObj.filing.lei &&
    submission.id.period.year.toString() === filingObj.filing.period
  ) {
    return submission
  }

  return latest
}

const wrapLoading = (i = 0) => {
  return (
    <div key={i} style={{ height: '100px' }}>
      <Loading className="floatingIcon" />
    </div>
  )
}

const _whatToRender = ({ filings, institutions, submission, latestSubmissions }) => {

  // we don't have institutions yet
  if (!institutions.fetched) return wrapLoading()
  // we don't have any associated institutions
  // This is probably due to accounts from previous years

  if (Object.keys(institutions.institutions).length === 0)
    return (
      <Alert heading="No associated institutions" type="info">
        <p>
          In order to access the HMDA Platform, your institution must have a
          Legal Entity Identifier (LEI). In order to provide your{' '}
          institution&#39;s LEI, please access{' '}
          <a href="https://hmdahelp.consumerfinance.gov/accounthelp/">
            this form
          </a>{' '}
          and enter the necessary information, including your HMDA Platform
          account email address in the &#34;Additional comments&#34; text box.
          We will apply the update to your account, please check back 2 business{' '}
          days after submitting your information.
        </p>
      </Alert>
    )

  // sorted to keep the listing consistent
  const sortedInstitutions = Object.keys(institutions.institutions).sort(
    sortInstitutions
  )
  return sortedInstitutions.map((key, i) => {
    const institution = institutions.institutions[key]
    const institutionFilings = filings[institution.lei]
    const institutionSubmission = latestSubmissions[institution.lei]

    if (institution.notFound) return null

    if (
      !institutionFilings || !institutionFilings.fetched ||
      !institutionSubmission || institutionSubmission.isFetching
    ) {
      // latest submission or filings are not fetched yet
      return wrapLoading(i)
    } else {
      // we have good stuff
      const filingObj = institutionFilings.filing
      return (
        <Institution
          key={i}
          filing={filingObj.filing}
          institution={institution}
          submission={_setSubmission(submission, institutionSubmission, filingObj)}
          submissions={filingObj.submissions}
        />
      )
    }
  })
}

export default class Institutions extends Component {
  render() {
    const { error, filingPeriod, filingYears, location } = this.props
    const institutions = this.props.institutions.institutions
    let unregisteredInstitutions = []
    let leis = []

    if (this.props.institutions.fetched) {
      leis = Object.keys(institutions)
      unregisteredInstitutions = leis.filter(i => institutions[i].notFound)
    }

    return (
      <main id="main-content" className="Institutions full-width">
        {error ? <ErrorWarning error={error} /> : null}
        <div className="usa-width-one-whole">
          {filingPeriod ? (
            <InstitutionsHeader filingPeriod={filingPeriod} />
          ) : null}

          <YearSelector years={filingYears} year={filingPeriod} url={location.pathname}/>

          {_whatToRender(this.props)}

          {this.props.institutions.fetched && leis.length !== 0 
            ? ( <MissingInstitutionsBanner leis={unregisteredInstitutions} /> ) 
            : null
          }
        </div>
      </main>
    )
  }
}

Institutions.propTypes = {
  submission: PropTypes.object,
  error: PropTypes.object,
  filings: PropTypes.object,
  filingPeriod: PropTypes.string,
  institutions: PropTypes.object
}
