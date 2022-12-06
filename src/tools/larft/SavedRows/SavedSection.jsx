import React, { useState } from 'react'
import { Table } from 'react-fluid-table'
import { applyFilter } from '../parsedHelpers'
import {
  getSchema,
  goToFileActions,
  LAR_SCHEMA,
  RECORD_IDENTIFIER,
  TS_SCHEMA,
} from '../utils'
import { NoMatches, NoRecords } from './EmptyStates'
import { ContentRowID, HeaderRowID } from './RowID'
import { Filters, SearchBox } from './Filters'
import {
  calcTableHeight,
  columnIsSelected,
  formatColWidth,
  formatFieldID,
  getUsableProps,
} from './service'

import { selectCol, selectRow } from '../redux/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'


export const SavedSection = ({
  id,
  title = 'Section Title',
  rows,
  highlightSelected,
}) => {
  let body = null
  const dispatch = useDispatch()
  const selectedColName = useSelector(({ larft }) => larft.selectedColName)

  const [searchFilter, setSearchFilter] = useState('')
  const [columnFilter, setColumnFilter] = useState('')

  let matchedColumns = []
  const targetSchema = id === 'saved-lars' ? LAR_SCHEMA : TS_SCHEMA

  const filteredRows = !searchFilter.length
    ? rows
    : rows.filter(iRow => {
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

  const columns = !rows.length
    ? null
    : getSchema(rows[0][RECORD_IDENTIFIER])
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

            if (columnIsSelected(selectedColName, f))
              wrapperClasses.push('selected')

            const clickHandler = () => {
              dispatch(selectCol(f?.fieldName))
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
            const clickHandler = () => dispatch(selectCol(f?.fieldName))

            if (columnIsSelected(selectedColName, f))
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
          onRowClick={(_, { index }) =>
            dispatch(selectRow(filteredRows[index].id))
          }
          rowStyle={i => highlightSelected(filteredRows[i])}
          searchFilter={searchFilter}
          columnFilter={columnFilter}
        />
      )
    }
  }

  const rowCountLabel =
    filteredRows.length !== rows.length
      ? `(${filteredRows.length}/${rows.length})`
      : `(${rows.length})`

  return (
    <div className='section' id={id}>
      <h3 className='clickable' onClick={goToFileActions}>
        <div className='count'>
          {title} {rowCountLabel}
        </div>
        <Filters show={!!rows.length}>
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
