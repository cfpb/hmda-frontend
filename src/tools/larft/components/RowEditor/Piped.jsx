import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCol } from '../../data-store/store'
import { getSchema } from '../../schema/index'
import { highlightText, scrollToID } from '../../utils/common'
import { parseRow, stringifyRow } from '../../utils/row'
import { updateCurrentColumn } from '../../utils/textArea'

export const Piped = ({
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

const PasteableTextArea = ({ onChange }) => {
  const row = useSelector(({ larft }) => larft.editingRow)
  const dispatch = useDispatch()

  const updateSelectedRow = e =>
    onChange({
      ...parseRow(e.target.value.trim()),
      id: row?.id,
      rowId: row.rowId,
    })

  const handleChange = () => updateCurrentColumn(selectCol, row, dispatch)
  const handlePaste = e => setRow(parseRow(e.target.value))

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

const CurrentColumn = ({ column, row }) => {
  const schema = getSchema(row)
  const index = schema.findIndex(obj => obj.fieldName == column)

  if (!column?.toString()) return null

  return (
    <div className='editing'>
      Field name: {highlightText(column)}
      <br />
      Column: {highlightText(index + 1)}
    </div>
  )
}
