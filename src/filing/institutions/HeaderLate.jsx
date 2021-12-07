import React from "react"
import Alert from "../../common/Alert"
import { HeaderDocsLink } from './Header'

export const HeaderLate = ({
  endDate,
  lateDate,
  period,
}) => {
  
  return (
    <Alert heading={`The ${period} filing deadline has passed.`} type='warning'>
      <>
        <p>
          Submissions of {period} data are no longer considered timely as of{' '}
          <strong>{lateDate}</strong>
          .
          <br />
          The platform will continue to accept resubmissions and late
          submissions until <strong>{endDate}</strong>.
        </p>
        <p className='margin-0'>
          <HeaderDocsLink period={period} />
          <br />
          You may file HMDA data for your authorized institutions below.
        </p>
      </>
    </Alert>
  )
}
