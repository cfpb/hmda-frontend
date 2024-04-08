import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import fileSaver from 'file-saver'
import { useState, useRef } from 'react'
import Pills from './Pills'
import './SimpleSortTable.css'
import { buildCSVRows } from '../data-publication/reports/tables/AggregateUtils'

const SimpleSortTable = (props) => {
  const {
    data,
    columns,
    customFooter,
    initialSort: { sort, setSort },
    year,
  } = props

  const [sorting, setSorting] = useState(sort || [])

  const tableRef = useRef()

  // Generates a CSV file from the table on the page
  const generateCSV = () => {
    let theCSV = ''

    if (!tableRef.current) return

    // Extracting table header innerHTML because the table headers contained sorting icons
    const tHeadRows = tableRef.current.tHead.rows.item('0').cells
    const rowArray = Array.from(tHeadRows)
    const rowHeaders = rowArray.map(
      (header) => header.children.item('0').children.item('0').innerHTML,
    )

    theCSV = theCSV + rowHeaders.join(',') + '\n'

    // Extracting table body rows
    const tBodyRows = tableRef.current.tBodies[0].rows
    theCSV = theCSV + buildCSVRows(tBodyRows, 'body')

    // Extracting table footer rows
    const tFootRows = tableRef.current.tFoot.rows
    theCSV = theCSV + buildCSVRows(tFootRows, 'foot')

    // Downloads CSV file
    fileSaver.saveAs(
      new Blob([theCSV], { type: 'text/csv;charset=utf-16' }),
      `${year} Quarterly Filer Loan and Application Counts.csv`,
    )
  }

  const onSortingChange = (changeFn) => {
    setSorting(changeFn)
    setSort?.call(undefined, changeFn)
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    enableSortingRemoval: false,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const updateSortSelection = (updatedSelection) =>
    onSortingChange((old) => updatedSelection)

  const getSortArrow = (sorted) => {
    if (sorted === 'asc') return '\u2191'
    if (sorted === 'desc') return '\u2193'
    return '\u2195'
  }

  const pills = sort.map((s) => {
    const label = columns
      .find(({ accessorKey }) => accessorKey === s.id)
      ?.header.concat(s.desc ? ' \u2193' : ' \u2191')
    return { ...s, label }
  })

  return (
    <div className='simple-sort-table-container'>
      <div>
        <ul>
          <li>Table is sortable by selecting the column headers.</li>
          <li>
            Hold Shift and select multiple column headers to sort by multiple
            fields.
          </li>
        </ul>

        {data && (
          <button
            onClick={() => generateCSV()}
            style={{ margin: '5px 0px 15px 0px' }}
          >
            Save as CSV
          </button>
        )}

        <div>
          <Pills values={pills} onChange={updateSortSelection} />
        </div>
      </div>
      <table className='simple-sort-table' ref={tableRef}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const clickableHeader = header.column.getCanSort()
                  ? 'cursor-pointer select-none'
                  : null
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={clickableHeader}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                        <span className='sort-icon'>
                          {getSortArrow(header.column.getIsSorted())}
                        </span>
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {cell.getContext().getValue()?.toLocaleString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>{customFooter}</tfoot>
      </table>
    </div>
  )
}

export default SimpleSortTable
