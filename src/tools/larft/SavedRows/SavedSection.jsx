import React, { useMemo, useState } from 'react'
import { Table } from 'react-fluid-table'
import { applyFilter } from '../parsedHelpers'
import {
  getSchema,
  goToFileActions,
  LAR_SCHEMA,
  log,
  RECORD_IDENTIFIER,
  TS_SCHEMA,
} from '../utils'
import { NoMatches, NoRecords } from './EmptyStates'
import { ContentRowID, HeaderRowID } from './RowID'
import { Filters, SearchBox } from './Filters'
import {
  addRowId,
  calcTableHeight,
  columnIsSelected,
  formatColWidth,
  formatFieldID,
  getUsableProps,
} from './service'

export const SavedSection = ({
  id,
  title = 'Section Title',
  rows,
  larRowCount,
  highlightSelected,
  setSelected,
  setCurrCol,
  currCol,
}) => {
  let body = null

  const [searchFilter, setSearchFilter] = useState('')
  const [columnFilter, setColumnFilter] = useState('')

  // This memoization seems to fix a major performance bottleneck
  const rowsWithIds = useMemo(() => {
    log(`Calculating row IDs: ${title}`)
    return rows.map(addRowId)
  }, [rows])

  let matchedColumns = []
  const targetSchema = id === 'saved-lars' ? LAR_SCHEMA : TS_SCHEMA

  const filteredRows = !searchFilter.length
    ? rowsWithIds
    : rowsWithIds.filter(iRow => {
        let hasMatches = false
        targetSchema.forEach(col => {
          // Only search targeted columns
          if (!applyFilter(col, columnFilter)) return

          const fieldValue = iRow[col.fieldName]
          if (!fieldValue) return

          const matches = fieldValue
            .toString()
            .toLowerCase()
            .includes(searchFilter.toLowerCase())

          if (matches) {
            matchedColumns.push(col.fieldName)
            hasMatches = true
          }
        })
        return hasMatches
      })

  const columns = !rowsWithIds.length
    ? null
    : getSchema(rowsWithIds[0][RECORD_IDENTIFIER])
        .filter(x =>
          !matchedColumns.length ? true : matchedColumns.includes(x.fieldName)
        )
        .filter(x => applyFilter(x, columnFilter.toLowerCase()))
        .map(f => ({
          key: f.fieldName,
          header: f.fieldName,
          width: 'auto',
          header: props => {
            const fieldID = formatFieldID(f)
            const usableProps = getUsableProps(props)
            const wrapperClasses = ['clickable', 'header-cell', 'custom']

            if (columnIsSelected(currCol, f)) wrapperClasses.push('selected')

            const clickHandler = () => {
              setCurrCol(f)
              document
                .getElementById(fieldID)
                .scrollIntoView({ inline: 'center', block: 'start' })
            }

            return (
              <div
                id={fieldID}
                className={wrapperClasses.join(' ')}
                {...usableProps}
                style={{ width: formatColWidth(f) }}
                onClick={clickHandler}
              >
                <div className={'custom-cell-content header-cell-text'}>
                  {f.fieldName}
                </div>
              </div>
            )
          },
          content: ({ row }) => {
            let fieldValue = row[f.fieldName] || '-'
            const styles = { width: formatColWidth(f, -16) }
            const wrapperClasses = ['custom-cell-content']
            const clickHandler = () => setCurrCol(f)

            if (columnIsSelected(currCol, f))
              wrapperClasses.push('col-selected')

            const isMatchForSearch =
              searchFilter.length &&
              row[f.fieldName]
                ?.toString()
                .toLowerCase()
                .includes(searchFilter.toLowerCase())

            if (isMatchForSearch) {
              wrapperClasses.push('highlight-match')
              fieldValue = row[f.fieldName]
            }

            return (
              <div
                className={wrapperClasses.join(' ')}
                onClick={clickHandler}
                style={styles}
              >
                {fieldValue}
              </div>
            )
          },
        }))

  // Adds LAR row count key/value pair to fileredRows if Transmittal Sheet has been generated
  if (larRowCount && filteredRows.length) {
    console.log('Adding Row count to row', filteredRows[0])
    
    filteredRows[0]['Total Number of Entries Contained in Submission'] =
      larRowCount
  }

  if (!columns) body = <NoRecords />
  else {
    columns.unshift({
      key: 'rowId',
      width: 'auto',
      header: props => <HeaderRowID {...props} />,
      content: props => <ContentRowID {...props} />,
    })

    if (!filteredRows.length || columns.length === 1) {
      body = <NoMatches />
    } else {
      body = (
        <Table
          data={filteredRows}
          columns={columns}
          tableHeight={calcTableHeight(filteredRows)}
          minColumnWidth={200}
          onRowClick={(e, { index }) => setSelected(filteredRows[index])}
          rowStyle={i => highlightSelected(filteredRows[i])}
        />
      )
    }
  }

  const rowCountLabel =
    filteredRows.length !== rowsWithIds.length
      ? `(${filteredRows.length}/${rowsWithIds.length})`
      : `(${rowsWithIds.length})`

  return (
    <div className='section' id={id}>
      <h3 className='clickable' onClick={goToFileActions}>
        <div className='count'>
          {title} {rowCountLabel}
        </div>
        <Filters show={!!rowsWithIds.length}>
          <SearchBox
            onChange={e => setSearchFilter(e.target.value)}
            placeholder={'Search ' + (id.match(/ts/) ? 'TS' : 'LAR')}
            value={searchFilter}
            onClear={() => setSearchFilter('')}
            clearText='Clear Search'
          />
          <SearchBox
            onChange={e => setColumnFilter(e.target.value)}
            placeholder={'Filter columns'}
            value={columnFilter}
            onClear={() => setColumnFilter('')}
            clearText='Clear Filter'
          />
        </Filters>
      </h3>
      {body}
    </div>
  )
}
