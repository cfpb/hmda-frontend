import { cloneObject, createID, formatFileName, isLAR, isTS, log, parseRow } from '../utils'
import { collapseAll } from '../Accordion'
import { initialState } from './store'
import { addRowId, tsUpdateLarCount } from '../SavedRows/service'

export const rowSaveReducer = (state) => {
  const selected = state.editingRow
  if (!selected) return

  let vals
  let updateKey

  if (isTS(selected)) {
    // Save Filename when TS updates
    state.filename = formatFileName(selected)

    vals = state.ts
    updateKey = 'ts'
  } else if (isLAR(selected)) {
    vals = state.lars
    updateKey = 'lars'
  }

  // Only allow single TS row
  if (updateKey === 'ts') {
    log('[Save] Saving TS row...')

    const nextTS = cloneObject(selected)
    nextTS.id = createID()
    nextTS.rowId = 1
    state[updateKey] = [nextTS] // Save TS
    rowCreateReducer(state) // Clear Pipe-delimited area
    return
  } else {
    log('[Save] Saving LAR row...')

    // Update existing item
    if (!!selected?.id) {
      const updateIndex = vals.findIndex(el => el?.id === selected.id)
      if (updateIndex > -1) {
        vals[updateIndex] = cloneObject(selected) // Save rows
        state[updateKey] = vals 
        rowCreateReducer(state) // Clear Pipe-delimited area
        return
      }
    }

    // Append new item
    log('[Save] Adding new item.')
    const obj = cloneObject(selected)
    obj.id = createID()
    obj.rowId = vals.length + 1
    vals.push(obj)
    state[updateKey] = vals  // Save rows
    rowCreateReducer(state) // Clear Pipe-delimited area
    tsUpdateLarCount(state)

    // Focus on newly added item?
  }
}

export const rowDeleteReducer = (state) => {
  const confirm = window.confirm('Are you sure you want to delete this row?')
  if (!confirm) return

  const _currentRow = state.editingRow
  log('[Delete] Deleting row...', _currentRow)

  if (isTS(_currentRow)) state.ts = initialState.ts
  else
    state.lars = state.lars
      .filter(row => row.id !== _currentRow.id)
      .map(addRowId)

  rowCreateReducer(state)
  tsUpdateLarCount(state)
}

export const rowCreateReducer = (state) => {
  const nextRow = parseRow(state.ts.length ? "2|" : "1|")
  nextRow.id = createID()

  state.selectedColName = null // Clear selected column
  collapseAll() // Collapse all field enumerations
  state.editingRow = nextRow // Display this row in the Editor
  state.selectedRowID = null

}

export const rowsResetReducer = (state) => {
  const keys = [
    'ts',
    'lars',
    'unparsable',
    'editingRow',
    'selectedRowID',
    'selectedColName',
    'filename',
    'hasNewChanges',
  ]

  keys.forEach(k => state[k] = initialState[k])
}


