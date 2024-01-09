import { isRowTS } from '../utils/row'
import larSchema from './SchemaLar.json'
import tsSchema from './SchemaTs.json'

export const LAR_SCHEMA = larSchema.schema
export const TS_SCHEMA = tsSchema.schema

/**
 * Determine which schema to use for the provided row
 *
 * @param {Object} row
 */
export const getSchema = (row) => {
  if (isRowTS(row)) return TS_SCHEMA
  if (!row) return LAR_SCHEMA

  return LAR_SCHEMA
}
