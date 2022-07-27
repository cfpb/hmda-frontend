import { useState } from 'react';
import { useReactTable, flexRender, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table';
import './SimpleSortTable.css';

const SimpleSortTable = props => {
  const { data, columns, customFooter, initialSort } = props;

  const [sorting, setSorting] = useState(initialSort || []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getSortArrow = sorted => {
    if (sorted === 'asc') return '\u25b2';
    if (sorted === 'desc') return '\u25bc';
    return null;
  }

  return <table className="simple-sort-table">
    <thead>
      {
        table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                      onClick={header.column.getToggleSortingHandler()}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span className="sort-icon">{getSortArrow(header.column.getIsSorted())}</span>
                    </div>
                  )}
                </th>
              )
            })}
          </tr>
        ))
      }
    </thead>
    <tbody>
      {table.getRowModel().rows.map(row => {
        return <tr key={row.id}>
          {row.getVisibleCells().map(cell => {
            return (
              <td key={cell.id}>
                {cell.getContext().getValue()?.toLocaleString()}
              </td>
            )
          })}
        </tr>;
      })}
    </tbody>
    <tfoot>
      {customFooter}
    </tfoot>
  </table>;
};

export default SimpleSortTable;