import React, { useState } from 'react'
import { useFocusOnSelectedColumn } from '../../hooks/useFocusOnSelectedColumn'
import { getSchema } from '../../schema/index'
import { parseRow } from '../../utils/row'
import { ParsedHeader } from './ParsedHeader'
import { matchColumnFilter } from '../../utils/search'
import { ParsedRow } from './ParsedRow'
import { ParsedTable } from './ParsedTable'

/**
 * Allows for interaction with the currently selected LAR/TS row,
 * presenting content as a table with each field on it's
 * own row.
 *
 * Enumerated fields are presented with input assistance
 * (drop-downs and/or buttons).
 *
 * @param {String} id
 * @param {Object} row Selected row
 * @param {String} currCol ID of selected column within row
 * @param {ReactElement} textActions Action bar for section
 * @param {Function} onChange Row update handler
 */
export const EditingParsed = ({
  id = 'parsed-row',
  row,
  currCol,
  textActions,
  onChange,
}) => {
  const [filter, setFilter] = useState('')
  const setFocus = useFocusOnSelectedColumn(currCol)

  const _onChange = (e) => {
    const newRow = { ...row }
    newRow[e.target.id] = e.target.value
    onChange(newRow)
  }

  const tableRows = getSchema(row)
    .filter((x) => matchColumnFilter(x, filter))
    .map((column) => (
      <ParsedRow
        key={column.fieldName}
        column={column}
        onFocus={setFocus}
        onChange={_onChange}
        highlightClass={getHighlightClass(column, currCol)}
        row={parseRow(row)}
      />
    ))

  return (
    <div className='parsed' id={id}>
      <ParsedHeader filter={filter} setFilter={setFilter} id={id} />
      {textActions}
      <ParsedTable rows={tableRows} />
    </div>
  )
}

const getHighlightClass = (currentField, selectedColumnName) => {
  const isMatch =
    selectedColumnName &&
    currentField &&
    selectedColumnName === currentField.fieldName

  return isMatch ? 'highlight' : ''
}
