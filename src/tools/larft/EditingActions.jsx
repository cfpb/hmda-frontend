import React from 'react'
import { copyPiped, pastePiped } from './clipboard'

const isEditing = row => row && row.rowId > -1

export const EditingActions = ({
  row,
  deleteRow,
  newRow,
  setRow,
  saveRow,
  showTextActions = true,
}) => {
  const paste = pastePiped(setRow)
  const saveButtonText = isEditing(row) ? `Update Row ${row.rowId}` : 'Save Row'

  let deleteButton
  if (isEditing(row)) {
    deleteButton = (
      <button className='delete-row' onClick={deleteRow}>
        {`Delete Row ${row.rowId}`}
      </button>
    )
  }

  return (
    <div className='action-wrapper raw'>
      <div className='row-actions'>
        <button className='save-row' onClick={saveRow}>
          {saveButtonText}
        </button>
        {deleteButton}
        <button className='new-row' onClick={newRow}>
          New Row
        </button>
      </div>
      {!showTextActions ? null : (
        <div className='textarea-actions'>
          <button className='copy-row' onClick={copyPiped}>
            Copy to Clipboard
          </button>
          <button className='paste-row' onClick={paste}>
            Paste from Clipboard
          </button>
        </div>
      )}
    </div>
  )
}
