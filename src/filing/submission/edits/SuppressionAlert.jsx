import React from 'react'
import Alert from '../../../common/Alert.jsx'
import CSVDownload from '../../common/CSVContainer.jsx'

export function SuppressionAlert(props) {
  return (
    <Alert type='warning'>
      <p>
        Sorry, we can't display tables of rows for each of your edits. To review
        the affected rows, <CSVDownload inline />
      </p>
    </Alert>
  )
}

export default SuppressionAlert
