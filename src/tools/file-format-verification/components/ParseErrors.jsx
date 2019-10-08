import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '../containers/Pagination.jsx'
import Alert from '../../../common/Alert.jsx'
import LoadingIcon from '../../../common/LoadingIcon.jsx'
import { ERRORS_PER_PAGE } from '../constants'

import './ParseErrors.css'

const renderLarErrors = (larErrors, pagination) => {
  if (larErrors.length === 0) return null
  const currentErrs = []

  //don't move to the next page until fading in
  const end =
    ERRORS_PER_PAGE *
    (pagination.fade ? pagination.previousPage : pagination.page)

  for (let i = end - ERRORS_PER_PAGE; i < end; i++) {
    if (i === larErrors.length) break
    const err = larErrors[i]

    currentErrs.push(
      <tr key={i}>
        <td>{err.row}</td>
        <td>{err.error}</td>
      </tr>
    )
  }

  return (
    <table
      className={'PaginationTarget' + (pagination.fade ? ' fadeOut' : '')}
      width="100%"
    >
      <caption>
        <h3>LAR Errors</h3>
        <p>Formatting errors in loan application records, arranged by row.</p>
      </caption>
      <thead>
        <tr>
          <th>Row</th>
          <th>Errors</th>
        </tr>
      </thead>
      <tbody>{currentErrs}</tbody>
    </table>
  )
}

const renderTSErrors = transmittalSheetErrors => {
  if (transmittalSheetErrors.length === 0) return null
  return (
    <table className="margin-bottom-0" width="100%">
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

const renderParseResults = (count, errors) => {
  if (errors.length > 0) return null

  const noErrors = count === 0
  if (noErrors) {
    return (
      <Alert type="success" heading="Congratulations! No Formatting Errors">
        <p>Your file meets the specified formatting requirements.</p>
      </Alert>
    )
  }

  const errorText = count === 1 ? 'Error' : 'Errors'
  const heading = `${count} Formatting ${errorText}`
  return (
    <Alert type="error" heading={heading}>
      <p>
        Your file has formatting errors.<br />Please fix the following errors
        and try again.<br />Rows with incorrect number of fields will need to be
        fixed and the file will need to be reuploaded before the remaining
        formatting requirements can be checked.
      </p>
    </Alert>
  )
}

const ParseErrors = props => {
  const {
    parsed,
    isParsing,
    transmittalSheetErrors,
    larErrors,
    pagination,
    errors
  } = props
  const count = transmittalSheetErrors.length + larErrors.length

  if (isParsing) return <LoadingIcon />
  if (!parsed) return null

  return (
    <div className="ParseErrors usa-grid-full" id="parseErrors">
      {renderParseResults(count, errors)}
      {renderTSErrors(transmittalSheetErrors)}
      {renderLarErrors(larErrors, pagination)}
      <Pagination />
    </div>
  )
}

ParseErrors.propTypes = {
  transmittalSheetErrors: PropTypes.array,
  larErrors: PropTypes.array
}

export default ParseErrors
