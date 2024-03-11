import React from 'react'
import PropTypes from 'prop-types'

const renderData = (report) => {
  const { races, ethnicities, minorityStatuses, incomes } = report
  return (
    <React.Fragment>
      {mapCharacteristic(races, 'race')}
      {mapCharacteristic(ethnicities, 'ethnicity')}
      {mapCharacteristic(minorityStatuses, 'minorityStatus')}
      {mapCharacteristic(incomes, 'income')}
    </React.Fragment>
  )
}

const mapCharacteristic = (arr, key) => {
  return [
    renderCharacteristicTitle(key),
    arr.map((characteristic) => {
      return renderCharacteristic(characteristic, key)
    }),
  ]
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
        {key === 'minorityStatus' ? 'MINORITY STATUS' : key}
      </th>
    </tr>
  )
}

const renderCharacteristic = (characteristic, key) => {
  const currChar = characteristic[key]

  if (key === 'income') {
    return (
      <tr className='characteristic-title' key={currChar}>
        <th>{currChar}</th>
        {characteristic.dispositions.map((disposition) => {
          return [
            <td key='count'>{disposition.count}</td>,
            <td key='value'>{disposition.value}</td>,
          ]
        })}
      </tr>
    )
  }

  return [
    <tr className='characteristic-title' key={currChar}>
      <th
        colSpan={13}
        style={{
          borderTopWidth: '2px',
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        {currChar}
      </th>
    </tr>,
    characteristic.genders.map((gender, index) => {
      const key = currChar + index
      return (
        <tr key={key}>
          <th>{gender.gender}</th>
          {gender.dispositions.map((disposition) => {
            return [
              <td key='count'>{disposition.count}</td>,
              <td key='value'>{disposition.value}</td>,
            ]
          })}
        </tr>
      )
    }),
    <tr key={currChar + 'total'}>
      <th>Total</th>
      {characteristic.dispositions.map((disposition) => {
        return [
          <td key='count'>{disposition.count}</td>,
          <td key='value'>{disposition.value}</td>,
        ]
      })}
    </tr>,
  ]
}

const Four = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width='20%' rowSpan={2}>
            RACE, ETHNICITY, GENDER, AND INCOME
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
      <tbody>{renderData(props.report)}</tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          {props.report.total.map((total, index) => {
            return [
              <td key={'count' + index}>{total.count}</td>,
              <td key={'value' + index}>{total.value}</td>,
            ]
          })}
        </tr>
      </tfoot>
    </table>
  )
})

Four.propTypes = {
  report: PropTypes.object,
}

export default Four
