import PropTypes from "prop-types"
import React, { useMemo } from 'react'
import { ReportPagination, usePagination } from '../ReportPagination'

const renderData = (tracts) => {
  return tracts.map((tract, index) => {
    return (
      <tr key={index}>
        <th
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            backgroundColor: "#f1f1f1",
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

/**
 * Reducer function to aggregate Disposition data by dispositionName
 * @param {Object} prev
 * @param {Object} curr
 * @returns Array[Object]
 */
 const valueReducer = (prev, curr) => {
  // Initialize tracker object for this dispositionName if necessary
  if (!prev[curr.dispositionName])
    prev[curr.dispositionName] = {
      dispositionName: curr.dispositionName,
      value: 0,
      count: 0,
    }

  // Summarize content
  prev[curr.dispositionName].count += curr.count
  prev[curr.dispositionName].value += curr.value
  return prev
}

/**
 * Temporary Fix: Identifies unaggregated Disposition entries and aggregates them
 * @param {Array} data
 */
const fixUnaggregatedValue = data => {
  const idxsNeedAggregation = []

  data.forEach((x, idx) => x.values.length > 7 && idxsNeedAggregation.push(idx))

  // Aggregate un-aggregated value data
  idxsNeedAggregation.forEach(i => {
    const obj = data[i].values.reduce(valueReducer, {})
    data[i].values = Object.keys(obj).map(k => obj[k])
  })

  return data
}

export const sortAndFix = (report) => {
  const sorted = report.tracts.sort(function (tractA, tractB) {
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

  return fixUnaggregatedValue(sorted)
}

export const buildCSVRowsAggregate2 = (report) => {
  let theCSVRows = ''

  const _data = sortAndFix(report)
  
  _data.forEach(tract => {
    const _columns = tract.values.sort(function(x,y){
      var xp = x.dispositionName.substring(x.dispositionName.length-3);
      var yp = y.dispositionName.substring(y.dispositionName.length-3);
      return xp == yp ? 0 : xp < yp ? -1 : 1;
    }).map(val => [val.count, val.value]).flat().join(',')

    theCSVRows += tract.tract + ',' + _columns + '\n'
  })

  return theCSVRows
}

const Aggregate2 = React.forwardRef((props, ref) => {
  const sortedTracts = useMemo(
    () => sortAndFix(props.report),
    [props.report]
  )

  const {
    currentItems,
    currentPage,
    handlePageChange,
    isPageLoading,
    isVisible,
    pageCount,
  } = usePagination({
    data: sortedTracts,
    renderFn: renderData,
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
      />

      <table ref={ref} style={{ fontSize: ".75em" }}>
        <thead>
          <tr>
            <th width="20%" rowSpan={5}>
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
            <th width="5%" colSpan={2}>
              FHA, FSA/RHS & VA
            </th>
            <th width="5%" colSpan={2}>
              Conventional
            </th>
            <th width="5%" colSpan={2}>
              Refinancings
            </th>
            <th width="5%" colSpan={2}>
              Home Improvement Loans
            </th>
            <th width="5%" colSpan={2}>
              Loans on Dwellings For 5 or More Families
            </th>
            <th width="5%" colSpan={2}>
              Nonoccupant Loans From Columns A, B, C, and D
            </th>
            <th width="5%" colSpan={2}>
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
              <td style={{ textAlign: "center" }} colSpan={15}>
                <p style={{ fontSize: "1.7rem" }}>
                  There were no loans purchased by{" "}
                  <strong>{props.report.institutionName}</strong> in{" "}
                  <strong>
                    MSA/MD {props.report.msa.id} - {props.report.msa.name}
                  </strong>{" "}
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
      />
    </>
  )
})

Aggregate2.propTypes = {
  report: PropTypes.object,
}

export default Aggregate2
