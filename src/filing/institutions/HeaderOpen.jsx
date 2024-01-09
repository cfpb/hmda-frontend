import React from 'react'
import Alert from '../../common/Alert'
import { HeaderDocsLink } from './Header'
import { isBeta } from '../../common/Beta'

export const HeaderOpen = ({ period, lateDate, endDate }) => {
  const officialOrSimulated = isBeta() ? (
    <>
      You may <span className='simulated'>simulate filing of HMDA data</span>{' '}
      for your authorized institutions below.
    </>
  ) : (
    <>
      You may <span className='official'>file official HMDA data</span> for your
      authorized institutions below.
    </>
  )

  return (
    <Alert>
      <div>
        <h2 style={{ margin: '0 0 0.5em 0' }}>
          The {period} filing period is open.
        </h2>
        <p className='font-lead'>
          Timely submissions of {period} HMDA data will be accepted until{' '}
          <strong>{lateDate}</strong>.
          <br />
          Resubmissions and late submissions will be accepted until{' '}
          <strong>{endDate}</strong>.
        </p>
        <br />
        <p className='font-lead'>
          <HeaderDocsLink period={period} />
          <br />
          <br />
          {!isBeta() && (
            <>
              The{' '}
              <a href='https://ffiec.beta.cfpb.gov/filing' target='_blank'>
                HMDA Beta Platform
              </a>{' '}
              is available to test your HMDA data prior to official submission.
            </>
          )}
          <br />
          <br />
          {officialOrSimulated}
        </p>
      </div>
    </Alert>
  )
}
