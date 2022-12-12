import { getSchema, LAR_SCHEMA, TS_SCHEMA } from '../schema'
import { isString } from './common'

const PIPE_DELIMITER = "|"
const RECORD_IDENTIFIER = "Record Identifier"

let NEXT_ID = 0

export const createRowID = () => (NEXT_ID++).toString()

// Inject a row identifier
export const addRowID = (row, idx) => ({
  ...row,
  rowId: (idx + 1).toString(),
})

export const isEditing = row => row && row.rowId > -1

export const isRowTS = row => {
  const isStringMatch = isString(row) && row.match(/^1/)
  const isObjectMatch = row && row[RECORD_IDENTIFIER] === '1'
  return isStringMatch || isObjectMatch
}

export const isRowLAR = row => {
  const isStringMatch = isString(row) && row.match(/^2/)
  const isObjectMatch = row && row[RECORD_IDENTIFIER] === '2'
  return isStringMatch || isObjectMatch
}

export const stringifyRow = row =>
  getSchema(row)
    .map(column => row && row[column.fieldName])
    .join(PIPE_DELIMITER)


export const parseRow = (row = {}) => {
  if (!row) return {}
  if (!isString(row)) return row

  const schema = row.match(/^1/) ? TS_SCHEMA : LAR_SCHEMA

  return row.split(PIPE_DELIMITER).reduce((prev, currVal, currIdx) => {
    const columnSchema = schema[currIdx]
    if (!columnSchema) return prev

    prev[columnSchema.fieldName] = currVal
    return prev
  }, {})
}
