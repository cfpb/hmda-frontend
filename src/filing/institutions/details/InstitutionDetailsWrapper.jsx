import React from 'react'
import { Link } from 'react-router-dom'
import { wrapLoading } from '../wrapLoading'
import { InstitutionDetails } from './InstitutionDetails'
import './InstitutionsDetails.css'

const InstitutionDetailsWrapper = (props) => {
  let { institutions, match } = props
  const selected = match.params.institution

  if (!institutions || !institutions.fetched) return wrapLoading()
  institutions = institutions.institutions

  return (
    <main id='main-content' className='institutions-details full-width'>
      <Link
        to={match.url.split('/').slice(0, -1).join('/')}
        className='button back'
      >
        &#9668; Back
      </Link>
      <InstitutionDetails data={institutions[selected]} />
    </main>
  )
}

export default InstitutionDetailsWrapper
