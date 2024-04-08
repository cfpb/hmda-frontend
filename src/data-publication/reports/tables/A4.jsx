import React from 'react'
import PropTypes from 'prop-types'

const renderData = (report, label) => {
  return (
    <React.Fragment>
      {renderCharacteristicTitle('Borrower Characteristics')}
      {mapCharacteristic(report.borrowerCharacteristics, label)}
      {renderCharacteristicTitle('Census Tract Characteristics')}
      {mapCharacteristic(report.censusTractCharacteristics, label)}
    </React.Fragment>
  )
}

const mapCharacteristic = (arr, label) => {
  return arr.map((characteristic) => {
    return renderCharacteristic(characteristic, label)
  })
}

const renderCharacteristicTitle = (key) => {
  return (
    <tr className='characteristic-grey-title' key={key}>
      <th
        colSpan={13}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1',
        }}
      >
        {key}
      </th>
    </tr>
  )
}

const renderCharacteristic = (characteristic, label) => {
  let name, currChar
  Object.keys(characteristic).forEach((key) => {
    if (key === 'characteristic') name = characteristic[key]
    else currChar = characteristic[key]
  })

  return [
    <tr className='characteristic-title' key={name}>
      <th
        colSpan={13}
        style={{
          borderTopWidth: '2px',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        {name}
      </th>
    </tr>,
    currChar.map((detailObj, index) => {
      let detail, statuses
      Object.keys(detailObj).forEach((key) => {
        if (key === 'preapprovalStatuses') statuses = detailObj[key]
        else detail = detailObj[key]
      })

      return (
        <tr key={name + index}>
          <th>{detail}</th>
          {statuses.map((disObj, i) => {
            return [
              <td key={i + 'count'}>{disObj.count}</td>,
              <td key={i + 'value'}>{disObj.value}</td>,
            ]
          })}
        </tr>
      )
    }),
  ]
}

const A4 = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} className='narrowTable'>
      <thead>
        <tr>
          <th width='25%' rowSpan={2}>
            BORROWER OR CENSUS TRACT CHARACTERISTICS
          </th>
          <th colSpan={2} width='25%'>
            Preapprovals Resulting in Originations
          </th>
          <th colSpan={2} width='25%'>
            Preapprovals Approved but not Accepted
          </th>
          <th colSpan={2} width='25%'>
            Preapprovals Denied
          </th>
        </tr>
        <tr>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
        </tr>
      </thead>
      <tbody>{renderData(props.report)}</tbody>
    </table>
  )
})

A4.propTypes = {
  report: PropTypes.object,
}

export default A4
