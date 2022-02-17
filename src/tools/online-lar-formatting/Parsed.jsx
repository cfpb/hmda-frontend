import React, { useState } from 'react'
import { useEffect } from 'react'
import { ParsedRow } from './ParsedRow'
import { getSchema, parseRow } from './utils'
import { ParsedHeader } from './ParsedHeader'
import { ParsedTable } from './ParsedTable'
import { applyFilter, checkHighlighted } from './parsedHelpers'

function useFocusOnSelectedColumn(col, setCurrCol) {
  // Bring the focused column into view
  useEffect(() => {
    const el = document.getElementById(`${col?.fieldName}`)
    el?.parentElement?.parentElement?.scrollIntoView({
      block: 'nearest',
      behavior: 'auto',
    })
    if (el) el.parentElement.parentElement.style = {}
  }, [col])
  
  // Provide a function that will set focus to this column
  const focus = target => {
    if (col?.fieldIndex !== target?.fieldIndex) setCurrCol(target)
  }

  return focus
}

export const Parsed = ({
  id = 'parsed-row',
  row,
  setRow,
  currCol,
  setCurrCol
}) => {
  const [filter, setFilter] = useState('')
  const setFocus = useFocusOnSelectedColumn(currCol, setCurrCol)

  const _onChange = e => {
    const newRow = { ...row }
    newRow[e.target.id] = e.target.value
    setRow(newRow)
  }

  const tableRows = getSchema(row)
    .filter(x => applyFilter(x, filter))
    .map(column => (
      <ParsedRow
        column={column}
        onFocus={setFocus}
        onChange={_onChange}
        highlightClass={checkHighlighted(column, currCol)}
        row={parseRow(row)}
      />
    ))

  return (
    <div className='parsed' id={id}>
      <ParsedHeader filter={filter} setFilter={setFilter} id={id} />
      <ParsedTable rows={tableRows} />
    </div>
  )
}
