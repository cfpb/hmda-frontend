import React from 'react'
import { useSelector } from 'react-redux'
import { scrollToFileActions } from '../../utils/common'
import { SavedSection } from './SavedSection'

/**
 * Displays tables containing any user uploaded/saved
 * LAR and TS data.
 */
export function SavedRows() {
  const ts = useSelector(({ larft }) => larft.ts)
  const lars = useSelector(({ larft }) => larft.lars)

  return (
    <div className='saved-rows'>
      <Header />
      <TSheet rows={ts} />
      <LARs rows={lars} />
    </div>
  )
}

function Header() {
  return (
    <h2 className='saved clickable' onClick={scrollToFileActions}>
      Saved Records
    </h2>
  )
}

function TSheet({ rows }) {
  return <SavedSection rows={rows} title='Transmittal Sheet' id='saved-ts' />
}

function LARs({ rows }) {
  return (
    <SavedSection
      rows={rows}
      title='Loan Application Register'
      id='saved-lars'
    />
  )
}
