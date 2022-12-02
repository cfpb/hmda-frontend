import React from 'react'
import {
  goToFileActions,
  RECORD_IDENTIFIER
} from '../utils'
import { SavedSection } from './SavedSection'

const TSheet = ({ rows, larRowCount, ...props }) => (
  <SavedSection
    {...props}
    title='Transmittal Sheet'
    rows={rows}
    larRowCount={larRowCount}
    id='saved-ts'
  />
)

const LARs = ({ rows, ...props }) => (
  <SavedSection
    {...props}
    title={`Loan Application Register`}
    rows={rows}
    id='saved-lars'
  />
)

export const SavedRows = ({
  selected,
  ts,
  lars,
  setSelected,
  deleteRow,
  setCurrCol,
  currCol,
}) => {
  const highlightSelected = r => {
    if (!selected || !r) return {}
    const highlighted =
      selected.id === r.id &&
      selected[RECORD_IDENTIFIER] === r[RECORD_IDENTIFIER]
    return highlighted ? { background: 'lightblue' } : {}
  }

  return (
    <div className='saved-rows'>
      <h2 className='saved clickable' onClick={goToFileActions}>
        Saved Records
      </h2>
      <TSheet
        rows={ts}
        larRowCount={lars.length > 0 ? lars.length : ''}
        highlightSelected={highlightSelected}
        setSelected={setSelected}
        deleteRow={deleteRow}
        selected={selected}
        setCurrCol={setCurrCol}
        currCol={currCol}
      />
      <LARs
        rows={lars}
        highlightSelected={highlightSelected}
        setSelected={setSelected}
        deleteRow={deleteRow}
        selected={selected}
        setCurrCol={setCurrCol}
        currCol={currCol}
      />
    </div>
  )
}
