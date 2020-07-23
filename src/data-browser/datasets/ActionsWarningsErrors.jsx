import React from 'react'
import Error from '../../common/Error.jsx'
import LoadingButton from './LoadingButton.jsx'
import Alert from '../../common/Alert.jsx'

export const ActionsWarningsErrors = ({
  downloadCallback,
  downloadEnabled,
  downloadUrl,
  showSummaryButton,
  summaryEnabled,
  loadingDetails,
  requestSubset,
  isLargeFile,
  error,
  longRunningQuery
}) => {
  return (
    <>
      <LoadingButton onClick={downloadCallback} disabled={!downloadEnabled} dataUrl={downloadUrl}>
        Download Dataset
      </LoadingButton>
      {showSummaryButton && (
        <LoadingButton
          loading={loadingDetails}
          onClick={requestSubset}
          disabled={!summaryEnabled}
          secondary={true}
        >
          View Summary Table
        </LoadingButton>
      )}
      {isLargeFile ? (
        <div className='LargeFileWarning'>
          <h4>Warning:</h4> This dataset may be too large to be opened in
          standard spreadsheet applications
        </div>
      ) : null}
      {!error && longRunningQuery ? <LongRunningMessage /> : null}
      {error ? <Error error={error} /> : null}
    </>
  )
}

const LongRunningMessage = () => {
  return (
    <Alert type='warning'>
      <p>Queries which result in large datasets may take longer than expected to load.</p>
    </Alert>
  )
}