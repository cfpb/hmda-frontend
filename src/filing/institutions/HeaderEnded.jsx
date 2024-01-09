import React from 'react'
import Alert from '../../common/Alert'
import { HeaderDocsLink } from './Header'

export const HeaderEnded = ({ endDate, period }) => {
  return (
    <Alert
      heading={`Collection of ${period} HMDA data has ended.`}
      type='warning'
    >
      <>
        <p>
          Submissions of {period} HMDA data are no longer accepted as of{' '}
          <strong>{endDate}</strong>.
        </p>
        <p className='margin-bottom-0'>
          <HeaderDocsLink period={period} />
          <br />
          If you require additional assistance, contact{' '}
          <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.
        </p>
      </>
    </Alert>
  )
}
