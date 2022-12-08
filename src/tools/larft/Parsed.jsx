import React, { useState } from "react";
import { useEffect } from "react";
import { ParsedRow } from "./ParsedRow";
import { getSchema, parseRow } from "./utils";
import { ParsedHeader } from "./ParsedHeader";
import { ParsedTable } from "./ParsedTable";
import { applyFilter, checkHighlighted } from "./parsedHelpers";
import { useDispatch } from 'react-redux'
import { selectCol } from './data-store/store'

function useFocusOnSelectedColumn(colName) {
  const dispatch = useDispatch()

  // Bring the focused column into view
  useEffect(() => {
    const el = document.getElementById(`${colName}`);
    const grandparent = el?.parentElement?.parentElement;
    if (grandparent) {
      grandparent.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "auto",
      });
      grandparent.scrollTop = 0;
      grandparent.style = {};
    }
  }, [colName]);

  // Provide a function that will set focus to this column
  const focus = target => {
    if (colName !== target?.fieldName) dispatch(selectCol(target.fieldName))
  }

  return focus;
}

export const Parsed = ({ id = 'parsed-row', row, currCol, textActions, onChange }) => {
  const [filter, setFilter] = useState('')
  const setFocus = useFocusOnSelectedColumn(currCol)

  const _onChange = e => {
    const newRow = { ...row }
    newRow[e.target.id] = e.target.value
    onChange(newRow)
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
