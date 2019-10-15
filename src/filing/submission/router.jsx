import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import SubmissionContainer from './container.jsx'
import Loading from '../common/Loading.jsx'
import fetchSubmission from '../actions/fetchSubmission.js'
import fetchEdits from '../actions/fetchEdits.js'
import refreshState from '../actions/refreshState.js'
import setLei from '../actions/setLei.js'
import {
  UNINITIALIZED,
  VALIDATING,
  SYNTACTICAL_VALIDITY_EDITS,
  NO_QUALITY_EDITS,
  QUALITY_EDITS,
  NO_MACRO_EDITS,
  MACRO_EDITS,
  VALIDATED
} from '../constants/statusCodes.js'

const editTypes = ['syntacticalvalidity', 'quality', 'macro']
const submissionRoutes = ['upload', ...editTypes, 'submission']

export class SubmissionRouter extends Component {
  componentDidMount() {
    this.renderChildren = false
    const { submission, params, dispatch } = this.props
    const status = submission.status

    if (!params.lei) {
      return this.goToAppHome()
    }

    const unmatchedId =
      submission.id && submission.id.lei !== params.lei

    if (unmatchedId) dispatch(refreshState())

    dispatch(setLei(params.lei))

    if (unmatchedId || !status || status.code === UNINITIALIZED) {
      return dispatch(fetchSubmission()).then(json => {
        if (this.editsNeeded()) {
          dispatch(fetchEdits()).then(json => {
            this.route()
          })
        } else {
          this.route()
        }
      })
    }

    if (this.editsNeeded()) {
      return dispatch(fetchEdits()).then(json => {
        this.route()
      })
    }

    this.route()
  }

  editsNeeded() {
    const { code } = this.props.submission.status
    return (
      code === SYNTACTICAL_VALIDITY_EDITS ||
      code === NO_MACRO_EDITS ||
      code === MACRO_EDITS
    )
  }

  replaceHistory(splat) {
    const { lei, filingPeriod } = this.props.params
    return browserHistory.replace(
      `/filing/${filingPeriod}/${lei}/${splat}`
    )
  }

  goToAppHome() {
    return browserHistory.replace(`/filing/${this.props.params.filingPeriod}/`)
  }

  getLatestPage() {
    const status = this.props.submission.status
    const code = status.code
    const { qualityVerified } = status

    if (code <= VALIDATING || code === NO_QUALITY_EDITS) return 'upload'
    if (code >= VALIDATED) return 'submission'
    if (code === SYNTACTICAL_VALIDITY_EDITS) return 'syntacticalvalidity'
    if (code >= QUALITY_EDITS && !qualityVerified) return 'quality'
    return 'macro'
  }

  route() {
    const status = this.props.submission.status
    const code = status.code
    const splat = this.props.params.splat
    const latest = this.getLatestPage()

    this.renderChildren = true

    if (!splat) {
      return this.replaceHistory(latest)
    }

    if (submissionRoutes.indexOf(splat) === -1) {
      return this.goToAppHome()
    }

    if (code <= VALIDATING)
      if (splat === 'upload') return this.forceUpdate()
      else return this.replaceHistory('upload')

    if (code >= VALIDATING && code <= VALIDATED) {
      if (splat === latest) return this.forceUpdate()
      else if (
        submissionRoutes.indexOf(splat) > submissionRoutes.indexOf(latest)
      ) {
        return this.replaceHistory(latest)
      }
    }

    return this.forceUpdate()
  }

  render() {
    const { submission, params } = this.props

    if (
      submission.status.code === UNINITIALIZED ||
      submission.id.lei !== params.lei ||
      !this.renderChildren ||
      !params.splat
    )
      return <Loading className="floatingIcon" />
    return <SubmissionContainer {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { submission } = state.app
  const { types } = state.app.edits

  const { params } = ownProps

  return {
    submission,
    types,
    params
  }
}

export default connect(mapStateToProps)(SubmissionRouter)
