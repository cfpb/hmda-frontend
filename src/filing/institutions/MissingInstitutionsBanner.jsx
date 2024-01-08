import React from 'react'
import Alert from '../../common/Alert.jsx'

export const MissingInstitutionsBanner = ({ leis = [] }) => {
  const hasMissingLeis = leis.length > 0
  const bannerType = hasMissingLeis ? 'warning' : 'info'

  return (
    <Alert
      heading='Missing an institution?'
      type={bannerType}
      headingType='small'
    >
      <div>
        <MissingLeiList leis={leis} />
        <p>
          If any {hasMissingLeis ? 'other' : ''} institutions are missing,
          please access{' '}
          <a href='https://hmdahelp.consumerfinance.gov/accounthelp/'>
            this form
          </a>{' '}
          and enter the necessary information, including your institution's LEI,
          which is required in order to access the HMDA Platform. We will apply
          the update to your account. Please check back one day after submitting
          your information.
        </p>
      </div>
    </Alert>
  )
}

export const MissingLeiList = ({ leis = [] }) => {
  if (leis.length < 1) return null

  return (
    <div className='missing-leis'>
      <p>
        The following institutions are associated with your profile, but not for
        the currently selected year:
      </p>
      <ul>
        {leis.map((lei, key) => (
          <li key={key}>{lei}</li>
        ))}
      </ul>
      <p>
        To associate one or more of these institutions, please contact{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='mailto:hmdahelp@cfpb.gov'
        >
          HMDA Help
        </a>
        .
      </p>
    </div>
  )
}
