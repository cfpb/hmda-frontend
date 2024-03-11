export const editingRowSetReducer = (state, { payload }) => {
  state.editingRow = payload
  state.hasNewChanges = true
}
