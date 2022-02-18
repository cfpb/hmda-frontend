import larSchema from './SchemaLar.json'
import tsSchema from './SchemaTs.json'

export const LAR_SCHEMA = larSchema.schema
export const TS_SCHEMA = tsSchema.schema
export const DELIMITER = '|'

let NEXT_ID = 0
export const createID = () => (NEXT_ID++).toString()

export const isTS = r => r && r['Record Identifier'] === '1'
export const isLAR = r => r && r['Record Identifier'] === '2'

export const cloneObject = item => JSON.parse(JSON.stringify(item))
export const cloneObjectArray = array => array.map(cloneObject)
export const unity = x => x
export const log = data =>
  process.env.NODE_ENV !== 'production' ? console.log(data) : null

export const getSchema = row => {
  if (!row) return LAR_SCHEMA
  // Row string
  if (typeof row === 'string') {
    if (row.match(/^1/)) return TS_SCHEMA
  } else {
    // Row object
    if (isTS(row)) return TS_SCHEMA
  }
  return LAR_SCHEMA
}

/**
 * Pipe-delimited values
 * @param {Object} row
 * @returns String
 */
export const stringifyRow = row =>
  getSchema(row)
    .map(column => row && row[column.fieldName])
    .join(DELIMITER)

/**
 * Parse a LAR row string
 * @param {String} row
 * @returns Object
 */
export const parseRow = (row = {}) => {
  if (!row) return {}
  if (!row.split) return row

  const schema = row.match(/^1/) ? TS_SCHEMA : LAR_SCHEMA

  return row.split(DELIMITER).reduce((prev, currVal, currIdx) => {
    const columnSchema = schema[currIdx]
    if (!columnSchema) return prev

    prev[columnSchema.fieldName] = currVal
    return prev
  }, {})
}

export const goTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
export const goToFileActions = () => goTo('file-actions')