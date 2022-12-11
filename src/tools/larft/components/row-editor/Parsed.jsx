import React, { useState } from 'react'
import { useFocusOnSelectedColumn } from '../../hooks/useFocusOnSelectedColumn'
import { getSchema } from '../../schema/index'
import { parseRow } from '../../utils/row'
import { ParsedHeader } from './ParsedHeader'
import { matchColumnFilter, getHighlightClass } from './parsedHelpers'
import { ParsedRow } from './ParsedRow'
import { ParsedTable } from './ParsedTable'

export const Parsed = ({
  id = 'parsed-row',
  row,
  currCol,
  textActions,
  onChange,
}) => {
  const [filter, setFilter] = useState('')
  const setFocus = useFocusOnSelectedColumn(currCol)

  const _onChange = e => {
    const newRow = { ...row }
    newRow[e.target.id] = e.target.value
    onChange(newRow)
  }

  const tableRows = getSchema(row)
    .filter(x => matchColumnFilter(x, filter))
    .map(column => (
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
