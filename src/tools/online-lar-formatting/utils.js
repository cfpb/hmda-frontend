import larSchema from './SchemaLar.json'
import tsSchema from './SchemaTs.json'

export const LAR_SCHEMA = larSchema.schema
export const TS_SCHEMA = tsSchema.schema
export const DELIMITER = '|'

export const getSchema = row => {
  if (!row) return LAR_SCHEMA
  // Row string
  if (typeof row === 'string') {
    if (row.match(/^1/)) return TS_SCHEMA
  } else {
    // Row object
    if (row['Record Identifier'] === '1')
      return TS_SCHEMA
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
    if (!columnSchema) {
      console.error('No schema at ', currIdx, currVal)
      return prev
    }

    prev[columnSchema.fieldName] = currVal
    return prev
  }, {})
}

export const cloneObject = item => JSON.parse(JSON.stringify(item))
export const cloneObjectArray = array => array.map(cloneObject)
export const unity = x => x