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
    const grandparent = el?.parentElement?.parentElement
    if (!!grandparent) {
      grandparent.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'auto',
      })
      grandparent.scrollTop = 0;
      grandparent.style = {}
    }

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
  setCurrCol,
  textActions,
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
        key={column.fieldName}
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
      {textActions}
      <ParsedTable rows={tableRows} />
    </div>
  )
}
