import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingIcon from '../../../common/LoadingIcon'
import SimpleSortTable from '../../../common/SimpleSortTable'
import { institutions } from '../slice'
import './QuarterlyFilersTable.css'
import { useLatestAvailableYear } from './useLatestAvailableYear'

const QuarterlyFilersTable = (props) => {
  const dispatch = useDispatch()
  const { sort } = useSelector((state) => state.institutionsConfig)
  const year = useLatestAvailableYear()
  const past = 3

  const pastYears = [...Array(past).keys()].map((i) => `${year - i - 1}`)

  const { data, isSuccess } = institutions.useGetQuarterliesWithLarsQuery(
    { year, past },
    { skip: !year },
  )

  const setSort = (sortUpdateFn) =>
    dispatch(institutions.updateSort(sortUpdateFn(sort)))

  const tableColumns = useMemo(() => {
    const countsColumns = pastYears.map((accessorKey) => {
      return {
        header: accessorKey + ' LAR Count',
        accessorKey,
        sortingFn: 'alphanumeric',
      }
    })

    return [
      {
        header: "Institution Name",
        accessorKey: "name",
        sortingFn: "text",
      },
      {
        header: 'LEI',
        accessorKey: 'lei',
        sortingFn: 'text',
      },
      {
        header: 'Agency',
        accessorKey: 'agency',
        sortingFn: 'text',
      },
      ...countsColumns,
    ]
  })

  let content

  if (isSuccess && data) {
    const tableData = data.quarterly.map(({ name, lei, agency, larCounts }) => {
      let counts = {}
      larCounts.forEach((ts) => {
        counts[ts.year] = ts.count
      })
      return {
        name: name.toUpperCase(),
        lei,
        agency,
        ...counts,
      }
    })

    const quarterlySums = {}
    pastYears.forEach((yr) => {
      quarterlySums[yr] = data.quarterly.reduce((prev, curr) => {
        const tsLar = curr.larCounts.find((ts) => ts.year === yr)
        return tsLar ? prev + tsLar.count : prev
      }, 0)
    })

    const customFooter = (
      <>
        <tr>
          <th colSpan='3' style={{ textAlign: 'right' }}>
            Total of Quarterly Filers
          </th>
          {pastYears.map((yr) => {
            return <td key={yr}>{quarterlySums[yr].toLocaleString()}</td>
          })}
        </tr>
        <tr>
          <th colSpan='3' style={{ textAlign: 'right' }}>
            Total of All Filers
          </th>
          {pastYears.map((yr) => {
            return (
              <td key={yr}>
                {(
                  data.yearly.find(
                    (yearlyCount) => yearlyCount.year === yr,
                  ) || {
                    count: 0,
                  }
                ).count.toLocaleString()}
              </td>
            )
          })}
        </tr>
      </>
    )
    content = (
      <SimpleSortTable
        columns={tableColumns}
        data={tableData}
        customFooter={customFooter}
        initialSort={{ sort, setSort }}
        year={year}
      />
    )
  }

  if (!year || !content) return <LoadingIcon />

  return (
    <div className='quarterly-filers-table'>
      <h2 className='table-heading'>
        Quarterly Filer Loan and Application Counts
      </h2>
      <div className='table-container'>{content}</div>
    </div>
  )
}

export default QuarterlyFilersTable
