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
        colSpan={11}
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
        colSpan={11}
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
      let detail, pricing
      Object.keys(detailObj).forEach((key) => {
        if (key === 'pricingInformation') pricing = detailObj[key]
        else detail = detailObj[key]
      })

      return (
        <tr key={name + index}>
          <th>{detail}</th>
          {pricing.map((priceObj, index) => {
            if (priceObj.pricing === 'HOEPA Loans') return null
            return (
              <td key={index}>
                {label === 'NUMBER' ? priceObj.count : priceObj.value}
              </td>
            )
          })}
        </tr>
      )
    }),
  ]
}

const makeTable = (report, label, ref) => {
  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width='20%' rowSpan={2}>
            {`BORROWER OR CENSUS TRACT CHARACTERISTICS (${label})`}
          </th>
          <th rowSpan={2} width='8%'>
            No Reported Pricing Data
          </th>
          <th rowSpan={2} width='8%'>
            Reported Pricing Data
          </th>
          <th colSpan={9} width='64%'>
            Percentage Points above Average Prime Offer Rate (Only Includes
            Loans with Apr above the Threshold)
          </th>
        </tr>
        <tr>
          <th width='8%'>1.50 - 1.99</th>
          <th width='8%'>2.00 - 2.49</th>
          <th width='8%'>2.50 - 2.99</th>
          <th width='8%'>3.00 - 3.99</th>
          <th width='8%'>4.00 - 4.99</th>
          <th width='8%'>5 or More</th>
          <th width='8%'>Mean</th>
          <th width='8%'>Median</th>
        </tr>
      </thead>
      <tbody>{renderData(report, label)}</tbody>
    </table>
  )
}

const TwelveTwo = (props) => {
  const { report, tableOneRef, tableTwoRef } = props
  if (!report) return null

  return (
    <React.Fragment>
      {makeTable(report, 'NUMBER', tableOneRef)}
      {makeTable(report, "$000's", tableTwoRef)}
    </React.Fragment>
  )
}

TwelveTwo.propTypes = {
  report: PropTypes.object,
}

export default TwelveTwo
