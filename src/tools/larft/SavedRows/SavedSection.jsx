import React, { useMemo, useState } from 'react'
import { Table } from 'react-fluid-table'
import { useDispatch, useSelector } from 'react-redux'
import { selectRow } from '../redux/store'
import { goToFileActions, LAR_SCHEMA, TS_SCHEMA } from '../utils'
import { applyRowFilter } from './applyRowFilter'
import { buildColumns } from './buildColumns'
import { NoMatches, NoRecords } from './EmptyStates'
import { Filters, SearchBox } from './Filters'
import { ContentRowID, HeaderRowID } from './RowID'
import { SectionTitle } from './SectionTitle'
import { calcTableHeight } from './service'

export const SavedSection = ({
  id,
  title = 'Section Title',
  rows,
  highlightSelected,
}) => {
  const dispatch = useDispatch()
  const selectedColName = useSelector(({ larft }) => larft.selectedColName)

  const [searchFilter, setSearchFilter] = useState('')
  const [columnFilter, setColumnFilter] = useState('')

  let matchedColumns = []
  const targetSchema = id === 'saved-lars' ? LAR_SCHEMA : TS_SCHEMA

  const filteredRows = applyRowFilter({
    rows,
    matchedColumns,
    columnFilter,
    searchFilter,
    targetSchema,
  })

  const columns = buildColumns({
    rows,
    matchedColumns,
    columnFilter,
    searchFilter,
    targetSchema,
    selectedColName,
  })

  const body = useMemo(() => {
    if (!columns) return <NoRecords />
    else {
      columns.unshift({
        key: 'rowId',
        width: 'auto',
        header: props => <HeaderRowID {...props} />,
        content: props => <ContentRowID {...props} />,
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
            onRowClick={(_, { index }) => dispatch(selectRow(filteredRows[index].id)) }
            rowStyle={i => highlightSelected(filteredRows[i])}
          />
        )
      }
    }
  }, [searchFilter, columnFilter, rows, highlightSelected])

  return (
    <div className='section' id={id}>
      <h3 className='clickable' onClick={goToFileActions}>
        <SectionTitle title={title} filteredRows={filteredRows} rows={rows} />
        <Filters show={!!rows.length}>
          <SearchBox
            onChange={e => setSearchFilter(e.target.value)}
            placeholder={'Search ' + (id.match(/ts/) ? 'TS' : 'LAR')}
            value={searchFilter}
            onClear={() => setSearchFilter('')}
            clearText='Clear Search'
            isTS={!!id.match(/ts/)}
          />
          <SearchBox
            onChange={e => setColumnFilter(e.target.value)}
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