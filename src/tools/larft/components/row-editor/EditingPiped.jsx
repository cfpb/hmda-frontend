import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCol } from '../../data-store/store'
import { getSchema } from '../../schema/index'
import { highlightText, scrollToID } from '../../utils/common'
import { parseRow, stringifyRow } from '../../utils/row'
import { updateCurrentColumn } from '../../utils/textArea'

/**
 * Allows for interaction with the currently selected LAR/TS row,
 * presenting content as a pip-delimited string.
 *
 * @param {String} id
 * @param {Object} row Selected row
 * @param {String} currCol ID of selected column within row
 * @param {ReactElement} textActions Action bar for section
 * @param {Function} onChange Row update handler
 */
export const EditingPiped = ({
  id = 'piped',
  currCol,
  row,
  textActions, // reduces callback passing
  onChange,
}) => {
  return (
    <div className={id} id={id}>
      <h3 className='title clickable' onClick={() => scrollToID(id)}>
        Pipe-Delimited Values
      </h3>
      {textActions}
      <PasteableTextArea onChange={onChange} />
      <CurrentColumn column={currCol} row={row} />
    </div>
  )
}

/**
 * Textarea that displays the pipe-separated text of the currently selected
 * row. Also includes a separate, hidden, text area that specifically handles
 * the paste functionality and updates the currently edited row as necessary.
 *
 * @param {Function} onChange Input change handler
 */
const PasteableTextArea = ({ onChange }) => {
  const row = useSelector(({ larft }) => larft.editingRow)
  const dispatch = useDispatch()

  const updateSelectedRow = (e) =>
    onChange({
      ...parseRow(e.target.value.trim()),
      id: row?.id,
      rowId: row.rowId,
    })

  const handleChange = () => updateCurrentColumn(selectCol, row, dispatch)
  const handlePaste = (e) => setRow(parseRow(e.target.value))

  return (
    <>
      <textarea
        id='rawArea'
        value={stringifyRow(row)}
        onChange={updateSelectedRow}
        onClick={handleChange}
        onKeyUp={handleChange}
      />
      <textarea hidden id='paste-button-input' onChange={handlePaste} />
    </>
  )
}

/**
 * Provides a label for the currently focused field, including
 * the Field Name along with column index.
 *
 * @param {String} column Field name
 * @param {Object} row LAR/TS row content
 */
const CurrentColumn = ({ column, row }) => {
  const schema = getSchema(row)
  const index = schema.findIndex((obj) => obj.fieldName == column)

  if (!column?.toString()) return null

  return (
    <div className='editing'>
      Field name: {highlightText(column)}
      <br />
      Column: {highlightText(index + 1)}
    </div>
  )
}
