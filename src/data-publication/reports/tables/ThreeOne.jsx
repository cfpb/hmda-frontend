import React from 'react'
import PropTypes from 'prop-types'

const renderData = characteristics => {
  return characteristics.map((characteristic, index) => {
    return [
      renderCharacteristicTitle(characteristic.characteristic, index),
      renderCharacteristicDetails(characteristic)
    ]
  })
}

const renderCharacteristicTitle = (characteristic, key) => {
  return (
    <tr key={key}>
      <th
        colSpan={19}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1'
        }}
      >
        {characteristic}
      </th>
    </tr>
  )
}

const renderCharacteristicDetails = characteristic => {
  let name, currentCharacteristic
  Object.keys(characteristic).forEach(key => {
    if (key === 'characteristic') name = characteristic[key]
    else currentCharacteristic = characteristic[key]
  })

  return currentCharacteristic.map((detailObj, index) => {
    let detail, purchasers
    Object.keys(detailObj).forEach(key => {
      if (key === 'purchasers') purchasers = detailObj[key]
      else detail = detailObj[key]
    })

    return (
      <tr key={name + index}>
        <th>{detail}</th>
        {purchasers.map((purchaser, index) => {
          return [
            <td key={'count' + index}>{purchaser.count}</td>,
            <td key={'value' + index}>{purchaser.value}</td>
          ]
        })}
      </tr>
    )
  })
}

const ThreeOne = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            BORROWER OR CENSUS TRACT CHARACTERISTICS
          </th>
          <th colSpan={2} width="13.333%">
            Fannie Mae
          </th>
          <th colSpan={2} width="13.333%">
            Ginnie Mae
          </th>
          <th colSpan={2} width="13.333%">
            Freddie Mac
          </th>
          <th colSpan={2} width="13.333%">
            Farmer Mac
          </th>
          <th colSpan={2} width="13.333%">
            Private Securitization
          </th>
          <th colSpan={2} width="13.333%">
            Commercial Bank, Savings Bank, or Saving Assoc
          </th>
          <th colSpan={2} width="13.333%">
            Insurance Co, Credit Union, Mortgage Bk, or Finance Co
          </th>
          <th colSpan={2} width="13.333%">
            Affiliate Institution
          </th>
          <th colSpan={2} width="13.333%">
            Other Purchaser
          </th>
        </tr>
        <tr>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
          <th>Number</th>
          <th>$000's</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th
            colSpan={19}
            style={{
              borderTopWidth: '2px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              backgroundColor: '#f1f1f1'
            }}
          >
            BORROWER CHARACTERISTICS
          </th>
        </tr>
        {renderData(props.report.borrowerCharacteristics)}
        <tr>
          <th
            colSpan={19}
            style={{
              borderTopWidth: '2px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              backgroundColor: '#f1f1f1'
            }}
          >
            CENSUS TRACT CHARACTERISTICS
          </th>
        </tr>
        {renderData(props.report.censusCharacteristics)}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          {props.report.total.purchasers.map((total, index) => {
            return [
              <td key="count">{total.count}</td>,
              <td key="value">{total.value}</td>
            ]
          })}
        </tr>
      </tfoot>
    </table>
  )
})

ThreeOne.propTypes = {
  report: PropTypes.object
}

export default ThreeOne
