import React from 'react'
import { goToFileActions } from '../utils'
import { SavedSection } from './SavedSection'
import { useSelector } from 'react-redux'
import { rowDelete, selectCol, selectRow } from '../data-store/store'

const TSheet = ({ rows, ...props }) => {
  return (
    <SavedSection
      {...props}
      title='Transmittal Sheet'
      rows={rows}
      id='saved-ts'
    />
  )}

const LARs = ({ rows, ...props }) => (
  <SavedSection
    {...props}
    title={`Loan Application Register`}
    rows={rows}
    id='saved-lars'
  />
)

export const SavedRows = () => {
  const ts = useSelector(({ larft }) => larft.ts)
  const lars = useSelector(({ larft }) => larft.lars)
  const selectedColName = useSelector(({ larft }) => larft.selectedColName)
  const selectedRowID = useSelector(({ larft }) => larft.selectedRowID)

  const highlightSelected = r => {
    if (!selectedRowID || !r) return {}
    const highlighted = selectedRowID === r.id 
    return highlighted ? { background: 'lightblue' } : {}
  }

  return (
    <div className='saved-rows'>
      <h2 className='saved clickable' onClick={goToFileActions}>
        Saved Records
      </h2>
      <TSheet
        rows={ts}
        highlightSelected={highlightSelected}
        setSelected={selectRow}
        deleteRow={rowDelete}
        setCurrCol={selectCol}
        selectedColName={selectedColName}
      />
      <LARs
        rows={lars}
        highlightSelected={highlightSelected}
        setSelected={selectRow}
        deleteRow={rowDelete}
        setCurrCol={selectCol}
        selectedColName={selectedColName}
      />
    </div>
  )
}
