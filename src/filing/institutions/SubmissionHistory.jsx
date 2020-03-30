import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ordinal } from '../utils/date.js'
import CSVDownload from '../common/CSVContainer.jsx'
import { SIGNED, VALIDATING } from '../constants/statusCodes.js'
import fetchFilingPage from '../actions/fetchFilingPage'
import SubmissionHistoryNav from './SubmissionHistoryNav'

import './SubmissionHistory.css'
import LoadingIcon from '../../common/LoadingIcon.jsx'

class InstitutionPreviousSubmissions extends Component {
  constructor(props) {
    super(props)
    this.state = { page: '1' }

    this.handleToggleClick = this.handleToggleClick.bind(this)
    this.handlePaginationClick = this.handlePaginationClick.bind(this)
  }

  handleToggleClick(lei) {
    let accordionButton = document.getElementById(`submissions-button-${lei}`)
    let expanded =
      accordionButton.getAttribute('aria-expanded') === 'false' ? false : true

    document
      .getElementById(`submissions-button-${lei}`)
      .setAttribute('aria-expanded', !expanded)
    document
      .getElementById(`submissions-${lei}`)
      .setAttribute('aria-hidden', expanded)
  }

  handlePaginationClick(targetPage){
    this.setState({ page: targetPage })
    this.props.dispatch(fetchFilingPage(this.props.lei, targetPage))

    setTimeout(() => {
      let historyContainer = document.getElementById(`history-${this.props.lei}`)
      if(historyContainer) historyContainer.scrollIntoView({ behavior: 'smooth' })
    }, 0)
  }

  render() {
    if (!Object.keys(this.props.submissionPages).length) return null

    const pageSubmissions = this.props.submissionPages[this.state.page] || []
    const listStartingNumber =  pageSubmissions[0] && pageSubmissions[0].id.sequenceNumber

    return (
      <section className="SubmissionHistory" id={`history-${this.props.lei}`}>
        <ul className="accordion-bordered">
          <li>
            <button
              className="accordion-button"
              aria-expanded="false"
              id={`submissions-button-${this.props.lei}`}
              aria-controls={`submissions-${this.props.lei}`}
              onClick={event =>
                this.handleToggleClick(this.props.lei)
              }
            >
              History of your progress in this filing period
            </button>
            <div
              id={`submissions-${this.props.lei}`}
              className="accordion-content"
              aria-hidden="true"
            >
              <p>
                The edit report for previous submissions that completed the
                validation process can be downloaded in csv format below.
              </p>
              <SubmissionHistoryNav 
                clickHandler={this.handlePaginationClick} 
                links={this.props.links}
                page={this.state.page}
                top={true}
              />
              <ol reversed start={listStartingNumber} >
                {!pageSubmissions.length && <LoadingIcon />}
                {pageSubmissions.map((submission, i) => {
                  const startDate = ordinal(new Date(submission.start))
                  const endDate = ordinal(new Date(submission.end))
                  const message = submission.status.message.slice(0, -1)

                  const signedOn =
                    submission.status.code === SIGNED ? ` on ${endDate}` : null

                  // render a link if beyond VALIDATING
                  // even signed submissions could have an edit report
                  // because quality and macro are verified
                  if (submission.status.code > VALIDATING) {
                    return (
                      <li key={i}>
                        Filing progress on {startDate}:{' '}
                        <strong>{message}</strong>
                        {signedOn},{' '}
                        <CSVDownload inline={true} submission={submission} />
                      </li>
                    )
                  }

                  // other statuses contain no edits
                  return (
                    <li key={i}>
                      Filing progress on {startDate}: <strong>{message}</strong>
                      .
                    </li>
                  )
                })}
              </ol>
              <SubmissionHistoryNav 
                clickHandler={this.handlePaginationClick} 
                links={this.props.links}
                page={this.state.page}
                hidden={pageSubmissions.length < 10}
              />
            </div>
          </li>
        </ul>
      </section>
    )
  }
}

InstitutionPreviousSubmissions.propTypes = {
  submissions: PropTypes.array,
  lei: PropTypes.string
}

export default connect()(InstitutionPreviousSubmissions)
