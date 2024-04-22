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
import Signature from './signature/Signature'
import Summary from './summary/Summary'
import ParseErrors from './parseErrors/container.jsx'
import Loading from '../../common/LoadingIcon.jsx'
import { FAILED, PARSED_WITH_ERRORS, SIGNED } from '../constants/statusCodes.js'
import { isBeta } from '../../common/Beta'
import { BetaAlertComplete } from './BetaAlertComplete'

import './container.css'
import './table.css'

const Edits = submissionProgressHOC(EditsContainer)
const EditsNav = submissionProgressHOC(EditsNavComponent)
const NavButton = submissionProgressHOC(NavButtonComponent)
const RefileWarning = submissionProgressHOC(RefileWarningComponent)

const renderByCode = (code, page, lei, selectedPeriod) => {
  const { period, isPassed } = selectedPeriod
  const toRender = []

  if (code === FAILED) {
    toRender.push(<RefileWarning isPassed={isPassed} />)
    return toRender
  } else {
    if (page === 'upload') {
      toRender.push(<UploadForm isPassed={isPassed} />)
      if (code === PARSED_WITH_ERRORS) {
        toRender.push(<ParseErrors filingPeriod={period} />)
      }
    } else if (
      ['syntacticalvalidity', 'quality', 'macro'].indexOf(page) !== -1
    ) {
      toRender.push(<Edits isPassed={isPassed} lei={lei} />)
    } else if (page === 'submission') {
      if (isBeta()) {
        toRender.push(<BetaAlertComplete filingPeriod={period} />)
        toRender.push(<Summary filingPeriod={period} />)
        toRender.push(<BetaAlertComplete filingPeriod={period} />)
      } else {
        // at the top of the page
        if (code !== SIGNED) toRender.push(<ReadyToSign isPassed={isPassed} />)

        toRender.push(<ReceiptContainer />)
        toRender.push(<IRSReport lei={lei} filingPeriod={period} />)
        toRender.push(<Summary filingPeriod={period} />)

        // and just before the signature
        if (code !== SIGNED) {
          toRender.push(<ReadyToSign isPassed={isPassed} />)
        }
        toRender.push(<Signature lei={lei} isPassed={isPassed} />)
        toRender.push(<ReceiptContainer />)
      }
    }
  }

  if (toRender.length === 0) {
    toRender.push(
      <p>
        Something is wrong.{' '}
        <Link to={`/filing/${period}/institutions`}>
          Return to institutions
        </Link>
        .
      </p>,
    )
  }

  toRender.push(<NavButton />)

  return toRender
}

class SubmissionContainer extends Component {
  componentDidMount() {
    // for institution name in header
    const { lei } = this.props.match.params
    const { selectedPeriod } = this.props

    if (!this.props.institutions.institutions[lei]) {
      this.props.dispatch(fetchInstitution({ lei }, selectedPeriod, false))
    }
  }

  render() {
    if (!this.props.location) return null
    const { submission, location, institutions, lei } = this.props
    const status = submission.status
    const code = status && status.code
    const page = location.pathname.split('/').slice(-1)[0]
    const institution = institutions.institutions[lei]
    const { selectedPeriod } = this.props

    const toRender = code
      ? renderByCode(code, page, lei, selectedPeriod)
      : [<Loading key='0' />]

    return (
      <div>
        <UserHeading
          period={selectedPeriod.period}
          name={institution && institution.name ? institution.name : ''}
        />
        <EditsNav />
        <main id='main-content' className='SubmissionContainer full-width'>
          {this.props.error && code !== FAILED ? (
            <ErrorWarning error={this.props.error} />
          ) : null}
          {toRender.map((component, i) => {
            return (
              <div className='usa-width-one-whole' key={i}>
                {component}
              </div>
            )
          })}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state, _ownProps) {
  const { submission, institutions, lei, error } = state.app

  return {
    submission,
    institutions,
    lei,
    error,
  }
}

SubmissionContainer.propTypes = {
  match: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(SubmissionContainer)
export { SubmissionContainer, mapStateToProps, renderByCode }
