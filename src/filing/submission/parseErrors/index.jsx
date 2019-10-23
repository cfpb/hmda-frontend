import React, { Component } from 'react'
import Loading from '../../../common/LoadingIcon.jsx'
import PropTypes from 'prop-types'
import RefileWarningComponent from '../../refileWarning/index.jsx'
import submissionProgressHOC from '../progressHOC.jsx'
import Pagination from '../../pagination/container.jsx'

import './ParseErrors.css'

const RefileWarning = submissionProgressHOC(RefileWarningComponent)

export const renderTSErrors = ({ transmittalSheetErrors }) => {
  if (transmittalSheetErrors.length === 0) return null
  return (
    <table width="100%">
      <caption>
        <h3>Transmittal Sheet Errors</h3>
        <p>
          Formatting errors in the transmittal sheet, the first row of your HMDA
          file.
        </p>
      </caption>
      <thead>
        <tr>
          <th>Row</th>
          <th>Transmittal Sheet Errors</th>
        </tr>
      </thead>
      <tbody>
        {transmittalSheetErrors.map((tsError, i) => {
          return (
            <tr key={i}>
              <td>1</td>
              <td>{tsError}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export const renderLarErrors = ({ larErrors, ...props }) => {
  if (larErrors.length === 0) return null
  const caption = (
    <caption>
      <h3>LAR Errors</h3>
      <p>Formatting errors in loan application records, arranged by row.</p>
    </caption>
  )

  let className = 'PaginationTarget'
  className += props.paginationFade ? ' fadeOut' : ''

  return (
    <table className={className} id="parseErrors" width="100%">
      {caption}
      <thead>
        <tr>
          <th>Row</th>
          <th>Errors</th>
        </tr>
      </thead>
      <tbody>
        {larErrors.map((larErrorObj, i) => {
          return larErrorObj.errorMessages.map((message, i) => {
            return (
              <tr key={i}>
                <td>{larErrorObj.rowNumber}</td>
                <td>{message}</td>
              </tr>
            )
          })
        })}
      </tbody>
    </table>
  )
}

class ParseErrors extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.fetched && this.props.fetched) {
      window.scrollTo(0, this.rendered.offsetTop)
    }
  }

  render() {
    const props = this.props

    if (!props.fetched) return <Loading />

    const errorText = props.pagination.total > 1 ? 'Rows' : 'Row'

    return (
      <section
        ref={el => (this.rendered = el)}
        className="ParseErrors"
        id="parseErrors"
      >
        <RefileWarning />
        <header>
          {!props.pagination ? null : (
            <h2>
              {props.pagination.total} {errorText} with Formatting Errors
            </h2>
          )}
          <p className="usa-font-lead">
            The uploaded file is not formatted according to the requirements
            specified in the{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://s3.amazonaws.com/cfpb-hmda-public/prod/help/2018-hmda-fig-2018-hmda-rule.pdf"
            >
              Filing Instructions Guide
            </a>{' '}
            for data collected in 2018 incorporating the 2018 HMDA Rule.
          </p>
        </header>
        {renderTSErrors(props)}
        {renderLarErrors(props)}
        <Pagination isFetching={props.isFetching} target="parseErrors" />
        <RefileWarning />
      </section>
    )
  }
}

ParseErrors.propTypes = {
  pagination: PropTypes.object,
  paginationFade: PropTypes.number,
  transmittalSheetErrors: PropTypes.array.isRequired,
  larErrors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default ParseErrors
