import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  editingRowSet,
  rowCreate,
  rowDelete,
  rowSave,
} from '../../data-store/store'
import { scrollToID } from '../../utils/common'
import { isRowTS } from '../../utils/row'
import { EditingActions } from './EditingActions'
import { EditingParsed } from './EditingParsed'
import { EditingPiped } from './EditingPiped'

/**
 * Combined section allowing users to edit a single row's content
 * either as raw pipe-delimited string or parsed into individual
 * inputs.
 *
 * @param {String} id Section identifier
 */
export const Editing = ({ id = 'row-editor' }) => {
  const [isChanged, setChanged] = useState(false)
  const selectedRowID = useSelector(({ larft }) => larft.selectedRowID)
  const selectedColName = useSelector(({ larft }) => larft.selectedColName)
  const editingRow = useSelector(({ larft }) => larft.editingRow)
  const dispatch = useDispatch()

  useEffect(() => setChanged(false), [selectedRowID])

  const changeHandler = (e) => {
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
      <EditingParsed
        currCol={selectedColName}
        row={editingRow}
        onChange={changeHandler}
        textActions={ParsedActions}
      />
      <EditingPiped
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

const formatDescriptor = (row) => {
  if (isRowTS(row)) return 'Transmittal Sheet'
  if (row.rowId) return `LAR - Row ${row.rowId}`
  return 'a new LAR Row'
}
