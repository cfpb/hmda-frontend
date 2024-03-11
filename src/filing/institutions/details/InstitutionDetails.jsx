import React, { useEffect } from 'react'
import { agencyCodes } from '../constants'
import { Input } from './InstitutionInput'
import { OtherFields } from './OtherFields'
import { wrapLoading } from '../wrapLoading'
import ProfileIcon from '../../profile/ProfileIcon'

export const InstitutionDetails = ({ data }) => {
  const {
    name,
    lei,
    agency,
    quarterlyFiler,
    taxId,
    emailDomains,
    activityYear,
    isFetching,
  } = data

  useEffect(() => window.scrollTo(0, 0), [])

  if (isFetching) return wrapLoading()

  return (
    <form id={`form-${lei}`} onSubmit={() => null}>
      <div className='institution-details-info-container'>
        <h1>
          Institution Details - <span>{name}</span> -{' '}
          <span>{activityYear}</span>
        </h1>
        <ProfileIcon
          iconWidth='20px'
          iconHeight='20px'
          profileText='Profile'
          profileTextSize='18px'
        />
      </div>
      <div className='top-fields center'>
        <Input disabled text name='Name' value={name} />
        <Input disabled text name='LEI' value={lei} />
        <Input disabled text name='Tax ID' value={taxId} />
        <Input disabled text name='Email Domains' value={emailDomains} />
        <Input disabled text name='Quarterly Filer' value={quarterlyFiler} />
        <Input
          disabled
          name='Agency'
          value={`${agency} - ${agencyCodes[agency]}`}
        />
      </div>
      <OtherFields data={data} />
    </form>
  )
}
