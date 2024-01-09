import React, { memo } from 'react'
import { unity } from '../../utils/common'

/**
 * Display examples, descriptions, and enumerations
 * for a field.
 *
 * @param {Object} field LAR/TS field
 */
export const FieldDetails = memo(({ field }) => {
  if (!field) return null
  const { examples = [], enumerations = [], descriptions = [] } = field

  let _descriptions = []
  descriptions.forEach((d, d_idx) => {
    const lines = d?.split('<br/><br/>')
    lines.forEach((ex, idx) =>
      _descriptions.push(<li key={`${ex}-${d_idx}-${idx}`}>{ex}</li>),
    )
  })

  const _examples = examples
    .filter(unity)
    .map((ex, idx) => <li key={`${ex}-${idx}`}>{ex}</li>)

  const Examples = List('Examples', _examples, 'examples')
  const Descriptions = List('Description(s)', _descriptions, 'descriptions')
  const Enumerations = Table('Enumerations', enumerations, 'values')

  return (
    <div className='more-info'>
      {Examples}
      {Descriptions}
      {Enumerations}
    </div>
  )
})

const List = (title, list, className) => {
  if (!list?.length) return null

  return (
    <div className={className}>
      <h3>{title}</h3>
      <ul>{list}</ul>
    </div>
  )
}

const Table = (title, list, className) => {
  if (!list.length) return null
  const [hasDescription, rows] = buildRows(list)
  const descriptionColumn = hasDescription ? <th>Description</th> : null

  return (
    <div className={className}>
      <h3>{title}</h3>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            {descriptionColumn}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

const buildRows = (list) => {
  let hasDescription = false
  const rows = list.map((v, idx) => {
    const columns = [<td key={v.value}>{v.value}</td>]
    if (v.value !== v.description) {
      hasDescription = true
      columns.push(<td key={v.description}>{v.description}</td>)
    }
    return <tr key={`${idx}-${v.value}-${v.description}`}>{columns}</tr>
  })
  return [hasDescription, rows]
}
