import React from 'react'
import { getSchema, parseRow, stringifyRow } from './utils'

const grabRawArea = () => document.getElementById('rawArea')

const findPipes = row => stringifyRow(row).matchAll(new RegExp(/\|/, 'gi'))

const highlight = text => <span className='highlight'> {text}</span>

// Compare the current cursor position to the positions of
// the column delimiters to determine which LAR field is
// currently being edited/focused
const updateCurrentColumn = (setFn, row) => {
  const cursorPos = getCursorPos(grabRawArea()).start
  const pipes = findPipes(row)

  let colNum = 0
  let pipeIter = pipes.next()

  while (!pipeIter.done && pipeIter.value.index < cursorPos) {
    pipeIter = pipes.next()
    colNum++
  }

  setFn(getSchema(row)[colNum])
}

export const RawRow = ({
  row,
  setRow,
  currCol,
  setCurrCol,
  saveRow,
  newRow,
  deleteRow
}) => {
  return (
    <div className='raw-row'>
      <label htmlFor='rawArea'>
        <h3>Submission File Row</h3>
        <div>
          {row.rowId ? 'Editing' : 'Creating'}{' '}
          {row['Record Identifier'] === '1'
            ? 'Transmittal Sheet'
            : row.rowId
            ? `LAR row ${row.rowId}`
            : 'new LAR row'}
        </div>
        <button
          className='save-row'
          onClick={() => {
            saveRow(row)
            newRow()
          }}
        >
          {row?.rowId ? `Update Row ${row.rowId}` : 'Save Row'}
        </button>
        {row.rowId > -1 && (
          <button className='delete-row' onClick={() => deleteRow(row)}>
            {`Delete Row ${row.rowId}`}
          </button>
        )}
        <button className='new-row' onClick={newRow}>
          New Row
        </button>
      </label>
      {!!currCol?.toString() && (
        <div className='editing'>
          Field name: {highlight(currCol.fieldName)}
          <br />
          Column: {highlight(currCol.fieldIndex + 1)}{' '}
        </div>
      )}
      <textarea
        id='rawArea'
        value={stringifyRow(row)}
        onChange={e =>
          setRow({ ...parseRow(e.target.value.trim()), id: row?.id, rowId: row.rowId })
        }
        onClick={() => updateCurrentColumn(setCurrCol, row)}
        onKeyUp={() => updateCurrentColumn(setCurrCol, row)}
      />
    </div>
  )
}

// Thanks https://stackoverflow.com/a/7745998/15861235
function getCursorPos(input) {
  if ('selectionStart' in input && document.activeElement == input) {
    return {
      start: input.selectionStart,
      end: input.selectionEnd,
    }
  } else if (input.createTextRange) {
    var sel = document.selection.createRange()
    if (sel.parentElement() === input) {
      var rng = input.createTextRange()
      rng.moveToBookmark(sel.getBookmark())
      for (
        var len = 0;
        rng.compareEndPoints('EndToStart', rng) > 0;
        rng.moveEnd('character', -1)
      ) {
        len++
      }
      rng.setEndPoint('StartToStart', input.createTextRange())
      for (
        var pos = { start: 0, end: len };
        rng.compareEndPoints('EndToStart', rng) > 0;
        rng.moveEnd('character', -1)
      ) {
        pos.start++
        pos.end++
      }
      return pos
    }
  }
  return -1
}
