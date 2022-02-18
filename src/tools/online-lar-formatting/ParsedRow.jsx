import React from 'react'
import { Accordion } from './Accordion'
import { MoreInfo } from './MoreInfo'
import { buildOptions, getType, toJsDateString } from './parsedHelpers'
import { log } from './utils'

export const ParsedRow = ({
  column,
  highlightClass,
  row,
  onChange,
  onFocus,
}) => {
  const userInput = buildInput(column, row, onChange)
  const moreInfo = <MoreInfo field={column} />
  const { fieldName, fieldIndex } = column

  return (
    <tr
      key={fieldName}
      className={highlightClass}
      key={fieldName}
      onClick={() => onFocus(column)}
    >
      <td className={'fieldIndex ' + highlightClass}>
        <label htmlFor={fieldName}>{fieldIndex + 1}</label>
      </td>
      <td className={'fieldName ' + highlightClass}>
        <label htmlFor={fieldName}>
          <Accordion
            content={moreInfo}
            heading={fieldName}
            id={`${fieldIndex}`}
          />
        </label>
      </td>
      <td className={'fieldValue ' + highlightClass}>{userInput}</td>
    </tr>
  )
}

function buildInput(_col, _row, _changeFn) {
  log('Building input...')

  if (!_col) return null
  const { examples = [], values = [] } = _col

  // Date field
  if (_col.fieldName?.includes('Date')) {
    return (
      <input
        key={_col.fieldName}
        type='date'
        name={_col.fieldName}
        id={_col.fieldName}
        onChange={e => {
          _changeFn({
            target: {
              id: e.target.id,
              value: e.target.value?.replaceAll('-', ''),
            },
          })
        }}
        value={toJsDateString(_row[_col.fieldName]?.toString() || '')}
      />
    )
  }

  // Field allows freeform text but also has enumerated values
  else if (examples.length && values.length) {
    return (
      <input
        key={_col.fieldName}
        type={getType(_col)}
        name={_col.fieldName}
        id={_col.fieldName}
        value={_row[_col.fieldName]?.toString() || ''}
        onChange={_changeFn}
        placeholder={`${_col.examples[0]} (or) ${values
          .map(({ value, description }) => `${value} - ${description}`)
          .join(' (or) ')}`}
        style={{
          border: '1px dotted grey',
          width: '100%',
        }}
      />
    )
  } else if (values.length) {
    // Enumerations only
    return (
      <select
        key={_col.fieldName}
        name={_col.fieldName}
        id={_col.fieldName}
        onChange={_changeFn}
        value={_row[_col.fieldName] || ''}
        style={{
          border: '1px dotted grey',
          width: '100%',
        }}
      >
        {buildOptions(_col)}
      </select>
    )
  } else {
    // Examples only
    return (
      <input
        key={_col.fieldName}
        type={getType(_col)}
        name={_col.fieldName}
        id={_col.fieldName}
        value={_row[_col.fieldName] || ''}
        onChange={_changeFn}
        placeholder={_col.examples.join(', ')}
        style={{
          border: '1px dotted grey',
          width: '100%',
        }}
      />
    )
  }
}
