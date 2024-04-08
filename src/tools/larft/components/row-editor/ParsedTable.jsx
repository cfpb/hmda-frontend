import React from 'react'
import { collapseAll } from '../Accordion'

/**
 * Displays the LAR/TS fields in a tabular view.
 *
 * @param {Array<ParsedRow>} rows
 */
export const ParsedTable = ({ rows }) => {
  if (!rows.length) return <NoMatches />

  return (
    <div
      className='table-wrapper'
      style={{ height: window.innerHeight * 0.623 }}
    >
      <table
        onSubmit={(e) => e.preventDefault()}
        style={{
          height: window.innerHeight * 0.4,
          borderCollapse: 'separate',
        }}
      >
        <TableHeader />
        <tbody
          id='parsed-fields'
          style={{ maxHeight: window.innerHeight * 0.1 }}
        >
          {rows}
        </tbody>
      </table>
    </div>
  )
}

const NoMatches = () => (
  <div className='no-matches'>No fields match your filter criteria</div>
)

const TableHeader = () => (
  <thead>
    <tr>
      <th>Column</th>
      <th className='space-between'>
        <span>Label</span>
        <span>
          <button className='collapse-all' onClick={collapseAll}>
            Collapse
          </button>
        </span>
      </th>
      <th>Value</th>
    </tr>
  </thead>
)
