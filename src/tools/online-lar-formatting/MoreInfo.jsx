import React, { memo } from 'react'
import { cloneObjectArray } from './utils'

const DELIMITER = ' (or) '

const isDescription = str => str.match(/^Specify/)

const isString = str => typeof str === 'string'

const List = (title, list, className) => {
  if (!list?.length) return null

  return (
    <div className={className}>
      <h3>{title}</h3>
      <ul>{list}</ul>
    </div>
  )
}

const buildRows = (list, idx) =>
  list.map(v => {
    return (
      <tr key={`${idx}-${v.value}-${v.description}`}>
        <td>{v.value}</td>
        <td>{v.description}</td>
      </tr>
    )
  })

const Table = (title, list, className) => {
  if (!list.length) return null
  const rows = buildRows(list)

  return (
    <div className={className}>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}


export const MoreInfo = memo(({ field }) => {
  if (!field) return null
  const { examples = [], values = [] } = field
  const _examples = []
  const _descriptions = []
  let _values = cloneObjectArray(values)

  examples.forEach((curr, idx) => {
    if (isString(curr)) {
      const [ex, ...enums] = curr.split(DELIMITER)

      if (isDescription(ex)) _descriptions.push(<li key={`${ex}-${idx}`}>{ex}</li>)
      else if (ex) _examples.push(<li key={`${ex}-${idx}`}>{ex}</li>)

      // Fields that have both enums and free text
      if (enums?.length) {
        if (_values?.append)
          _values.append(enums.map(e => ({ value: e, description: e })))
        else _values = enums.map(e => ({ value: e, description: e }))
      }
    }
  })

  const Examples = List('Examples', _examples, 'examples')
  const Description = List('Field Description', _descriptions, 'descriptions')
  const Values = Table('Enumerations', _values, 'values')

  return (
    <div className='more-info'>
      {Examples}
      {Description}
      {Values}
    </div>
  )
})
