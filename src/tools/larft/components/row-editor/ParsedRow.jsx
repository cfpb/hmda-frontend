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

/**
 * Displays a column of a LAR/TS row as a table row,
 * including Column #, Column Label, and a value input
 * providing enumerations (drop-down, buttons) where applicable.
 *
 * @param {Object} column Current column within the selected LAR/TS row
 * @param {String} highlightClass Classname to style selected column
 * @param {Function} onChange Handler to update column changes
 * @param {Function} onFocus Handler to update selected column
 * @param {Object} row Currently selected LAR/TS row
 */
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
      <td className='fieldValue'>{buildInput(column, row, onChange)}</td>
    </tr>
  )
}

/**
 * Table column displaying the field index
 *
 * @param {Object} column Field details
 */
const FieldNumber = ({ column }) => {
  const { fieldName, fieldIndex } = column

  return (
    <td className='fieldIndex'>
      <label htmlFor={fieldName}>{fieldIndex + 1}</label>
    </td>
  )
}

/**
 * Table column displaying the field label along with
 * descriptions of any applicable enumerations.
 *
 * @param {Object} column Field details
 */
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

/**
 * Constructs the placeholder text used in a text input field.
 *
 * @param {Array} examples List of strings to be listed as Examples
 * @param {Array} descriptions List of strings to be listed as Examples
 */
const buildPlaceholder = (examples, descriptions) => {
  const targetArray = examples.length ? examples : descriptions
  return targetArray.join(OR_DELIMITER)
}

/**
 * Determines what input format is required for this column
 * (text, buttons, drop-down, combination) and constructs the
 * appropriate input object.
 *
 * @param {Object} _col Field details
 * @param {Object} _row Currently selected LAR/TS row
 * @param {Function} _changeFn Handler for input modification
 * @returns
 */
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
        placeholder={specialPlaceholder(_col, placeholder)}
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

/**
 * Special cases where we don't want the "example" value to be used as
 * the placeholder.
 * @param {Object} column Field details
 * @param {String} placeholder
 * @returns Placeholder value
 */
const specialPlaceholder = (column, placeholder) => {
  if (column.fieldName == 'Total Number of Entries Contained in Submission')
    return '0'

  return placeholder
}
