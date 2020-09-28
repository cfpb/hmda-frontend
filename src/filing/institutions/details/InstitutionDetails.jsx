import React, { useEffect } from 'react'
import { agencyCodes } from '../constants'
import { Input } from './InstitutionInput'
import { OtherFields } from './OtherFields'
import { wrapLoading } from '../wrapLoading'

export const InstitutionDetails = ({ data }) => {
  const {
    name,
    lei,
    agency,
    quarterlyFiler,
    taxId,
    emailDomains,
    activityYear,
    isFetching
  } = data

  useEffect(() => window.scrollTo(0, 0), [])

  if (isFetching) return wrapLoading()

  return (
    <form id={`form-${lei}`} onSubmit={() => null}>
      <h1>
        Institution Details - <span>{name}</span> - <span>{activityYear}</span>
      </h1>
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
