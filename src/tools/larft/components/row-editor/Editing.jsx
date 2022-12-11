import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editingRowSet,
  rowCreate,
  rowDelete,
  rowSave
} from '../../data-store/store'
import { scrollToID } from '../../utils/common'
import { isRowTS } from '../../utils/row'
import { EditingActions } from './EditingActions'
import { Parsed } from './Parsed'
import { Piped } from './Piped'

export const Editing = ({ id = 'row-editor' }) => {
  const [isChanged, setChanged] = useState(false)
  const selectedRowID = useSelector(({ larft }) => larft.selectedRowID)
  const selectedColName = useSelector(({ larft }) => larft.selectedColName)
  const editingRow = useSelector(({ larft }) => larft.editingRow)
  const dispatch = useDispatch()

  useEffect(() => setChanged(false), [selectedRowID])

  const changeHandler = e => {
    setChanged(true)
    dispatch(editingRowSet(e))
  }

  const saveHandler = () => {
    setChanged(false)
    dispatch(rowSave())
  }

  const newHandler = () => {
    setChanged(false)
    dispatch(rowCreate())
  }

  const deleteHandler = () => {
    setChanged(false)
    dispatch(rowDelete())
  }

  const PipedActions = (
    <EditingActions
      row={editingRow}
      deleteRow={deleteHandler}
      newRow={newHandler}
      setRow={changeHandler}
      saveRow={isChanged && saveHandler}
      showTextActions={true}
    />
  )

  const ParsedActions = (
    <EditingActions
      row={editingRow}
      deleteRow={deleteHandler}
      newRow={newHandler}
      setRow={changeHandler}
      saveRow={isChanged && saveHandler}
      showTextActions={false}
    />
  )
  return (
    <div className={id} id={id}>
      <Heading id={id} row={editingRow} />
      <Parsed
        currCol={selectedColName}
        row={editingRow}
        onChange={changeHandler}
        textActions={ParsedActions}
      />
      <Piped
        currCol={selectedColName}
        row={editingRow}
        onChange={changeHandler}
        textActions={PipedActions}
      />
    </div>
  )
}

const Heading = ({ id, row }) => {
  const clickHandler = () => scrollToID(id)
  const action = row.rowId ? 'Editing' : 'Creating'
  const descriptor = formatDescriptor(row)

  return (
    <h2 className='clickable' onClick={clickHandler}>
      {action} {descriptor}
    </h2>
  )
}

const formatDescriptor = row => {
  if (isRowTS(row)) return 'Transmittal Sheet'
  if (row.rowId) return `LAR - Row ${row.rowId}`
  return 'a new LAR Row'
}
