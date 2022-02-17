import React from 'react'
import { goTo } from './utils'
import { Parsed } from './Parsed'
import { Piped } from './Piped'
import { EditingActions } from './EditingActions'

export const Editing = ({
  row,
  setRow,
  currCol,
  setCurrCol,
  saveRow,
  newRow,
  deleteRow,
  id = 'raw-row',
}) => {
  const PipedActions = (
    <EditingActions
      row={row}
      deleteRow={deleteRow}
      newRow={newRow}
      setRow={setRow}
      saveRow={saveRow}
      showTextActions={true}
    />
  )
  return (
    <div className={id} id={id}>
      <h2 className='clickable' onClick={() => goTo(id)}>
        {row.rowId ? 'Editing' : 'Creating'}{' '}
        {row['Record Identifier'] === '1'
          ? 'Transmittal Sheet'
          : row.rowId
          ? `LAR Row ${row.rowId}`
          : 'a new LAR Row'}
      </h2>
      <EditingActions
        row={row}
        deleteRow={deleteRow}
        newRow={newRow}
        setRow={setRow}
        saveRow={saveRow}
        showTextActions={false}
      />
      <Parsed
        currCol={currCol}
        row={row}
        setRow={setRow}
        setCurrCol={setCurrCol}
      />
      <Piped
        currCol={currCol}
        row={row}
        setRow={setRow}
        saveRow={saveRow}
        setCurrCol={setCurrCol}
        textActions={PipedActions}
      />
    </div>
  )
}
