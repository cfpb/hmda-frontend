import React from 'react'
import PropTypes from 'prop-types'

const renderData = (csv) => {
  return csv.map((row, i) => {
    return (
      <tr key={i}>
        <th>{row[0]}</th>
        {row.slice(1).map((cell, i) => {
          return <td key={i}>{cell}</td>
        })}
      </tr>
    )
  })
}

const IRSCSV = React.forwardRef((props, ref) => {
  const report = props.report
  if (!report) return null

  const csv = report.parsed
  const head = csv[0]
  const foot = csv[csv.length - 1]

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          {head.map((v, i) => {
            return (
              <td key={i} width={i === 1 ? '15%' : '5%'}>
                {v}
              </td>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {renderData(
          csv.slice(1, -1).sort((a, b) => {
            return a[0] - b[0]
          }),
        )}
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <td>TOTAL</td>
          {foot.slice(2).map((cell, i) => {
            return <td key={i}>{cell}</td>
          })}
        </tr>
      </tfoot>
    </table>
  )
})

IRSCSV.propTypes = {
  report: PropTypes.object,
}

export default IRSCSV
