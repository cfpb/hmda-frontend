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
  return arr.map(characteristic => {
    return renderCharacteristic(characteristic, label)
  })
}

const renderCharacteristicTitle = key => {
  return (
    <tr className="characteristic-grey-title" key={key}>
      <th
        colSpan={13}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1'
        }}
      >
        {key}
      </th>
    </tr>
  )
}

const renderCharacteristic = (characteristic, label) => {
  let name, currChar
  Object.keys(characteristic).forEach(key => {
    if (key === 'characteristic') name = characteristic[key]
    else currChar = characteristic[key]
  })

  return [
    <tr className="characteristic-title" key={name}>
      <th
        colSpan={13}
        style={{
          borderTopWidth: '2px',
          textTransform: 'uppercase',
          fontWeight: 'bold'
        }}
      >
        {name}
      </th>
    </tr>,
    currChar.map((detailObj, index) => {
      let detail, dispositions
      Object.keys(detailObj).forEach(key => {
        if (key === 'dispositions') dispositions = detailObj[key]
        else detail = detailObj[key]
      })

      return (
        <tr key={name + index}>
          <th>{detail}</th>
          {dispositions.map((disObj, i) => {
            return [
              <td key={i + 'count'}>{disObj.count}</td>,
              <td key={i + 'value'}>{disObj.value}</td>
            ]
          })}
        </tr>
      )
    })
  ]
}

const TwelveOne = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            BORROWER OR CENSUS TRACT CHARACTERISTICS
          </th>
          <th colSpan={2} width="13.333%">
            Applications Received
          </th>
          <th colSpan={2} width="13.333%">
            Loans Originated
          </th>
          <th colSpan={2} width="13.333%">
            Apps. Approved But Not Accepted
          </th>
          <th colSpan={2} width="13.333%">
            Applications Denied
          </th>
          <th colSpan={2} width="13.333%">
            Applications Withdrawn
          </th>
          <th colSpan={2} width="13.333%">
            Files Closed for Incompleteness
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
        </tr>
      </thead>
      <tbody>{renderData(props.report)}</tbody>
    </table>
  )
})

TwelveOne.propTypes = {
  report: PropTypes.object
}

export default TwelveOne
