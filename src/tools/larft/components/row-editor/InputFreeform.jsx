import { isColumnDate } from '../../utils/column'
import { getFieldType } from '../../utils/input'
import { InputDate } from './InputDate'
import { InputText } from './InputText'

/**
 * Text input (Date or Freeform)
 *
 * @param {Object} row LAR/TS row content
 * @param {Object} column Field details
 * @param {Object} props Additional input attributes
 */
export const InputFreeform = ({ row, column, ...props }) => {
  const value = row[column.fieldName]

  if (isColumnDate(column)) {
    return <InputDate {...props} value={value} />
  }

  return <InputText {...props} type={getFieldType(column)} value={value} />
}
