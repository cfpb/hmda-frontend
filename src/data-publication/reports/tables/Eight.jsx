import React from 'react'
import PropTypes from 'prop-types'

const renderData = applicantCharacteristics => {
  return applicantCharacteristics.map((characteristic, index) => {
    return [
      <tr key={index}>
        <th
          style={{
            borderTopWidth: '2px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1'
          }}
          colSpan={21}
        >
          {characteristic.characteristic === 'minorityStatus'
            ? 'MINORITY STATUS'
            : characteristic.characteristic}
        </th>
      </tr>,
      renderDetails(characteristic, index)
    ]
  })
}

const renderDetails = (characteristic, key) => {
  let characteristicDetails = ''
  if (characteristic.characteristic === 'race') characteristicDetails = 'races'
  if (characteristic.characteristic === 'ethnicity')
    characteristicDetails = 'ethnicities'
  if (characteristic.characteristic === 'minorityStatus')
    characteristicDetails = 'minorityStatuses'
  if (characteristic.characteristic === 'gender')
    characteristicDetails = 'genders'
  if (characteristic.characteristic === 'income')
    characteristicDetails = 'incomes'

  return characteristic[characteristicDetails].map((detail, index) => {
    return (
      <tr key={`${index}-${key}`}>
        <th>{detail[characteristic.characteristic]}</th>
        {renderDenialReasons(detail.denialReasons, index, key)}
      </tr>
    )
  })
}

const renderDenialReasons = (denialReasons, key, key2) => {
  return denialReasons.map((denialReason, index) => {
    //remove duplicate total row
    if(index === 10) return null
    return [
      <td key={`count-${index}-${key}-${key2}`}>{denialReason.count}</td>,
      <td key={`percentage-${index}-${key}-${key2}`}>
        {denialReason.percentage}
      </td>
    ]
  })
}

const Eight = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} className="table-large" style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            APPLICANT CHARACTERISTICS
          </th>
          <th colSpan={2} width="8%">
            Debt-to-Income Ratio
          </th>
          <th colSpan={2} width="8%">
            Employment History
          </th>
          <th colSpan={2} width="8%">
            Credit History
          </th>
          <th colSpan={2} width="8%">
            Collateral
          </th>
          <th colSpan={2} width="8%">
            Insufficient Cash
          </th>
          <th colSpan={2} width="8%">
            Unverifiable Information
          </th>
          <th colSpan={2} width="8%">
            Credit App. Incomplete
          </th>
          <th colSpan={2} width="8%">
            Mortgage Insurance Denied
          </th>
          <th colSpan={2} width="8%">
            Other
          </th>
          <th colSpan={2} width="8%">
            Total
          </th>
        </tr>
        <tr>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
          <th>Number</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>{renderData(props.report.applicantCharacteristics)}</tbody>
    </table>
  )
})

Eight.propTypes = {
  report: PropTypes.object
}

export default Eight
