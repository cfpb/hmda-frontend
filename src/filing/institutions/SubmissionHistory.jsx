import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { ordinal } from '../utils/date.js'
import CSVDownload from '../common/CSVContainer.jsx'
import { SIGNED, VALIDATING } from '../constants/statusCodes.js'
import fetchFilingPage from '../actions/fetchFilingPage'
import SubmissionHistoryNav from './SubmissionHistoryNav'

import './SubmissionHistory.css'
import LoadingIcon from '../../common/LoadingIcon.jsx'

/**
 * Submission history is displayed for the individual institution.
 * A user can click on a recent submission and be able to download a CSV
 * @param {array} submissions - The indiviual institution's submissions
 * @param {string} lei - Institutions Identifier
 */

const SubmissionHistory = (props) => {
  const { submissionPages, links, lei } = props

  const [page, setPage] = useState('1')
  const dispatch = useDispatch()

  const handleToggleClick = useCallback((lei) => {
    let accordionButton = document.getElementById(`submissions-button-${lei}`)
    let expanded =
      accordionButton.getAttribute('aria-expanded') === 'false' ? false : true

    document
      .getElementById(`submissions-button-${lei}`)
      .setAttribute('aria-expanded', !expanded)
    document
      .getElementById(`submissions-${lei}`)
      .setAttribute('aria-hidden', expanded)
  }, [])

  const handlePaginationClick = useCallback(
    (targetPage) => {
      setPage(targetPage)
      dispatch(fetchFilingPage(lei, targetPage))

      setTimeout(() => {
        let historyContainer = document.getElementById(`history-${lei}`)
        if (historyContainer)
          historyContainer.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    },
    [lei],
  )

  if (!Object.keys(submissionPages).length) return null

  const pageSubmissions = submissionPages[page] || []
  const hasSubmissions = links.last !== '0'

  return (
    <section className='SubmissionHistory' id={`history-${lei}`}>
      <ul className='accordion-bordered'>
        <li>
          <button
            className='accordion-button'
            aria-expanded='false'
            id={`submissions-button-${lei}`}
            aria-controls={`submissions-${lei}`}
            onClick={() => handleToggleClick(lei)}
          >
            History of your progress in this filing period
          </button>
          <div
            id={`submissions-${lei}`}
            className='accordion-content'
            aria-hidden='true'
          >
            {hasSubmissions ? (
              <p>
                The edit report for previous submissions that completed the
                validation process can be downloaded in csv format below.
              </p>
            ) : (
              'There are no previous submissions.'
            )}
            <SubmissionHistoryNav
              clickHandler={handlePaginationClick}
              links={links}
              page={page}
              top={true}
              hidden={!hasSubmissions}
            />
            <ol>
              {!pageSubmissions.length && hasSubmissions && <LoadingIcon />}
              {pageSubmissions.map((submission, i) => {
                const startDate = ordinal(new Date(submission.start))
                const endDate = ordinal(new Date(submission.end))
                let message = submission.status.message.slice(0, -1)

                const signedOn =
                  submission.status.code === SIGNED ? ` on ${endDate}` : null

                // render a link if beyond VALIDATING
                // even signed submissions could have an edit report
                // because quality and macro are verified
                if (submission.status.code > VALIDATING) {
                  if (submission.signerUsername)
                    message += ` and was signed by ${submission.signerUsername}`

                  return (
                    <li key={i} value={submission.id.sequenceNumber}>
                      Filing progress on {startDate}: <strong>{message}</strong>
                      {signedOn},{' '}
                      <CSVDownload inline={true} submission={submission} />
                    </li>
                  )
                }

                // other statuses contain no edits
                return (
                  <li key={i} value={submission.id.sequenceNumber}>
                    Filing progress on {startDate}: <strong>{message}</strong>.
                  </li>
                )
              })}
            </ol>
            <SubmissionHistoryNav
              clickHandler={handlePaginationClick}
              links={links}
              page={page}
              hidden={pageSubmissions.length < 10}
            />
          </div>
        </li>
      </ul>
    </section>
  )
}

SubmissionHistory.propTypes = {
  submissions: PropTypes.array,
  lei: PropTypes.string,
}

export default SubmissionHistory
