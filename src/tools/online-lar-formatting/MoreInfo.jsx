import React, { memo } from 'react'
import { unity } from './utils'

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
  const { examples = [], enumerations = [], descriptions = [] } = field

  let _descriptions = []
  descriptions.forEach((d, d_idx) => {
    const lines = d?.split('<br/><br/>')
    lines.forEach((ex, idx) =>
      _descriptions.push(<li key={`${ex}-${d_idx}-${idx}`}>{ex}</li>)
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
