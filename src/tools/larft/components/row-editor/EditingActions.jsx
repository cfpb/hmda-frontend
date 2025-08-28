import React from 'react'
import { copyPiped, pastePiped } from '../../utils/clipboard'
import { isEditing } from '../../utils/row'

/**
 * Action bar to save, delete, clear, copy, paste currently selected row.
 *
 * @param {Object} row Currently selected row
 * @param {Function} deleteRow
 * @param {Function} newRow Handler to clear currently selected row
 * @param {Function} setRow Handler to set the currently selected row
 * @param {Function} saveRow Handler to persist/update currently select row
 * @param {Function} showTextActions Display buttons for Copy/Paste functionality
 */
export function EditingActions({
  row,
  deleteRow,
  newRow,
  setRow,
  saveRow,
  showTextActions = true,
}) {
  return (
    <div className='action-wrapper raw'>
      <div className='row-actions'>
        <SaveButton row={row} fn={saveRow} />
        <DeleteButton row={row} fn={deleteRow} />
        <NewButton fn={newRow} />
      </div>
      <TextAreaActions show={showTextActions} paste={pastePiped(setRow)} />
    </div>
  )
}

function SaveButton({ row, fn }) {
  const buttonText = isEditing(row) ? `Update Row ${row.rowId}` : 'Save Row'

  return (
    <button className='save-row' onClick={fn || undefined} disabled={!fn}>
      {buttonText}
    </button>
  )
}

function DeleteButton({ row, fn }) {
  if (!isEditing(row)) return null

  return (
    <button className='delete-row' onClick={fn}>
      {`Delete Row ${row.rowId}`}
    </button>
  )
}

function NewButton({ fn }) {
  return (
    <button className='new-row' onClick={fn}>
      New Row
    </button>
  )
}

function TextAreaActions({ show, paste }) {
  if (!show) return null

  return (
    <div className='textarea-actions'>
      <button className='copy-row' onClick={copyPiped}>
        Copy to Clipboard
      </button>
      <button className='paste-row' onClick={paste}>
        Paste from Clipboard
      </button>
    </div>
  )
}
