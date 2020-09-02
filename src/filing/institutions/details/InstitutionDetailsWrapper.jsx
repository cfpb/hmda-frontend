import React, { useEffect } from 'react'
import { wrapLoading } from '../wrapLoading'
import { InstitutionDetails } from './InstitutionDetails'
import './InstitutionsDetails.css'

const InstitutionDetailsWrapper = (props) => {
  let { institutions, close, selected, history, match } = props

  const onClose = () => {
    close()
    history.replace(match.url)
  }

  useEffect(() => {
    history.push(`${match.url}/${selected}/details`)
    window.onpopstate = () => onClose()
    return () => (window.onpopstate = null)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!window.location.pathname.match(/details$/)) onClose()
    // eslint-disable-next-line
  }, [window.location.key, match])

  if (!institutions || !institutions.fetched) return wrapLoading()
  institutions = institutions.institutions

  return (
    <main id='main-content' className='institutions-details full-width'>
      <button className='back' type='button' onClick={onClose}>
        &#9668; Back
      </button>
      <InstitutionDetails data={institutions[selected]} />
    </main>
  )
}

export default InstitutionDetailsWrapper
