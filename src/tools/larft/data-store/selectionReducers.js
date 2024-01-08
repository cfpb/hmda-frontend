export const selectColReducer = (state, { payload }) => {
  state.selectedColName = payload
}

export const selectRowReducer = (state, { payload }) => {
  state.selectedRowID = payload

  if (state.ts[0]?.id == payload) state.editingRow = state.ts[0]
  else state.editingRow = state.lars.filter((row) => row.id == payload)[0] || {}
}
