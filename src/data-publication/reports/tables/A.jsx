import React from 'react'
import PropTypes from 'prop-types'

const renderData = (report) => {
  return report.dispositions.map(renderDisposition)
}

const renderDispositionTitle = (title) => {
  return (
    <tr className='disposition-grey-title' key={title}>
      <th
        colSpan={8}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1',
        }}
      >
        {title}
      </th>
    </tr>
  )
}

const renderDisposition = (disposition, i) => {
  const title = disposition.disposition
  return [
    renderDispositionTitle(disposition.disposition),
    disposition.loanTypes.map((type, index) => {
      return (
        <tr key={title + i + index}>
          <th>{type.loanType}</th>
          {type.purposes.map((purpose) => {
            const noLien =
              purpose.noLienCount !== undefined ? (
                <td key={3}>{purpose.noLienCount}</td>
              ) : null
            return [
              <td key={1}>{purpose.firstLienCount}</td>,
              <td key={2}>{purpose.juniorLienCount}</td>,
              noLien,
            ]
          })}
        </tr>
      )
    }),
  ]
}

const A = React.forwardRef((props, ref) => {
  if (!props.report) return null
  return (
    <table ref={ref} className='narrowTable'>
      <thead>
        <tr>
          <th width='20%' rowSpan={2}>
            LOAN TYPE
          </th>
          <th colSpan={2} width='26.667%'>
            Home Purchase
          </th>
          <th colSpan={2} width='26.667%'>
            Refinance
          </th>
          <th colSpan={3} width='26.667%'>
            Home Improvement
          </th>
        </tr>
        <tr>
          <th>First Lien</th>
          <th>Junior Lien</th>
          <th>First Lien</th>
          <th>Junior Lien</th>
          <th>First Lien</th>
          <th>Junior Lien</th>
          <th>No Lien</th>
        </tr>
      </thead>
      <tbody>{renderData(props.report)}</tbody>
    </table>
  )
})

A.propTypes = {
  report: PropTypes.object,
}

export default A
