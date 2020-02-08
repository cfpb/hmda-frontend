/*eslint no-unused-vars: 0*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import fetchInstitution from '../actions/fetchInstitution.js'
import UserHeading from './UserHeading.jsx'
import ReadyToSign from './ReadyToSign.jsx'
import UploadForm from './upload/container.jsx'
import ErrorWarning from '../common/ErrorWarning.jsx'
import EditsContainer from './edits/container.jsx'
import ReceiptContainer from './ReceiptContainer.jsx'
import EditsNavComponent from './Nav.jsx'
import NavButtonComponent from './NavButton.jsx'
import RefileWarningComponent from '../refileWarning/index.jsx'
import submissionProgressHOC from './progressHOC.jsx'
import IRSReport from './irs/index.jsx'
import Signature from './signature/container.jsx'
import Summary from './summary/container.jsx'
import ParseErrors from './parseErrors/container.jsx'
import Loading from '../../common/LoadingIcon.jsx'
import { FAILED, PARSED_WITH_ERRORS, SIGNED } from '../constants/statusCodes.js'
import { splitYearQuarter } from '../api/utils.js'
import { afterFilingPeriod } from '../utils/date'

import './container.css'
import './table.css'

const Edits = submissionProgressHOC(EditsContainer)
const EditsNav = submissionProgressHOC(EditsNavComponent)
const NavButton = submissionProgressHOC(NavButtonComponent)
const RefileWarning = submissionProgressHOC(RefileWarningComponent)

const renderByCode = (code, page, lei, filingPeriod, isPassedQuarter) => {
  const toRender = []
  if (code === FAILED) {
    toRender.push(<RefileWarning isPassedQuarter={isPassedQuarter} />)
    return toRender
  } else {
    if (page === 'upload') {
      toRender.push(<UploadForm />)
      if (code === PARSED_WITH_ERRORS) {
        toRender.push(<ParseErrors filingPeriod={filingPeriod} />)
      }
    } else if (
      ['syntacticalvalidity', 'quality', 'macro'].indexOf(page) !== -1
    ) {
      toRender.push(<Edits />)
    } else if (page === 'submission') {
      // at the top of the page
      if (code !== SIGNED) {
        toRender.push(<ReadyToSign />)
      }
      toRender.push(<ReceiptContainer />)
      toRender.push(<IRSReport lei={lei} filingPeriod={filingPeriod}/>)
      toRender.push(<Summary filingPeriod={filingPeriod} />)

      // and just before the signature
      if (code !== SIGNED) {
        toRender.push(<ReadyToSign />)
      }
      toRender.push(<Signature />)
      toRender.push(<ReceiptContainer />)
    }
  }

  if (toRender.length === 0) {
    toRender.push(
      <p>
        Something is wrong.{' '}
        <Link to={`/filing/${filingPeriod}/institutions`}>
          Return to institutions
        </Link>
        .
      </p>
    )
  }

  toRender.push(<NavButton />)

  return toRender
}

class SubmissionContainer extends Component {
  componentDidMount() {
    // for institution name in header
    const { lei, filingPeriod } = this.props.match.params
    const filingQuarters = this.props.filingQuarters

    if (!this.props.institutions.institutions[lei]) {
      this.props.dispatch(fetchInstitution( { lei }, filingPeriod, filingQuarters, false))
    }
  }

  render() {
    if (!this.props.location) return null
    const { submission, match: {params}, location, institutions, lei, isPassedQuarter } = this.props
    const status = submission.status
    const code = status && status.code
    const page = location.pathname.split('/').slice(-1)[0]
    const institution = institutions.institutions[lei]

    const toRender = code
      ? renderByCode(code, page, lei, params.filingPeriod, isPassedQuarter)
      : [<Loading key="0" />]

    return (
      <div>
        <UserHeading
          period={params.filingPeriod}
          name={institution && institution.name ? institution.name : ''}
        />
        <EditsNav />
        <main id="main-content" className="SubmissionContainer full-width">
          {this.props.error && code !== FAILED ? (
            <ErrorWarning error={this.props.error} />
          ) : null}
          {toRender.map((component, i) => {
            return (
              <div className="usa-width-one-whole" key={i}>
                {component}
              </div>
            )
          })}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { submission, institutions, lei, error, filingPeriod } = state.app
  const { filingQuartersLate } = ownProps.config
  const isQuarterly = Boolean(splitYearQuarter(filingPeriod)[1])
  const isPassedQuarter = isQuarterly && afterFilingPeriod(filingPeriod, filingQuartersLate)

  return {
    submission,
    institutions,
    lei,
    error,
    isPassedQuarter
  }
}

SubmissionContainer.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(SubmissionContainer)
export { SubmissionContainer, mapStateToProps, renderByCode }
