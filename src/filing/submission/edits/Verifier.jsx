import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Alert from '../../../common/Alert.jsx'
import Loading from '../../../common/LoadingIcon.jsx'
import fetchVerify from '../../actions/fetchVerify.js'
import { SIGNED } from '../../constants/statusCodes.js'

import './Verifier.css'

export const renderVerified = (verified, type) => {
  if (verified) {
    return (
      <Alert type='success' heading='Verified.'>
        <p>
          <span>{type}</span> edits have been verified.
        </p>
      </Alert>
    )
  }

  return null
}

const VerificationClosed = ({ type, verified }) => {
  return (
    <section className='Verifier'>
      <hr />
      <h2>Verify {type} edits</h2>
      <p className='font-lead'>
        The filing period has closed. Changes to the verification status of{' '}
        {type} edits are not possible at this time.
      </p>
      {renderVerified(verified, type)}
    </section>
  )
}

/**
 * Displays any edits when a HMDA filer submits their HMDA file
 */

const Verifier = ({ type, lei, isPassed }) => {
  const dispatch = useDispatch()
  const types = useSelector((state) => state.app.edits.types)
  const editsState = useSelector((state) => state.app.edits.types[type])
  const submissionStatus = useSelector(
    (state) => state.app.submission.status.code,
  )
  const [checked, setChecked] = useState(editsState.verified)

  useEffect(() => {
    setChecked(editsState.verified)
  }, [editsState.verified])

  const onVerify = (checked) => {
    dispatch(fetchVerify(type, checked, lei))
  }

  const disabled = submissionStatus === SIGNED ? true : false
  const verified =
    types[type]?.verified !== undefined ? types[type]?.verified : false
  const isFetching = types[type]?.isFetching || false
  const noEditsExist = !types[type].edits.length

  if (isPassed)
    return <VerificationClosed type={type} verified={editsState.verified} />
  if (noEditsExist) return null

  return (
    <section className='Verifier'>
      <hr />
      <h2>Verify {type} edits</h2>
      <p className='font-lead'>
        In order to continue you must verify all {type} edits.
      </p>
      {isFetching ? <Loading className='LoadingInline' /> : null}
      <ul className='unstyled-list'>
        <li>
          <input
            id={`${type}Verifier`}
            name={`${type}Verifier`}
            type='checkbox'
            checked={checked}
            disabled={disabled}
            onChange={(e) => {
              setChecked(e.target.checked)
              onVerify(e.target.checked)
            }}
          />
          <label htmlFor={`${type}Verifier`} className='max-width-100'>
            All data are accurate, no corrections required. I have verified the
            accuracy of all data fields referenced by the {type} edits.
          </label>
        </li>
      </ul>
      {renderVerified(verified, type)}
    </section>
  )
}

Verifier.propTypes = {
  type: PropTypes.string.isRequired,
  lei: PropTypes.string.isRequired,
  isPassed: PropTypes.bool,
}

export default Verifier
