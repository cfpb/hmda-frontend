import { configureStore, createSlice } from '@reduxjs/toolkit'
import { parseRow } from '../utils/row'
import { editingRowSetReducer } from './editorReducers'
import { fileDownloadReducer, fileUploadReducer } from './fileReducers'
import {
  rowCreateReducer,
  rowDeleteReducer,
  rowSaveReducer,
  rowsResetReducer,
} from './rowReducers'

import { selectColReducer, selectRowReducer } from './selectionReducers'

export const initialState = {
  ts: [],
  lars: [],
  unparsable: {},
  editingRow: parseRow('1|'),
  selectedRowID: null,
  selectedColName: null,
  filename: null,
  hasNewChanges: false,
}

const larftSlice = createSlice({
  name: 'larft',
  initialState,
  reducers: {
    fileUpload: fileUploadReducer,
    fileDownload: fileDownloadReducer,

    rowSave: rowSaveReducer,
    rowDelete: rowDeleteReducer,
    rowCreate: rowCreateReducer,
    rowsReset: rowsResetReducer,

    editingRowSet: editingRowSetReducer,

    selectCol: selectColReducer,
    selectRow: selectRowReducer,
  },
})

const larftStore = configureStore({
  devTools: import.meta.env.NODE_ENV !== 'production',
  reducer: {
    larft: larftSlice.reducer,
  },
})

export const {
  fileUpload,
  fileDownload,

  rowSave,
  rowDelete,
  rowCreate,
  rowsReset,

  editingRowSet,

  selectCol,
  selectRow,
} = larftSlice.actions

export default larftStore
