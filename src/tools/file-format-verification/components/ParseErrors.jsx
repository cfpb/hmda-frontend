import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Pagination from '../containers/Pagination.jsx'
import { ConnectedUploadButton } from '../containers/UploadForm'
import Alert from '../../../common/Alert.jsx'
import LoadingIcon from '../../../common/LoadingIcon.jsx'
import { useScrollIntoView } from '../../../common/useScrollIntoView.jsx'
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

    currentErrs.push(<tr key={i}>{renderErrorColumns(err)}</tr>)
  }

  return (
    <table
      className={'PaginationTarget' + (pagination.fade ? ' fadeOut' : '')}
      width='100%'
    >
      <caption>
        <h3>LAR Errors</h3>
        <p>Formatting errors in loan application records, arranged by row.</p>
      </caption>
      <thead>
        <tr>{getHeaders()}</tr>
      </thead>
      <tbody>{currentErrs}</tbody>
    </table>
  )
}

const renderTSErrors = (transmittalSheetErrors) => {
  if (transmittalSheetErrors.length === 0) return null
  return (
    <table className='margin-bottom-0' width='100%'>
      <caption>
        <h3>Transmittal Sheet Errors</h3>
        <p>
          Formatting errors in the transmittal sheet, the first row of your HMDA
          file.
        </p>
      </caption>
      <thead>
        <tr>{getHeaders(true)}</tr>
      </thead>
      <tbody>
        {transmittalSheetErrors.map((tsError, i) => {
          return (
            <tr key={i}>
              <td>1</td>
              {renderErrorColumns(tsError)}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const renderParseResults = (count, errors) => {
  if (errors.length > 0) return null
  if (count === 0) return null

  const errorText = count === 1 ? 'Error' : 'Errors'
  const heading = `${count} Formatting ${errorText}`
  return (
    <Alert type='error' heading={heading}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p>
          Your file has formatting errors.
          <br />
          Please fix the following errors and try again.
          <br />
          Rows with incorrect number of fields will need to be fixed and the
          file will need to be reuploaded before the remaining formatting
          requirements can be checked.
        </p>
        <div>
          <ConnectedUploadButton />
        </div>
      </div>
    </Alert>
  )
}

function renderErrorColumns(err) {
  const columns = []
  const { fieldName, inputValue, row, validValues, uli } = err
  const userInput = inputValue === '' ? <em>(blank)</em> : inputValue

  columns.push(<td key='1'>{fieldName}</td>)
  columns.push(<td key='2'>{userInput}</td>)
  columns.push(<td key='3'>{validValues}</td>)

  if (uli) {
    columns.unshift(<td key='4'>{uli}</td>)
    columns.unshift(<td key='5'>{row}</td>)
  }

  return columns
}

function getHeaders(isTs) {
  const headers = ['Row']

  if (isTs) {
    headers.push('TS Data Field')
    headers.push('Found Value')
    headers.push('Valid Value')
  } else {
    headers.push('ULI')
    headers.push('LAR Data Field')
    headers.push('Found Value')
    headers.push('Valid Value')
  }

  return headers.map((label, idx) => <th key={idx}>{label}</th>)
}

const ParseErrors = (props) => {
  const {
    parsed,
    isParsing,
    transmittalSheetErrors,
    larErrors,
    pagination,
    errors,
    filingPeriod,
  } = props
  const count = transmittalSheetErrors.length + larErrors.length
  const [statusRef, scrollToStatus] = useScrollIntoView()

  useEffect(() => {
    if (isParsing || !parsed) return
    if (count > 0) scrollToStatus()
  }, [transmittalSheetErrors, larErrors])

  if (isParsing) return <LoadingIcon />
  if (!parsed || errors.length) return null

  return (
    <div className='ParseErrors usa-grid-full' id='parseErrors' ref={statusRef}>
      {renderParseResults(count, errors)}
      {renderTSErrors(transmittalSheetErrors, filingPeriod)}
      {renderLarErrors(larErrors, pagination, filingPeriod)}
      <Pagination />
    </div>
  )
}

ParseErrors.propTypes = {
  transmittalSheetErrors: PropTypes.array,
  larErrors: PropTypes.array,
  period: PropTypes.string,
}

export default ParseErrors
