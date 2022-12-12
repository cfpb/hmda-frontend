import React from 'react'
import { isColumnState, isCombinedInput } from '../../utils/column'
import { Accordion } from '../Accordion'
import { buildEnumeratedOptions } from './EnumOption'
import { FieldDetails } from './FieldDetails'
import { InputEnumeratedComplex } from './InputEnumeratedComplex'
import { InputEnumeratedSelector } from './InputEnumeratedSelector'
import { InputFreeform } from './InputFreeform'
import { InputFreeformWithTooltip } from './InputFreeformWithTooltip'
import { InputStateSelector } from './InputStateSelector'

const OR_DELIMITER = ' (or) '

export const ParsedRow = ({
  column,
  highlightClass,
  onChange,
  onFocus,
  row,
}) => {
  const { fieldName } = column

  return (
    <tr
      key={fieldName}
      className={highlightClass}
      onClick={() => onFocus(column)}
    >
      <FieldNumber column={column} />
      <FieldName column={column} />
      <td className='fieldValue'>
        {buildInput(column, row, onChange)}
      </td>
    </tr>
  )
}

const FieldNumber = ({ column }) => {
  const { fieldName, fieldIndex } = column

  return (
    <td className='fieldIndex'>
      <label htmlFor={fieldName}>{fieldIndex + 1}</label>
    </td>
  )
}

const FieldName = ({ column }) => {
  const { fieldName, fieldIndex } = column

  return (
    <td className='fieldName'>
      <label htmlFor={fieldName}>
        <Accordion heading={fieldName} id={`${fieldIndex}`}>
          <FieldDetails field={column} />
        </Accordion>
      </label>
    </td>
  )
}

const buildPlaceholder = (examples, descriptions) => {
  const targetArray = examples.length ? examples : descriptions
  return targetArray.join(OR_DELIMITER)
}

const buildInput = (_col, _row, _changeFn) => {
  if (!_col) return null

  const { examples = [], enumerations = [], descriptions = [] } = _col
  const placeholder = buildPlaceholder(examples, descriptions)

  const common = {
    id: _col.fieldName,
    name: _col.fieldName,
    onChange: _changeFn,
    style: {
      border: '1px dotted grey',
      width: '100%',
      height: '100%',
      maxHeight: '3em',
      paddingLeft: '5px',
    },
  }

  if (_col.disable == true) common['disabled'] = 'disabled'

  if (isColumnState(_col))
    return <InputStateSelector value={_row[_col.fieldName]} {...common} />

  if (isCombinedInput(_col)) {
    return (
      <div className='enum-entry'>
        <InputFreeform
          {...common}
          row={_row}
          column={_col}
          placeholder={placeholder}
        />
        <InputEnumeratedComplex {...common} column={_col} row={_row} />
      </div>
    )
  }

  if (enumerations.length) {
    return (
      <InputEnumeratedSelector
        {...common}
        value={_row[_col.fieldName]}
        options={buildEnumeratedOptions(_col)}
      />
    )
  }

  if (_col.tooltip) {
    return (
      <InputFreeformWithTooltip
        {...common}
        column={_col}
        row={_row}
        placeholder={placeholder}
      />
    )
  }

  return (
    <InputFreeform
      {...common}
      row={_row}
      column={_col}
      placeholder={placeholder}
    />
  )
}
