import React from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import PrintPageButton from './PrintPageButton'
import { isBeta } from '../../common/Beta.jsx'
import { formatReceiptTime } from '../utils/date.js'
import { SIGNED } from '../constants/statusCodes.js'

const Receipt = ({ status, timestamp, receipt, filingPeriod, email }) => {
  const code = status.code
  if (code !== SIGNED || receipt === null) return null
  if (isBeta()) {
    return (
      <section className='RefileWarning'>
        <Alert type='warning' heading='Beta filing complete'>
          <div>
            You have successfully completed your <strong>beta</strong> HMDA
            filing for {filingPeriod}.
            <br />
            <strong>
              You will still need to file your final HMDA data to the{' '}
              <a href='https://ffiec.cfpb.gov/filing'>live system</a> when the
              filing period is open.
            </strong>
          </div>
        </Alert>
      </section>
    )
  }
  return (
    <section className='RefileWarning'>
      <Alert type='success' heading='HMDA filing accepted!'>
        <div>
          Congratulations, you have successfully completed your HMDA filing for{' '}
          {filingPeriod}!
          <br />
          Your data and signature were received and recorded on{' '}
          <strong>{formatReceiptTime(timestamp)}</strong>.
          <br />
          Your receipt number for this submission is <strong>{receipt}</strong>.
          <br />
          <br />A copy of this receipt has been sent to <strong>{email}</strong>
          .
          <PrintPageButton />
        </div>
      </Alert>
    </section>
  )
}

Receipt.propTypes = {
  email: PropTypes.string,
  filingPeriod: PropTypes.string,
  receipt: PropTypes.string,
  timestamp: PropTypes.number,
  status: PropTypes.object,
  isFetching: PropTypes.bool,
}

export default Receipt
