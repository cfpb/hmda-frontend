import { isColumnDate } from '../../utils/column'
import { getFieldType } from '../../utils/input'
import { InputDate } from './InputDate'
import { InputText } from './InputText'

export const InputFreeform = ({ row, column, ...props }) => {
  const value = row[column.fieldName]

  if (isColumnDate(column)) {
    return <InputDate {...props} value={value} />
  }

  return (
    <InputText
      {...props}
      type={getFieldType(column)}
      value={value}
    />
  )
}
