import React from 'react'
import { collapseAll } from './Accordion'

export const ParsedTable = ({ rows }) => (
  <div className='table-wrapper' style={{ height: window.innerHeight * 0.5 }}>
    <table
      onSubmit={e => e.preventDefault()}
      style={{
        height: window.innerHeight * 0.1,
        borderCollapse: 'separate',
      }}
    >
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
      <tbody id='parsed-fields' style={{ maxHeight: window.innerHeight * 0.1 }}>
        {rows}
      </tbody>
    </table>
  </div>
)
