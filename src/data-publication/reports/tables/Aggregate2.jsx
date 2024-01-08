import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { ReportPagination, usePagination } from '../ReportPagination'
import { fixAgg2, pageLabelTracts, sortAndFix } from './AggregateUtils'

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

const Aggregate2 = React.forwardRef((props, ref) => {
  const sortedTracts = useMemo(
    () => sortAndFix(props.report, fixAgg2),
    [props.report],
  )

  const {
    currentItems,
    currentPage,
    handlePageChange,
    isPageLoading,
    isVisible,
    pageCount,
    displayLabel,
  } = usePagination({
    data: sortedTracts,
    renderFn: renderData,
    formatDisplayLabel: pageLabelTracts,
    itemsPerPage: 5000,
  })

  return (
    <>
      <ReportPagination
        currentPage={currentPage}
        isPageLoading={isPageLoading}
        isVisible={isVisible}
        onPageChange={handlePageChange}
        pageCount={pageCount}
        displayLabel={displayLabel}
      />

      <table ref={ref} style={{ fontSize: '.75em' }}>
        <thead>
          <tr>
            <th width='20%' rowSpan={5}>
              CENSUS TRACT OR COUNTY NAME (COUNTY/STATE/TRACT NUMBER)
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
            <th colSpan={2}>A</th>
            <th colSpan={2}>B</th>
            <th colSpan={2}>C</th>
            <th colSpan={2}>D</th>
            <th colSpan={2}>E</th>
            <th colSpan={2}>F</th>
            <th colSpan={2}>G</th>
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
            currentItems
          )}
        </tbody>
      </table>

      <ReportPagination
        currentPage={currentPage}
        isBottom={true}
        isPageLoading={isPageLoading}
        isVisible={isVisible}
        onPageChange={handlePageChange}
        pageCount={pageCount}
        displayLabel={displayLabel}
      />
    </>
  )
})

Aggregate2.propTypes = {
  report: PropTypes.object,
}

export default Aggregate2
