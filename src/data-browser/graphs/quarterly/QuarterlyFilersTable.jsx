import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIcon from '../../../common/LoadingIcon';
import SimpleSortTable from '../../../common/SimpleSortTable';
import { institutions } from '../slice';
import './QuarterlyFilersTable.css';

const QuarterlyFilersTable = props => {
  const dispatch = useDispatch();
  const [year, past] = [new Date().getFullYear(), 3];
  const { sort } = useSelector(state => state.institutionsConfig);
  const pastYears = [...Array(past).keys()].map(i => `${year - i - 1}`);

  const { data, isSuccess } = institutions.useGetQuarterliesWithLarsQuery({ year, past });

  const setSort = sortUpdateFn =>
    dispatch(institutions.updateSort(sortUpdateFn(sort)))

  let content = <LoadingIcon />

  const tableColumns = useMemo(() => {
    const countsColumns = pastYears.map(accessorKey => {
      return {
        header: accessorKey,
        accessorKey,
        sortingFn: "alphanumeric",
      }
    })

    return [
      {
        header: "Institution",
        accessorKey: "name",
        sortingFn: "text",
      },
      {
        header: "LEI",
        accessorKey: "lei",
        sortingFn: "text",
      },
      {
        header: "Agency",
        accessorKey: "agency",
        sortingFn: "text",
      },
      ...countsColumns,
    ]
  })

  if (isSuccess && data) {
    const tableData = data.quarterly.map(({ name, lei, agency, larCounts }) => {
      let counts = {}
      larCounts.forEach(ts => {
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
    pastYears.forEach(yr => {
      quarterlySums[yr] = data.quarterly.reduce((prev, curr) => {
        const tsLar = curr.larCounts.find(ts => ts.year === yr)
        return tsLar ? prev + tsLar.count : prev
      }, 0)
    })

    const customFooter = (
      <>
        <tr>
          <th colSpan='3' style={{ textAlign: "right" }}>
            Total of Quarterly Filers
          </th>
          {pastYears.map(yr => {
            return <td key={yr}>{quarterlySums[yr].toLocaleString()}</td>
          })}
        </tr>
        <tr>
          <th colSpan='3' style={{ textAlign: "right" }}>
            Total of All Filers
          </th>
          {pastYears.map(yr => {
            return (
              <td key={yr}>
                {(
                  data.yearly.find(yearlyCount => yearlyCount.year === yr) || {
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

  return (
    <div className='quarterly-filers-table'>
      <h2 className='table-heading'>
        {year} Quarterly Filer Loan and Application Counts
      </h2>
      <div className='table-container'>{content}</div>
    </div>
  )
}

export default QuarterlyFilersTable
