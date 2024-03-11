import React from 'react'
import PropTypes from 'prop-types'

const renderData = (report) => {
  return [
    renderCensusTractCharacteristics(report.censusTractCharacteristics),
    renderIncomeRaces(report.incomeRaces),
    renderTypes(report.types),
  ]
}

const renderTypes = (types) => {
  return types.map((type, index) => {
    return (
      <tr key={`type-${index}`}>
        <th
          style={{
            borderTopWidth: '2px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1',
          }}
        >
          {type.type}
        </th>
        {renderTypeDispositions(type.dispositions, index)}
      </tr>
    )
  })
}

const renderTypeDispositions = (dispositions, key) => {
  return dispositions.map((disposition, index) => {
    return [
      <td
        style={{
          borderTopWidth: '2px',
          backgroundColor: '#f1f1f1',
        }}
        key={`type-count-${index}-${key}`}
      >
        {disposition.count}
      </td>,
      <td
        style={{
          borderTopWidth: '2px',
          backgroundColor: '#f1f1f1',
        }}
        key={`type-value-${index}-${key}`}
      >
        {disposition.value}
      </td>,
    ]
  })
}

const renderIncomeRaces = (incomeRaces) => {
  return incomeRaces.map((incomeRace, index) => {
    return [
      <tr key={`inccomeRaces-${index}`}>
        <th
          colSpan={13}
          style={{
            borderTopWidth: '2px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1',
          }}
        >
          {incomeRace.characteristic}
        </th>
      </tr>,
      renderIncomeRacesDetails(incomeRace.incomes, index),
    ]
  })
}

const renderIncomeRacesDetails = (incomes, key) => {
  return incomes.map((income, index) => {
    return [
      <tr key={`inccomeRaces-${index}-${key}`}>
        <th
          colSpan={13}
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            backgroundColor: '#f1f1f1',
          }}
        >
          {income.income}
        </th>
      </tr>,
      renderIncomeRacesCompositions(income.compositions, key, index),
    ]
  })
}

const renderIncomeRacesCompositions = (compositions, key, key2) => {
  return compositions.map((composition, index) => {
    return [
      <tr key={`inccomeRaces-${index}-${key}-${key2}`}>
        <th
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {composition.composition}
        </th>
        {renderIncomeRacesDispositions(
          composition.dispositions,
          key,
          key2,
          index,
        )}
      </tr>,
    ]
  })
}

const renderIncomeRacesDispositions = (dispositions, key, key2, key3) => {
  return dispositions.map((disposition, index) => {
    return [
      <td key={`inccomeRaces-count-${index}-${key}-${key2}-${key3}`}>
        {disposition.count}
      </td>,
      <td key={`inccomeRaces-value-${index}-${key}-${key2}-${key3}`}>
        {disposition.value}
      </td>,
    ]
  })
}

const renderCensusTractCharacteristics = (censusTractCharacteristics) => {
  return censusTractCharacteristics.map((censusTractCharacteristic, index) => {
    let details = ''
    if (censusTractCharacteristic.compositions) {
      details = 'compositions'
    }
    if (censusTractCharacteristic.incomes) {
      details = 'incomes'
    }

    return [
      <tr key={`censusTract-${index}`}>
        <th
          colSpan={13}
          style={{
            borderTopWidth: '2px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1',
          }}
        >
          {censusTractCharacteristic.characteristic}
        </th>
      </tr>,
      renderCensusTractCharacteristic(
        censusTractCharacteristic,
        details,
        index,
      ),
    ]
  })
}

const renderCensusTractCharacteristic = (
  censusTractCharacteristic,
  details,
  key,
) => {
  let subDetail = 'composition'
  if (details === 'incomes') subDetail = 'income'

  return censusTractCharacteristic[details].map((detail, index) => {
    return (
      <tr key={`censusTract-${index}-${key}`}>
        <th
          style={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {detail[subDetail]}
        </th>
        {renderDispositions(detail.dispositions, key, index)}
      </tr>
    )
  })
}

const renderDispositions = (dispositions, key, key2) => {
  return dispositions.map((disposition, index) => {
    return [
      <td key={`censusTract-count-${index}-${key}-${key2}`}>
        {disposition.count}
      </td>,
      <td key={`censusTract-value-${index}-${key}-${key2}`}>
        {disposition.value}
      </td>,
    ]
  })
}

const Seven = React.forwardRef((props, ref) => {
  if (!props.report) return null

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width='20%' rowSpan={2}>
            TYPE OF CENSUS TRACT
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
              <td key={`total-count-${index}`}>{total.count}</td>,
              <td key={`total-value-${index}`}>{total.value}</td>,
            ]
          })}
        </tr>
      </tfoot>
    </table>
  )
})

Seven.propTypes = {
  report: PropTypes.object,
}

export default Seven
