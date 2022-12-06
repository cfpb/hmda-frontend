import React from 'react'
import { useSelector } from 'react-redux'
import { selectCol } from './redux/store'
import { getSchema, goTo, parseRow, stringifyRow, log } from './utils'
import { useDispatch } from 'react-redux'

export const grabRawArea = () => document.getElementById('rawArea')

const findPipes = row => stringifyRow(row).matchAll(new RegExp(/\|/, 'gi'))

const highlight = text => <span className='highlight'> {text}</span>

// Compare the current cursor position to the positions of
//   the column delimiters to determine which LAR field is
//   currently being edited/focused.
const updateCurrentColumn = (setFn, row, dispatch) => {
  const cursorPos = getCursorPos(grabRawArea()).start
  const pipes = findPipes(row)

  let colNum = 0
  let pipeIter = pipes.next()

  while (!pipeIter.done && pipeIter.value.index < cursorPos) {
    pipeIter = pipes.next()
    colNum++
  }

  dispatch(setFn(getSchema(row)[colNum]))
}

const CurrentColumn = ({ column }) => {
  if (!column?.toString()) return null
  return (
    <div className='editing'>
      Field name: {highlight(column.fieldName)}
      <br />
      Column: {highlight(column.fieldIndex + 1)}{' '}
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
      <textarea id='paste-button-input' onChange={handlePaste} hidden />
    </>
  )
}

export const Piped = ({
  id = 'piped',
  currCol,
  row,
  textActions, // reduces callback passing
  onChange,
}) => {
  return (
    <div className={id} id={id}>
      <h3 className='title clickable' onClick={() => goTo(id)}>
        Pipe-Delimited Values
      </h3>
      {textActions}
      <PasteableTextArea onChange={onChange} />
      <CurrentColumn column={currCol} row={row} />
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
