import React, { useMemo, useState } from 'react'
import { Table } from 'react-fluid-table'
import { useDispatch, useSelector } from 'react-redux'
import { selectRow } from '../../data-store/store'
import { LAR_SCHEMA, TS_SCHEMA } from '../../schema'
import { scrollToFileActions } from '../../utils/common'
import { applyRowFilter } from '../../utils/search'
import { buildColumns } from './buildColumns'
import { NoMatches, NoRecords } from './EmptyStates'
import { Filters, SearchBox } from './Filters'
import { ContentRowID, HeaderRowID } from './RowID'
import { SectionTitle } from './SectionTitle'

/**
 * Provides a searchable/filterable table of LAR/TS content.
 *
 * Table rows are selectable, with selected content being made available in
 * the <Editing /> component for modification.
 *
 * @param {String} id Section identifier
 * @param {String} title Section label
 * @param {Array} rows Table content
 */
export const SavedSection = ({ id, title = 'Section Title', rows }) => {
  const dispatch = useDispatch()
  const selectedColName = useSelector(({ larft }) => larft.selectedColName)
  const selectedRowID = useSelector(({ larft }) => larft.selectedRowID)

  const [searchFilter, setSearchFilter] = useState('')
  const [columnFilter, setColumnFilter] = useState('')

  const matchedColumns = []
  const schema = id === 'saved-lars' ? LAR_SCHEMA : TS_SCHEMA

  const highlightSelected = (r) => {
    if (!selectedRowID || !r) return {}
    const highlighted = selectedRowID === r.id
    return highlighted ? { background: 'lightblue' } : {}
  }

  const filteredRows = applyRowFilter({
    rows,
    matchedColumns,
    columnFilter,
    searchFilter,
    schema,
  })

  const columns = buildColumns({
    rows,
    matchedColumns,
    columnFilter,
    searchFilter,
    schema,
    selectedColName,
  })

  const body = useMemo(() => {
    if (!columns) return <NoRecords />
    else {
      columns.unshift({
        key: 'rowId',
        width: 'auto',
        header: (props) => <HeaderRowID {...props} />,
        content: (props) => <ContentRowID {...props} />,
      })

      if (!filteredRows.length || columns.length === 1) {
        return <NoMatches />
      } else {
        return (
          <Table
            data={filteredRows}
            columns={columns}
            tableHeight={calcTableHeight(filteredRows)}
            minColumnWidth={200}
            onRowClick={(_, { index }) =>
              dispatch(selectRow(filteredRows[index].id))
            }
            rowStyle={(i) => highlightSelected(filteredRows[i])}
          />
        )
      }
    }
  }, [searchFilter, columnFilter, rows, highlightSelected])

  return (
    <div className='section' id={id}>
      <h3 className='clickable' onClick={scrollToFileActions}>
        <SectionTitle title={title} filteredRows={filteredRows} rows={rows} />
        <Filters show={!!rows.length}>
          <SearchBox
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={'Search ' + (id.match(/ts/) ? 'TS' : 'LAR')}
            value={searchFilter}
            onClear={() => setSearchFilter('')}
            clearText='Clear Search'
            isTS={!!id.match(/ts/)}
          />
          <SearchBox
            onChange={(e) => setColumnFilter(e.target.value)}
            placeholder={'Filter columns'}
            value={columnFilter}
            onClear={() => setColumnFilter('')}
            clearText='Clear Filter'
            isTS={!!id.match(/ts/)}
          />
        </Filters>
      </h3>
      {body}
    </div>
  )
}

// Derive table height by number of rows
const calcTableHeight = (rows) => {
  const ROW_HEIGHT = 32

  let displayedRows = 0

  if (rows.length < 2) displayedRows = 3
  else displayedRows = Math.min(rows.length * 2, 8)

  return displayedRows * ROW_HEIGHT
}
