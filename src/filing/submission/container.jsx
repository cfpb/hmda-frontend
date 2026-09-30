/* eslint no-unused-vars: 0 */
import PropTypes from 'prop-types'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { isBeta } from '../../common/Beta'
import Loading from '../../common/LoadingIcon.jsx'
import fetchInstitution from '../actions/fetchInstitution.js'
import ErrorWarning from '../common/ErrorWarning.jsx'
import { FAILED, PARSED_WITH_ERRORS, SIGNED } from '../constants/statusCodes.js'
import RefileWarningComponent from '../refileWarning/index.jsx'
import { BetaAlertComplete } from './BetaAlertComplete'
import EditsContainer from './edits/container.jsx'
import IRSReport from './irs/index.jsx'
import EditsNavComponent from './Nav.jsx'
import NavButtonComponent from './NavButton.jsx'
import ParseErrors from './parseErrors/container.jsx'
import submissionProgressHOC from './progressHOC.jsx'
import ReadyToSign from './ReadyToSign.jsx'
import ReceiptContainer from './ReceiptContainer.jsx'
import Signature from './signature/Signature'
import Summary from './summary/Summary'
import UploadForm from './upload/container.jsx'
import UserHeading from './UserHeading.jsx'

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
  }
  if (page === 'upload') {
    toRender.push(<UploadForm isPassed={isPassed} />)
    if (code === PARSED_WITH_ERRORS) {
      toRender.push(<ParseErrors filingPeriod={period} />)
    }
  } else if (['syntacticalvalidity', 'quality', 'macro'].indexOf(page) !== -1) {
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
    const { status } = submission
    const code = status && status.code
    const page = location.pathname.split('/').slice(-1)[0]
    const institution = institutions.institutions[lei]
    const { selectedPeriod } = this.props

    const toRender = code
      ? renderByCode(code, page, lei, selectedPeriod)
      : [<Loading key='0' />]

    return (
      <div>
        <main id='main-content' className='SubmissionContainer full-width'>
          <nav className='usa-breadcrumb' aria-label='Breadcrumbs,,'>
            <ol className='usa-breadcrumb__list'>
              <li className='usa-breadcrumb__list-item'>
                <Link to='/' className='usa-breadcrumb__link'>
                  <span>HMDA Home</span>
                </Link>
              </li>
              <li className='usa-breadcrumb__list-item'>
                <Link to='/filing' className='usa-breadcrumb__link'>
                  <span>HMDA Filings</span>
                </Link>
              </li>
              <li
                className='usa-breadcrumb__list-item usa-current'
                aria-current='page'
              >
                <span>
                  {institution && institution.name
                    ? institution.name
                    : 'Filing'}
                </span>
              </li>
            </ol>
          </nav>
          <UserHeading
            period={selectedPeriod.period}
            name={institution && institution.name ? institution.name : ''}
          />
          <EditsNav />
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
export { mapStateToProps, renderByCode, SubmissionContainer }
