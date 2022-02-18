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

const buildPlaceholder = (exs, descs) => {
  const DELIM = ' (or) '
  return (exs.length ? exs : descs).join(DELIM)
}

function buildInput(_col, _row, _changeFn) {
  log('Building input...')

  if (!_col) return null
  const { examples = [], enumerations = [], descriptions = [] } = _col
  const placeholder = buildPlaceholder(examples, descriptions)
  const common = {
    id: _col.fieldName,
    key: _col.fieldName,
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

  // Date field
  if (_col.fieldName?.includes('Date')) {
    return (
      <input
        {...common}
        type='date'
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
  else if (examples.length && enumerations.length) {
    return (
      <input
        {...common}
        type={getType(_col)}
        value={_row[_col.fieldName]?.toString() || ''}
        placeholder={placeholder}
      />
    )
  } else if (enumerations.length) {
    // Enumerations only
    return (
      <select
        {...common}
        value={_row[_col.fieldName] || ''}
      >
        {buildOptions(_col)}
      </select>
    )
  } else {
    // Examples only
    return (
      <input
        {...common}
        type={getType(_col)}
        value={_row[_col.fieldName] || ''}
        placeholder={placeholder}
      />
    )
  }
}
