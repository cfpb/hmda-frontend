import React from 'react'
import PropTypes from 'prop-types'

const renderData = (applicantIncomes) => {
  return applicantIncomes.map((applicantIncome, index) => {
    return [
      renderApplicantIncome(applicantIncome.applicantIncome, index),
      renderCharacteristics(applicantIncome.borrowerCharacteristics),
    ]
  })
}

const renderApplicantIncome = (applicantIncome, index) => {
  return (
    <tr key={index}>
      <th
        colSpan={13}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1',
        }}
      >
        {applicantIncome}
      </th>
    </tr>
  )
}
const renderCharacteristics = (borrowerCharacteristics) => {
  return borrowerCharacteristics.map((characteristic, index) => {
    return [
      <tr key={index}>
        <th
          colSpan={13}
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {characteristic.characteristic}
        </th>
      </tr>,
      renderCharacteristicDetails(characteristic),
    ]
  })
}

const renderCharacteristicDetails = (characteristic) => {
  if (characteristic.characteristic === 'Race')
    return characteristic.races.map((race, index) => {
      return (
        <tr key={index}>
          <th>{race.race}</th>
          {race.dispositions.map((disposition, index) => {
            return [
              <td key='count'>{disposition.count}</td>,
              <td key='value'>{disposition.value}</td>,
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Ethnicity')
    return characteristic.ethnicities.map((ethnicity, index) => {
      return (
        <tr key={index}>
          <th>{ethnicity.ethnicity}</th>
          {ethnicity.dispositions.map((disposition, index) => {
            return [
              <td key='count'>{disposition.count}</td>,
              <td key='value'>{disposition.value}</td>,
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Minority Status')
    return characteristic.minorityStatus.map((minorityStatus, index) => {
      return (
        <tr key={index}>
          <th>{minorityStatus.minorityStatus}</th>
          {minorityStatus.dispositions.map((disposition, index) => {
            return [
              <td key='count'>{disposition.count}</td>,
              <td key='value'>{disposition.value}</td>,
            ]
          })}
        </tr>
      )
    })
}

const Five = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width='20%' rowSpan={2}>
            INCOME, RACE AND ETHNICITY
          </th>
          <th colSpan={2} width='13.333%'>
            Applications Received
          </th>
          <th colSpan={2} width='13.333%'>
            Loans Originated
          </th>
          <th colSpan={2} width='13.333%'>
            Apps. Approved But Not Accepted
          </th>
          <th colSpan={2} width='13.333%'>
            Applications Denied
          </th>
          <th colSpan={2} width='13.333%'>
            Applications Withdrawn
          </th>
          <th colSpan={2} width='13.333%'>
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
      <tbody>{renderData(props.report.applicantIncomes)}</tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          {props.report.total.map((total, index) => {
            return [
              <td key='count'>{total.count}</td>,
              <td key='value'>{total.value}</td>,
            ]
          })}
        </tr>
      </tfoot>
    </table>
  )
})

Five.propTypes = {
  report: PropTypes.object,
}

export default Five
