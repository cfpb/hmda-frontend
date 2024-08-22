import React from 'react'
import { ExpandableSection } from '../../../common/ExpandableSection'

export const DataTable = ({ tableData }) => {
  if (!tableData) return null

  return (
    <div style={{ marginTop: '.8em' }}>
      <ExpandableSection label={'Data Table'}>
        <table>
          <thead>
            <tr>
              {tableData.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cell.includes('Q') ? 'bold-font' : ''}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ExpandableSection>
    </div>
  )
}
