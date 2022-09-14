import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import Pills from './Pills';
import './SimpleSortTable.css';

const SimpleSortTable = props => {
  const { data, columns, customFooter, initialSort: { sort, setSort } } = props;

  const [sorting, setSorting] = useState(sort || []);

  const onSortingChange = changeFn => {
    setSorting(changeFn);
    setSort?.call(undefined, changeFn);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    enableSortingRemoval: false,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const updateSortSelection = updatedSelection => onSortingChange(old => updatedSelection);

  const getSortArrow = sorted => {
    if (sorted === 'asc') return '\u2191';
    if (sorted === 'desc') return '\u2193';
    return '\u2195';
  };

  const pills = sort.map(s => {
    const label = columns.find(({ accessorKey }) => accessorKey === s.id)?.header.concat(s.desc ? ' \u2193' : ' \u2191');
    return { ...s, label }
  });

  return <div className="simple-sort-table-container">
    <div>
      <ul>
        <li>Table is sortable by selecting the column headers.</li>
        <li>Hold Shift and select multiple column headers to sort by multiple fields.</li>
      </ul>
      <div>
        <Pills values={pills} onChange={updateSortSelection} />
      </div>
    </div>
    <table className="simple-sort-table">
      <thead>
        {
          table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const clickableHeader = header.column.getCanSort() ? 'cursor-pointer select-none' : null;
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div className={clickableHeader}
                        onClick={header.column.getToggleSortingHandler()}>
                        <span>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </span>
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
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {cell.getContext().getValue()?.toLocaleString()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {customFooter}
      </tfoot>
    </table>
  </div>;
};

export default SimpleSortTable;