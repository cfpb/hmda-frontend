import React from 'react'
import PropTypes from 'prop-types'

const renderData = (report) => {
  return report.msas.map(renderRow)
}

const renderRow = (row, i) => {
  return (
    <tr key={i}>
      <th>{row.msa}</th>
      {Object.keys(row)
        .slice(1)
        .map((key) => {
          return <td key={key}>{row[key]}</td>
        })}
    </tr>
  )
}

const R = React.forwardRef((props, ref) => {
  if (!props.report) return null
  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th rowSpan={2}>MSA/MD</th>
          <th rowSpan={2}>MSA/MD Name</th>
          <th rowSpan={2}>Total LARs</th>
          <th rowSpan={2}>Total Amount ($000's)</th>
          <th colSpan={4}>Loan Type</th>
          <th colSpan={3}>Property Type</th>
          <th colSpan={3}>Loan Purpose</th>
        </tr>
        <tr>
          <th>CONV</th>
          <th>FHA</th>
          <th>VA</th>
          <th>FSA/RHS</th>
          <th>1 - 4 Family</th>
          <th>Manuf Home</th>
          <th>Multi Family</th>
          <th>Home Purchase</th>
          <th>Home Improvement</th>
          <th>Refinance</th>
        </tr>
      </thead>
      <tbody>{renderData(props.report)}</tbody>
      <tfoot>{renderRow(props.report.total, 'foot')}</tfoot>
    </table>
  )
})

R.propTypes = {
  report: PropTypes.object,
}

export default R
