import React from 'react'
import PropTypes from 'prop-types'

const renderData = (tracts) => {
  return tracts.map((tract, index) => {
    return (
      <tr key={index}>
        <th
          style={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: '#f1f1f1',
          }}
        >
          {tract.tract}
        </th>
        {renderValues(tract.values, index)}
      </tr>
    )
  })
}

const renderValues = (values, key) => {
  return values.map((value, index) => {
    return [
      <td key={`count-${key}-${index}`}>{value.count}</td>,
      <td key={`value-${key}-${index}`}>{value.value}</td>,
    ]
  })
}

const Two = React.forwardRef((props, ref) => {
  if (!props.report) return null

  const sortedTracts = props.report.tracts.sort(function (tractA, tractB) {
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

  return (
    <table ref={ref} style={{ fontSize: '.75em' }}>
      <thead>
        <tr>
          <th width='20%' rowSpan={5}>
            CENSUS TRACT OR COUNTY NAME (STATE/COUNTY/TRACT NUMBER)
          </th>
          <th colSpan={8}>
            Loans on 1- to 4-Family and Manufactured Home Dwellings
          </th>
          <th colSpan={6} />
        </tr>
        <tr>
          <th colSpan={4}>Home Purchase Loans</th>
          <th colSpan={10} />
        </tr>
        <tr>
          <th width='5%' colSpan={2}>
            FHA, FSA/RHS & VA
          </th>
          <th width='5%' colSpan={2}>
            Conventional
          </th>
          <th width='5%' colSpan={2}>
            Refinancings
          </th>
          <th width='5%' colSpan={2}>
            Home Improvement Loans
          </th>
          <th width='5%' colSpan={2}>
            Loans on Dwellings For 5 or More Families
          </th>
          <th width='5%' colSpan={2}>
            Nonoccupant Loans From Columns A, B, C, and D
          </th>
          <th width='5%' colSpan={2}>
            Loans On Manufactured Home Dwellings From Columns A, B, C, & D
          </th>
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
          renderData(sortedTracts)
        )}
      </tbody>
    </table>
  )
})

Two.propTypes = {
  report: PropTypes.object,
}

export default Two
