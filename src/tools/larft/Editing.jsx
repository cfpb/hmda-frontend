import React, { useEffect } from 'react'
import { goTo, RECORD_IDENTIFIER } from './utils'
import { Parsed } from './Parsed'
import { Piped } from './Piped'
import { EditingActions } from './EditingActions'
import { useState } from 'react'
import { editingRowSet, rowCreate, rowDelete, rowSave } from './redux/store'
import { useDispatch, useSelector } from 'react-redux'


export const Editing = ({ id = 'raw-row' }) => {
  const [isChanged, setChanged] = useState(false)
  const selectedRowID = useSelector(({ larft }) => larft.selectedRowID)
  const selectedColName = useSelector(({ larft }) => larft.selectedColName)
  const editingRow = useSelector(({ larft }) => larft.editingRow)
  const dispatch = useDispatch()

  useEffect(() => setChanged(false), [selectedRowID])

  const changeInterceptor = e => {
    setChanged(true)
    dispatch(editingRowSet(e))
  }

  const saveInterceptor = () => {
    setChanged(false)
    dispatch(rowSave())
  }

  const newInterceptor = () => {
    setChanged(false)
    dispatch(rowCreate())
  }

  const deleteInterceptor = () => {
    setChanged(false)
    dispatch(rowDelete())
  }

  const PipedActions = (
    <EditingActions
      row={editingRow}
      deleteRow={deleteInterceptor}
      newRow={newInterceptor}
      setRow={changeInterceptor}
      saveRow={isChanged && saveInterceptor}
      showTextActions={true}
    />
  )

  const ParsedActions = (
    <EditingActions
      row={editingRow}
      deleteRow={deleteInterceptor}
      newRow={newInterceptor}
      setRow={changeInterceptor}
      saveRow={isChanged && saveInterceptor}
      showTextActions={false}
    />
  )
  return (
    <div className={id} id={id}>
      <h2 className='clickable' onClick={() => goTo(id)}>
        {editingRow.rowId ? 'Editing' : 'Creating'}{' '}
        {editingRow[RECORD_IDENTIFIER] === '1'
          ? 'Transmittal Sheet'
          : editingRow.rowId
          ? `LAR Row ${editingRow.rowId}`
          : 'a new LAR Row'}
      </h2>

      <Parsed
        currCol={selectedColName}
        row={editingRow}
        onChange={changeInterceptor}
        textActions={ParsedActions}
      />
      <Piped
        currCol={selectedColName}
        row={editingRow}
        onChange={changeInterceptor}
        textActions={PipedActions}
      />
    </div>
  )
}
