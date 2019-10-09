import React from 'react'
import PropTypes from 'prop-types'

const renderData = applicantIncomes => {
  return applicantIncomes.map((applicantIncome, index) => {
    return [
      renderApplicantIncome(applicantIncome.applicantIncome, index),
      renderCharacteristics(applicantIncome.borrowerCharacteristics)
    ]
  })
}

const renderApplicantIncome = (applicantIncome, index) => {
  return (
    <tr key={index}>
      <th
        colSpan={15}
        style={{
          borderTopWidth: '2px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          backgroundColor: '#f1f1f1'
        }}
      >
        {applicantIncome}
      </th>
    </tr>
  )
}

function entries( obj ){
  const keys = Object.keys(obj)
  const keyValuePairs = keys.map(key => {
    const value = obj[key]
    return { [key]: value }
  })
  return keyValuePairs
}

const renderCharacteristics = borrowerCharacteristics => {
  let convertedBorrowerCharacteristics = entries(
    borrowerCharacteristics
  )

  return convertedBorrowerCharacteristics.map((borrower, index) => {
    return [
      <tr key={index}>
        <th
          colSpan={15}
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}
        >
          {borrower.race
            ? borrower.race.characteristic
            : borrower.ethnicity.characteristic}
        </th>
      </tr>,
      renderCharacteristicDetails(
        borrower.race ? borrower.race : borrower.ethnicity
      )
    ]
  })
}

const renderCharacteristicDetails = characteristic => {
  if (characteristic.characteristic === 'Race')
    return characteristic.races.map((race, index) => {
      return (
        <tr key={index}>
          <th>{race.race}</th>
          {race.dispositions.map((disposition, index) => {
            return [
              <td key="count">{disposition.count}</td>,
              <td key="value">{disposition.value}</td>
            ]
          })}
        </tr>
      )
    })

  if (characteristic.characteristic === 'Ethnicity')
    return characteristic.ethnicities.map((ethnicity, index) => {
      return (
        <tr key={index}>
          <th>{ethnicity.ethnicityName}</th>
          {ethnicity.dispositions.map((disposition, index) => {
            return [
              <td key="count">{disposition.count}</td>,
              <td key="value">{disposition.value}</td>
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
          {minorityStatus.dispositions.sort().map((disposition, index) => {
            return [
              <td key="count">{disposition.count}</td>,
              <td key="value">{disposition.value}</td>
            ]
          })}
        </tr>
      )
    })
}

const Aggregate5 = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={2}>
            INCOME, RACE AND ETHNICITY
          </th>
          <th colSpan={2} width="11.429%">
            Applications Received
          </th>
          <th colSpan={2} width="11.429%">
            Loans Originated
          </th>
          <th colSpan={2} width="11.429%">
            Apps. Approved But Not Accepted
          </th>
          <th colSpan={2} width="11.429%">
            Applications Denied
          </th>
          <th colSpan={2} width="11.429%">
            Applications Withdrawn
          </th>
          <th colSpan={2} width="11.429%">
            Files Closed for Incompleteness
          </th>
          <th colSpan={2} width="11.429%">
            Purchased Loans
          </th>
        </tr>
        <tr>
          <th>Number</th>
          <th>$Amount</th>
          <th>Number</th>
          <th>$Amount</th>
          <th>Number</th>
          <th>$Amount</th>
          <th>Number</th>
          <th>$Amount</th>
          <th>Number</th>
          <th>$Amount</th>
          <th>Number</th>
          <th>$Amount</th>
          <th>Number</th>
          <th>$Amount</th>
        </tr>
      </thead>
      <tbody>{renderData(props.report.applicantIncomes)}</tbody>
      <tfoot />
    </table>
  )
})

Aggregate5.displayName = 'Aggregate5'

Aggregate5.propTypes = {
  report: PropTypes.object
}

export default Aggregate5
