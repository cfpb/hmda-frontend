// Sort data by Tract name and apply aggregation fix (if provided)
export const sortAndFix = (report, fix) => {
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

  if (fix) fix(sorted)
  return sorted
}

/**
 * Temporary Fix: Identifies unaggregated Disposition entries and aggregates them
 * @param {Array} data
 */
export const fixAgg2 = (data) => {
  const idxsNeedAggregation = []

  data.forEach((x, idx) => x.values.length > 7 && idxsNeedAggregation.push(idx))

  // Aggregate un-aggregated value data
  idxsNeedAggregation.forEach((i) => {
    const obj = data[i].values.reduce(valueReducer, {})
    data[i].values = Object.keys(obj).map((k) => obj[k])
  })

  return data
}

/**
 * Temporary Fix: Identifies unaggregated Disposition entries and aggregates them
 * @param {Array} data
 */
export const fixAgg1 = (data) => {
  const idxsNeedAggregation = []

  data.forEach(
    (x, idx) =>
      x.dispositions.some((dispo) => dispo.values.length > 7) &&
      idxsNeedAggregation.push(idx),
  )

  // Aggregate un-aggregated disposition data
  idxsNeedAggregation.forEach((i) => {
    data[i].dispositions.forEach((d) => {
      const obj = d.values.reduce(valueReducer, {})
      d.values = Object.keys(obj).map((k) => obj[k])
    })
  })

  return data
}

/**
 * Reducer function to aggregate data by dispositionName
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

// Pagination label formatter to show first/last Tracts for a page
export const pageLabelTracts = (items) => {
  if (!items || !items.length) return null
  return items[0].tract + ' - ' + items[items.length - 1].tract
}

// Generate Aggregate1 report body for CSV download
export const buildCSVRowsAggregate1 = (report) => {
  let theCSVRows = ''

  const _data = sortAndFix(report, fixUnaggregatedDispositions)

  _data.forEach((tract) => {
    // Tract header
    theCSVRows += tract.tract + '\n'

    // Disposition rows
    tract.dispositions
      .sort(function (x, y) {
        var xp = x.titleForSorting.substring(x.titleForSorting.length - 3)
        var yp = y.titleForSorting.substring(y.titleForSorting.length - 3)
        return xp == yp ? 0 : xp < yp ? -1 : 1
      })
      .forEach((dispo) => {
        const _rowLabel = dispo.title
        const _cols = dispo.values
          .sort(function (x, y) {
            var xp = x.dispositionName.substring(x.dispositionName.length - 3)
            var yp = y.dispositionName.substring(y.dispositionName.length - 3)
            return xp == yp ? 0 : xp < yp ? -1 : 1
          })
          .map((dispo) => [dispo.count, dispo.value])
          .flat()
          .join(',')

        theCSVRows += _rowLabel + ',' + _cols + '\n'
      })
  })

  return theCSVRows
}

// Generate Aggregate2 report body for CSV download
export const buildCSVRowsAggregate2 = (report) => {
  let theCSVRows = ''

  const _data = sortAndFix(report)

  _data.forEach((tract) => {
    const _columns = tract.values
      .sort(function (x, y) {
        var xp = x.dispositionName.substring(x.dispositionName.length - 3)
        var yp = y.dispositionName.substring(y.dispositionName.length - 3)
        return xp == yp ? 0 : xp < yp ? -1 : 1
      })
      .map((val) => [val.count, val.value])
      .flat()
      .join(',')

    theCSVRows += tract.tract + ',' + _columns + '\n'
  })

  return theCSVRows
}

// Function used to help build html table elements into CSV files
export const buildCSVRows = (rows, rowType) => {
  let theCSVRows = ''
  Array.prototype.forEach.call(rows, (row, rowIndex) => {
    // in a thead, account for the rowSpan by adding an empty cell
    if (rowType === 'head') {
      if (rowIndex !== 0) theCSVRows = theCSVRows + ','
    }
    // loop through the cells
    Array.prototype.forEach.call(row.cells, (cell, cellIndex) => {
      // add the content
      theCSVRows = theCSVRows + '"' + cell.innerHTML + '"'
      if (cell.hasAttribute('colspan')) {
        const spanCount = parseInt(cell.getAttribute('colspan'), 10)
        let i = 0
        for (i; i < spanCount - 1; i++) {
          theCSVRows = theCSVRows + ','
        }
      }
      // last child
      if (row.cells.length - 1 === cellIndex) {
        theCSVRows = theCSVRows + '\n'
      } else {
        theCSVRows = theCSVRows + ','
      }
    })
  })

  return theCSVRows
}
