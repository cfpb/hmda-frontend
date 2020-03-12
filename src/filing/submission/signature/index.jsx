import React from 'react'
import PropTypes from 'prop-types'
import ErrorWarning from '../../common/ErrorWarning.jsx'
import Loading from '../../../common/LoadingIcon.jsx'
import { VALIDATED, NO_MACRO_EDITS, SIGNED } from '../../constants/statusCodes.js'
import Alert from '../../../common/Alert.jsx'

import './Signature.css'

const showWarning = props => {
  if (!props.error) return null
  return (
    <ErrorWarning
      error={props.error}
      bodyText="You cannot sign your submission if you have encountered an error in the filing process. Please refresh the page or try again later."
    />
  )
}

const SignatureClosed = ({ status }) => {
  const notSigned = status.code !== SIGNED

  return (
    <section className='Signature' id='signature'>
      <header>
        <h2>Signature</h2>
      </header>
      {notSigned && (
        <Alert type='warning'>
          <p style={{ padding: 0 }}>This submission was not signed.</p>
        </Alert>
      )}
    </section>
  )
}

const Signature = props => {
  if(props.isPassedQuarter) return <SignatureClosed status={props.status} />

  let isButtonDisabled =
    (props.status.code === VALIDATED || props.status.code === NO_MACRO_EDITS) && props.checked ? false : true

  let isCheckBoxDisabled = props.status.code === SIGNED ? true : false

  let buttonClass = 'button-disabled'
  // if the checkbox is checked remove disabled from button
  if (props.checked) {
    buttonClass = ''
  }
  // if signed, disable button again
  if (props.status.code === SIGNED) {
    buttonClass = 'button-disabled'
  }

  // if an error has occurred, disable both checkbox and button
  if (props.error) {
    isButtonDisabled = true
    isCheckBoxDisabled = true
    buttonClass = 'button-disabled'
  }

  return (
    <section className="Signature" id="signature">
      <header>
        <h2>Signature</h2>
        <p className="font-lead">
          To complete your submission, select the checkbox below. Next,
          select the &quot;Submit HMDA data&quot; button to practice
          submitting data. When the filing period opens, selecting the checkbox
          will certify the accuracy and completeness of the data submitted.
        </p>
      </header>

      {showWarning(props)}

      {props.isFetching ? <Loading className="LoadingInline"/> : null}
      <ul className="unstyled-list">
        <li>
          <input
            id="signatureAuth"
            name="signatureAuth"
            type="checkbox"
            value="signature"
            disabled={isCheckBoxDisabled}
            checked={props.checked || props.status.code === SIGNED}
            onChange={e => props.onSignatureCheck(e.target.checked)}
          />
          <label htmlFor="signatureAuth">
            I am an authorized representative of my institution with knowledge of
            the data submitted and am certifying to the accuracy and completeness
            of the data submitted.
          </label>
        </li>
      </ul>

      <button
        className={buttonClass}
        onClick={() => props.onSignatureClick(props.checked)}
        disabled={isButtonDisabled}
      >
        Submit HMDA data
      </button>
    </section>
  )
}

Signature.propTypes = {
  status: PropTypes.object,
  checked: PropTypes.bool,
  isFetching: PropTypes.bool,
  onSignatureClick: PropTypes.func.isRequired,
  onSignatureCheck: PropTypes.func.isRequired
}

export default Signature
