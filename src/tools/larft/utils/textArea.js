import { getSchema } from '../schema'
import { stringifyRow } from './row'

/**
 * Identify indexes of pipes (|) in a row string
 *
 * @param {*} row
 * @returns Iterator of pipe locations
 */
export const findPipes = (row) =>
  stringifyRow(row).matchAll(new RegExp(/\|/, 'gi'))

export const grabRawArea = () => document.getElementById('rawArea')

/**
 * Determines the current cursor position within the EditingPiped textarea
 * in order to update the currently selected column.
 *
 * Thanks https://stackoverflow.com/a/7745998/15861235
 *
 * @param {HTMLElement} input Textare
 * @returns Number
 */
export const getCursorPos = (input) => {
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

/**
 * Compare the current cursor position to the positions of the column delimiters to
 * determine which LAR field is currently being edited/focused.
 *
 * @param {Function} setFn selectCol handler
 * @param {String} row Row string
 * @param {Function} dispatch
 */
export const updateCurrentColumn = (setFn, row, dispatch) => {
  const cursorPos = getCursorPos(grabRawArea()).start
  const pipes = findPipes(row)

  let colNum = 0
  let pipeIter = pipes.next()

  while (!pipeIter.done && pipeIter.value.index < cursorPos) {
    pipeIter = pipes.next()
    colNum++
  }

  const fieldName = getSchema(row)[colNum]?.fieldName

  dispatch(setFn(fieldName))
}
