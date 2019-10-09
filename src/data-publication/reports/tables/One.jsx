import React from 'react'
import PropTypes from 'prop-types'

const renderData = (tracts, reportType) => {
  return tracts.map((tract, index) => {
    return [
      <tr key={index}>
        <th
          style={{
            borderTopWidth: '2px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1'
          }}
          colSpan={15}
        >
          {tract.tract}
        </th>
        {reportType === 'aggregate'
          ? renderAggregateData(tract.dispositions)
          : null}
      </tr>,
      renderDispositions(tract.dispositions, reportType, index)
    ]
  })
}

const renderAggregateData = dispositions => {
  let toRender = []
  dispositions.forEach((disposition, index) => {
    if (
      disposition.title === '% Minority Population' ||
      disposition.title === 'Median Income as PCT of MSA/MD Median'
    ) {
      const key = disposition.title + index
      toRender.push(
        <td
          key={key}
          style={{
            borderTopWidth: '2px',
            backgroundColor: '#f1f1f1'
          }}
        >
          {disposition.values}
        </td>
      )
    }
  })

  return toRender.map((render, index) => {
    return render
  })
}

const renderDispositions = (dispositions, reportType, key) => {
  return dispositions.map((disposition, index) => {
    if (
      disposition.title === '% Minority Population' ||
      disposition.title === 'Median Income as PCT of MSA/MD Median'
    ) {
      return null
    }

    return (
      <tr key={`${key}-${index}`}>
        <th>{disposition.title}</th>
        {renderDispositionValues(disposition.values, key, index)}
        {reportType === 'aggregate' ? (
          <React.Fragment>
            <td />
            <td />
          </React.Fragment>
        ) : null}
      </tr>
    )
  })
}

const renderDispositionValues = (values, key, key2) => {
  return values.map((value, index) => {
    return [
      <td key={`count-${key}-${key2}-${index}`}>{value.count}</td>,
      <td key={`value-${key}-${key2}-${index}`}>{value.value}</td>
    ]
  })
}

const One = React.forwardRef((props, ref) => {
  if (!props.report) return null

  const sortedTracts = props.report.tracts.sort(function(tractA, tractB) {
    const idA = tractA.tract.toUpperCase()
    const idB = tractB.tract.toUpperCase()

    if (idA < idB) {
      return -1
    }
    if (idA > idB) {
      return 1
    }

    return 0
  })

  let colWidth = '5.7%'
  if (props.reportType === 'aggregate') colWidth = '5%'

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width="20%" rowSpan={5}>
            CENSUS TRACT OR COUNTY NAME AND DISPOSITION OF APPLICATION
            (STATE/COUNTY/TRACT NUMBER)
          </th>
          <th colSpan={8}>
            Loans on 1- to 4-Family and Manufactured Home Dwellings
          </th>
          <th colSpan={props.reportType === 'aggregate' ? 8 : 6} />
        </tr>
        <tr>
          <th colSpan={4}>Home Purchase Loans</th>
          <th colSpan={props.reportType === 'aggregate' ? 12 : 10} />
        </tr>
        <tr>
          <th width={colWidth} colSpan={2}>
            FHA, FSA/RHS & VA
          </th>
          <th width={colWidth} colSpan={2}>
            Conventional
          </th>
          <th width={colWidth} colSpan={2}>
            Refinancings
          </th>
          <th width={colWidth} colSpan={2}>
            Home Improvement Loans
          </th>
          <th width={colWidth} colSpan={2}>
            Loans on Dwellings For 5 or More Families
          </th>
          <th width={colWidth} colSpan={2}>
            Nonoccupant Loans From Columns A, B, C, and D
          </th>
          <th width={colWidth} colSpan={2}>
            Loans On Manufactured Home Dwellings From Columns A, B, C, & D
          </th>
          {props.reportType === 'aggregate' ? (
            <React.Fragment>
              <th width={colWidth} rowSpan={3}>
                % Min Pop
              </th>
              <th width={colWidth} rowSpan={3}>
                Median Income As PCT of MSA/MD Median
              </th>
            </React.Fragment>
          ) : null}
        </tr>
        <tr>
          <th colSpan={2}>A</th>
          <th colSpan={2}>B</th>
          <th colSpan={2}>C</th>
          <th colSpan={2}>D</th>
          <th colSpan={2}>E</th>
          <th colSpan={2}>F</th>
          <th colSpan={2}>G</th>
        </tr>
        <tr>
          <th>Number</th>
          <th>$</th>
          <th>Number</th>
          <th>$</th>
          <th>Number</th>
          <th>$</th>
          <th>Number</th>
          <th>$</th>
          <th>Number</th>
          <th>$</th>
          <th>Number</th>
          <th>$</th>
          <th>Number</th>
          <th>$</th>
        </tr>
      </thead>
      <tbody>
        {props.report.tracts.length === 0 ? (
          <tr>
            <td style={{ textAlign: 'center' }} colSpan={15}>
              <p style={{ fontSize: '1.7rem' }}>
                There were no loans purchased by{' '}
                <strong>{props.report.institutionName}</strong> in{' '}
                <strong>
                  MSA/MD {props.report.msa.id} - {props.report.msa.name}
                </strong>{' '}
                for <strong>{props.report.year}</strong>.
              </p>
            </td>
          </tr>
        ) : (
          renderData(sortedTracts, props.reportType)
        )}
      </tbody>
    </table>
  )
})

One.propTypes = {
  report: PropTypes.object,
  reportType: PropTypes.string
}

export default One
