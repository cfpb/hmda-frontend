import React from 'react'
import Alert from '../../common/Alert'
import { HeaderDocsLink } from './Header'

export const HeaderBeforeOpen = ({ startDate, lateDate, period }) => {
  return (
    <Alert
      heading={`The ${period} filing period is not yet open.`}
      type='warning'
    >
      <>
        <p className='margin-bottom-0'>
          The Platform will be open for timely submissions from{' '}
          <strong>{startDate}</strong> until <strong>{lateDate}</strong>.
        </p>
        <p className='margin-0'>
          <HeaderDocsLink period={period} />
        </p>
      </>
    </Alert>
  )
}
