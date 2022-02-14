import React, { useState } from 'react'
import { getSchema, parseRow } from './utils'
import { useEffect } from 'react'

const getType = ({ fieldType }) => {
  if (fieldType == 'Alphanumeric') return 'text'
  if (fieldType == 'Numeric') return 'number'
  return 'text'
}

const buildOptions = column => {
  const vals = column.values.map(({ value, description }) => (
    <option value={value} key={value}>
      {value === description ? value : `${value} - ${description}`}
    </option>
  ))

  vals.unshift(<option key='none' value={''}>- No selection -</option>)
  return vals
}

const toJsDateString = str => {
  if (!str) return ''
  console.log('Date string: ', `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6)}`)
  
  return `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6)}`
  
}

export const ParsedRow = ({ id='parsed-row', row, setRow, currCol }) => {
  const [filter, setFilter] = useState('')

  // Smoothly bring the focused field into view
  useEffect(() => {
    const el = document.getElementById(`${currCol?.fieldName}`)
    el?.parentElement?.parentElement?.scrollIntoView({
      block: 'nearest',
      behavior: 'auto',
    })
    if (el) el.parentElement.parentElement.style = {}//.transform = `translateY(0px)`
  }, [currCol])

  const _onChange = e => {
    const newRow = { ...row }
    newRow[e.target.id] = e.target.value
    setRow(newRow)
  }

  const rowValues = parseRow(row)

  const checkHighlighted = (a, b) =>
    a && b && a.fieldIndex === b.fieldIndex ? 'highlight' : ''

  const inputs = getSchema(row)
    .filter(
      column =>
        !filter.length || column.fieldName.toLowerCase().includes(filter)
    )
    .map(column => {
      const highlightClass = checkHighlighted(column, currCol)
      const { examples, values } = column
      let userInput

      // Date field
      if (column.fieldName?.includes('Date')){
        userInput = (
          <input
            type='date'
            name={column.fieldName}
            id={column.fieldName}
            onChange={e => {
              _onChange({
                target: {
                  id: e.target.id,
                  value: e.target.value?.replaceAll('-', ''),
                },
              })
            }}
            value={toJsDateString(
              rowValues[column.fieldName]?.toString() || ''
            )}
          />
        )  
        }
        // Field allows freeform text but also has enumerated values
      else if (examples.length && values.length) {
        userInput = (
          <input
            type={getType(column)}
            name={column.fieldName}
            id={column.fieldName}
            value={rowValues[column.fieldName]?.toString() || ''}
            onChange={_onChange}
            placeholder={`${column.examples[0]} (or) ${values
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
        userInput = (
          <select
            name={column.fieldName}
            id={column.fieldName}
            onChange={_onChange}
            value={rowValues[column.fieldName] || ''}
            style={{
              border: '1px dotted grey',
              width: '100%',
            }}
          >
            {buildOptions(column)}
          </select>
        )
      } else {
        // Examples only
        userInput = (
          <input
            type={getType(column)}
            name={column.fieldName}
            id={column.fieldName}
            value={rowValues[column.fieldName] || ''}
            onChange={_onChange}
            placeholder={column.examples.join(', ')}
            style={{
              border: '1px dotted grey',
              width: '100%',
            }}
          />
        )
      }

      return (
        <tr
          key={column.fieldName}
          className={highlightClass}
          key={column.fieldName}
        >
          <td className={'fieldIndex ' + highlightClass}>
            <label htmlFor={column.fieldName}>{column.fieldIndex + 1}</label>
          </td>
          <td className={'fieldName ' + highlightClass}>
            <label htmlFor={column.fieldName}>{column.fieldName}</label>
          </td>
          <td className={'fieldValue ' + highlightClass}>
            {userInput}
          </td>
        </tr>
      )
    })

  return (
    <div className='parsed-row' id={id}>
      <div className='section-heading'>
        <h3
          className='title clickable'
          onClick={() =>
            document.getElementById('raw-row')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Parsed Values
        </h3>
        <input
          type='text'
          name='filter'
          id='filter'
          value={filter}
          placeholder={'Filter by label'}
          onChange={e => setFilter(e.target.value.toLowerCase())}
        />
        {!!filter.length && (
          <button
            className='clear'
            onClick={() => {
              setFilter('')
              document.getElementById('filter').focus()
            }}
          >
            clear
          </button>
        )}
      </div>
      <div
        className='table-wrapper'
        style={{ height: window.innerHeight * 0.5 }}
      >
        <table
          onSubmit={e => e.preventDefault()}
          style={{
            height: window.innerHeight * 0.1,
            borderCollapse: 'separate',
          }}
        >
          <thead>
            <tr>
              <th>Column #</th>
              <th>Label</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody
            id='parsed-fields'
            style={{ maxHeight: window.innerHeight * 0.1 }}
          >
            {inputs}
          </tbody>
        </table>
      </div>
    </div>
  )
}
