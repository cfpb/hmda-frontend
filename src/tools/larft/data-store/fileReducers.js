import { createFileContent, downloadFile, formatFileName } from '../utils/file'
import {
  addRowID,
  createRowID,
  isRowLAR,
  isRowTS,
  parseRow,
} from '../utils/row'
import { rowCreateReducer } from './rowReducers'

export const fileUploadReducer = (state, { payload }) => {
  const content = payload
  if (!content) return

  const up_rows = content.split('\n')
  if (!up_rows.length) return

  const _ts = []
  const _lar = []
  const _unparsable = {}

  up_rows.forEach((_row, idx) => {
    const parsed = parseRow(_row)
    parsed.id = createRowID()

    if (!_row?.trim().length) return // Ignore blank lines
    if (isRowTS(parsed)) return _ts.push(parsed)
    if (isRowLAR(parsed)) return _lar.push(parsed)

    _unparsable[idx + 1] = _row // Track unparsable rows
  })

  state.filename = formatFileName(_ts[0])
  state.ts = _ts.map(addRowID)
  state.lars = _lar.map(addRowID)
  state.unparsable = _unparsable

  rowCreateReducer(state)
}

export const fileDownloadReducer = (state) => {
  const { filename, ts, lars } = state

  downloadFile(`${filename}.txt`, createFileContent(ts, lars))

  state.hasNewChanges = false
}
