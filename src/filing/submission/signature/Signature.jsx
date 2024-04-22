import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import fetchSignature from '../../actions/fetchSignature.js'
import updateSignature from '../../actions/updateSignature.js'
import checkSignature from '../../actions/checkSignature.js'
import ErrorWarning from '../../common/ErrorWarning.jsx'
import Loading from '../../../common/LoadingIcon.jsx'
import {
  VALIDATED,
  NO_MACRO_EDITS,
  SIGNED,
} from '../../constants/statusCodes.js'
import Alert from '../../../common/Alert.jsx'

import './Signature.css'

const showWarning = (error) => {
  if (!error) return null
  return (
    <ErrorWarning
      error={error}
      bodyText='You cannot sign your submission if you have encountered an error in the filing process. Please refresh the page or try again later.'
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

/**
 * Component is used to have the HMDA user sign off/submit their filing
 */

const Signature = ({ lei, isPassed }) => {
  const dispatch = useDispatch()
  const signatureState = useSelector((state) => state.app.signature)
  const error = useSelector((state) => state.app.error)
  const { isFetching, receipt, checked } = signatureState
  const status = useSelector((state) => state.app.submission.status)

  useEffect(() => {
    if (!isFetching && receipt === null) {
      dispatch(fetchSignature())
    }
  }, [isFetching, receipt])

  const onSignatureClick = (signed) => {
    dispatch(updateSignature(signed, lei))
  }

  const onSignatureCheck = (checked) => {
    dispatch(checkSignature(checked))
  }

  if (isPassed) return <SignatureClosed status={status} />

  let isButtonDisabled =
    (status.code === VALIDATED || status.code === NO_MACRO_EDITS) && checked
      ? false
      : true

  let isCheckBoxDisabled = status.code === SIGNED ? true : false

  let buttonClass = 'button-disabled'
  // if the checkbox is checked remove disabled from button
  if (checked) {
    buttonClass = ''
  }
  // if signed, disable button again
  if (status.code === SIGNED) {
    buttonClass = 'button-disabled'
  }

  // if an error has occurred, disable both checkbox and button
  if (error) {
    isButtonDisabled = true
    isCheckBoxDisabled = true
    buttonClass = 'button-disabled'
  }

  return (
    <section className='Signature' id='signature'>
      <header>
        <h2>Signature</h2>
        <p className='font-lead'>
          To complete your official regulatory submission, select the checkbox
          below to certify the accuracy and completeness of the data submitted.
          Then, click the &quot;Submit HMDA data&quot; button.
        </p>
      </header>

      {showWarning(error)}

      {isFetching ? <Loading className='LoadingInline' /> : null}
      <ul className='unstyled-list'>
        <li>
          <input
            id='signatureAuth'
            name='signatureAuth'
            type='checkbox'
            value='signature'
            disabled={isCheckBoxDisabled}
            checked={checked || status.code === SIGNED}
            onChange={(e) => onSignatureCheck(e.target.checked)}
          />
          <label htmlFor='signatureAuth'>
            I am an authorized representative of my institution with knowledge
            of the data submitted and I am certifying the accuracy and
            completeness of the data submitted.
          </label>
        </li>
      </ul>

      <button
        className={buttonClass}
        onClick={() => onSignatureClick(checked)}
        disabled={isButtonDisabled}
      >
        Submit HMDA data
      </button>
    </section>
  )
}

Signature.propTypes = {
  lei: PropTypes.string.isRequired,
  isPassed: PropTypes.bool,
}

export default Signature
