// Derive table height by number of rows
export const calcTableHeight = rows => {
  const ROW_HEIGHT = 32

  let displayedRows = 0

  if (rows.length < 2) displayedRows = 3
  else displayedRows = Math.min(rows.length * 2, 8)

  return displayedRows * ROW_HEIGHT
}

// Derive column width based on length of field name
export const formatColWidth = (f, adjustment = 0) => {
  let width = Math.max(f.fieldName.length * 10, 200)
  width += adjustment
  
  return `${width}px`
}

// Build element ID from field name
export const formatFieldID = f => {
  return 'header-' + f.fieldName.toLowerCase().replaceAll(' ', '-')
}

// Collect props that can be passed down to our custom component
export const getUsableProps = props => {
  const usableProps = {}
  Object.keys(props)
    .filter(p_key => !['sortDirection'].includes(p_key))
    .forEach(p_key => (usableProps[p_key] = props[p_key]))

  return usableProps
}

// Should highlight the current column?
export const columnIsSelected = (curr, field) => curr === field.fieldName

// Inject a row identifier
export const addRowId = (row, idx) => ({
  ...row,
  rowId: (idx + 1).toString(),
})

// Update TS row with number of LAR entries
export const tsUpdateLarCount = state => {
  if (state.ts?.length) {
    state.ts[0]['Total Number of Entries Contained in Submission'] =
      state.lars.length
  }
}
