import React from "react"
import Alert from "../../common/Alert"
import { HeaderDocsLink } from './Header'

export const HeaderClosed = ({ endDate, period }) => {
  return (
    <Alert heading={`The ${period} filing period is closed.`} type='warning'>
      <>
        <p>
          As of <strong>{endDate}</strong>, submissions of {period} HMDA data
          are no longer accepted.
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
