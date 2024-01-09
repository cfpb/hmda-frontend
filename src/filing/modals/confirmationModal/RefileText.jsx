import React from 'react'
import PropTypes from 'prop-types'
import { VALIDATING, SIGNED } from '../../constants/statusCodes.js'
import { isBeta } from '../../../common/Beta.jsx'

import './RefileText.css'

export const getStatus = (code, filingPeriod) => {
  let status
  let appendComplete = null

  if (code > VALIDATING) {
    status = 'is in progress'
    if (code === SIGNED) status = 'has already been submitted.'
  }

  if (code === SIGNED) {
    appendComplete =
      ' Resubmissions are not complete until you clear and/or verify all edits and submit the signed replacement data'
  }

  const message = status ? (
    <>
      <br />
      <p>
        HMDA data for{' '}
        <strong>
          {filingPeriod} {status}
        </strong>
        {appendComplete}.
      </p>
    </>
  ) : null

  return message
}

const BetaInfoBlock = () => (
  <>
    <span className='notice-wrapper'>
      <p className='usa-font-lead'>
        <b className='emphasized urgent'>Note: </b>Official HMDA data must be
        submitted on the live{' '}
        <a href='https://ffiec.cfpb.gov' target='_blank'>
          HMDA Platform.
        </a>
      </p>
    </span>
    <br />
  </>
)

const WarningDataWillBeDeleted = ({ institution, filingPeriod }) =>
  !isBeta() && (
    <>
      <br />
      <span className='notice-wrapper'>
        <p className='usa-font-lead'>
          The previously submitted {filingPeriod} HMDA data for{' '}
          <span className='bold'>{institution.name} </span>
          <span className='emphasized urgent nowrap'>
            will be deleted and cannot be recovered
          </span>{' '}
          if you choose to proceed.
        </p>
      </span>
    </>
  )

const RefileText = (props) => {
  const { institution, code, filingPeriod } = props
  const dataOfficialVsTest = isBeta() ? 'HMDA test data' : 'official HMDA data'

  return (
    <div className='RefileText'>
      {isBeta() && <BetaInfoBlock />}
      <p className='usa-font-lead'>
        Are you sure you want to replace your {dataOfficialVsTest} for this
        filing?
      </p>
      {!isBeta() && getStatus(code, filingPeriod)}
      <WarningDataWillBeDeleted
        institution={institution}
        filingPeriod={filingPeriod}
      />
    </div>
  )
}

RefileText.propTypes = {
  code: PropTypes.number.isRequired,
}

export default RefileText
