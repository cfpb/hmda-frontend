import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import equal from 'fast-deep-equal'
import SubmissionContainer from './container.jsx'
import Loading from '../../common/LoadingIcon.jsx'
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
  VALIDATED,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  SIGNED,
} from '../constants/statusCodes.js'

const editTypes = ['syntacticalvalidity', 'quality', 'macro']
const submissionRoutes = ['upload', ...editTypes, 'submission']

export class SubmissionRouter extends Component {
  state = {
    isLoading: true,
  }

  componentDidUpdate(prev) {
    if (!equal(this.props, prev)) this.guardRouting()
  }

  componentDidMount() {
    this.guardRouting()
  }

  guardRouting() {
    this.renderChildren = false
    const {
      submission,
      refiling,
      edits,
      lei,
      match: { params },
      dispatch,
    } = this.props
    const status = submission.status
    const [filingYear, filingQuarter] = params.filingPeriod.split('-')
    // eslint-disable-next-line
    const wrongPeriod =
      !submission.id ||
      +submission.id.period.year !== +filingYear ||
      submission.id.period.quarter != filingQuarter

    if (!params.lei) {
      return this.goToAppHome()
    }

    const unmatchedId = submission.id && submission.id.lei !== params.lei

    if (unmatchedId) dispatch(refreshState())
    if (!lei || lei !== params.lei) return dispatch(setLei(params.lei))

    if (refiling || submission.isFetching) return

    if (
      unmatchedId ||
      !status ||
      status.code === UNINITIALIZED ||
      wrongPeriod
    ) {
      this.setState({ isLoading: true }, () => {
        dispatch(fetchSubmission())
          .then(() => {
            if (this.editsNeeded()) {
              if (!edits.fetched && !edits.isFetching) {
                return dispatch(fetchEdits())
              }
            }
          })
          .then(() => {
            this.setState({ isLoading: false }, () => {
              this.route()
            })
          })
      })
      return
    }

    if (status.code !== UNINITIALIZED) {
      this.setState({ isLoading: false }, () => {
        this.route()
      })
    } else {
      this.setState({ isLoading: false })
    }
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
    const { lei, filingPeriod } = this.props.match.params
    const pathname = `/filing/${filingPeriod}/${lei}/${splat}`
    this.props.history.replace(pathname)
  }

  goToAppHome() {
    const pathname = `/filing/${this.props.match.params.filingPeriod}/`
    this.props.history.replace(pathname)
  }

  getLatestPage() {
    const { status, qualityExists, qualityVerified } = this.props.submission
    const { code } = status

    if (code <= VALIDATING || code === NO_QUALITY_EDITS) return 'upload'
    if (code >= VALIDATED || code === NO_MACRO_EDITS) return 'submission'
    if (code === SYNTACTICAL_VALIDITY_EDITS) return 'syntacticalvalidity'
    if (
      (code >= QUALITY_EDITS || code === NO_SYNTACTICAL_VALIDITY_EDITS) &&
      qualityExists &&
      !qualityVerified
    )
      return 'quality'
    return 'macro'
  }

  route() {
    const status = this.props.submission.status
    const code = status.code
    const splat = this.props.match.params.splat
    const latest = this.getLatestPage()

    if (!splat) {
      return this.replaceHistory(latest)
    }

    if (submissionRoutes.indexOf(splat) === -1) {
      return this.replaceHistory(latest)
    }

    if (code <= VALIDATING)
      if (splat === 'upload') return this.update()
      else return this.replaceHistory('upload')

    if (code > VALIDATING && code <= VALIDATED) {
      if (splat === latest) return this.update()
      else if (
        submissionRoutes.indexOf(splat) > submissionRoutes.indexOf(latest)
      ) {
        return this.replaceHistory(latest)
      }
    }

    return this.update()
  }

  update() {
    this.renderChildren = true
    return this.forceUpdate()
  }

  render() {
    const {
      submission,
      lei,
      match: { params },
    } = this.props
    const { code } = submission.status

    if (
      this.state.isLoading ||
      code === UNINITIALIZED ||
      (code < VALIDATED &&
        code !== NO_MACRO_EDITS &&
        params.splat === 'submission') ||
      submission.isFetching ||
      submission.id.lei !== params.lei ||
      lei !== params.lei ||
      !this.renderChildren ||
      !params.splat
    )
      return <Loading className='floatingIcon' />
    return <SubmissionContainer {...this.props} />
  }
}

export function mapStateToProps(state, ownProps) {
  const { submission, lei, edits, refiling } = state.app
  const {
    match: { params },
  } = ownProps

  return {
    submission,
    params,
    lei,
    edits,
    refiling,
  }
}

export default withRouter(connect(mapStateToProps)(SubmissionRouter))
