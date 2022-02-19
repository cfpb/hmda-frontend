import React, { useMemo, useState } from 'react'
import {
  getSchema,
  log,
  LAR_SCHEMA,
  TS_SCHEMA,
  goToFileActions,
  RECORD_IDENTIFIER,
  goTo,
} from './utils'
import { Table } from 'react-fluid-table'
import { applyFilter } from './parsedHelpers'

const tableHeight = rows => {
  if (rows.length < 3) return 3
  return Math.min(rows.length * 2, 10)
}

const Section = ({
  id,
  title,
  rows,
  highlightSelected,
  setSelected,
  setCurrCol,
  currCol,
}) => {
  let body
  const [searchFilter, setSearchFilter] = useState('')
  const [columnFilter, setColumnFilter] = useState('')

  // This memoization seems to fix the major performance bottleneck
  const injectedRows = useMemo(() => {
    log(`Calculating row IDs: ${title}`)
    return rows.map((x, idx) => ({
      ...x,
      rowId: (idx + 1).toString(),
    }))
  }, [rows])

  const matchedColumns = []
  const targetSchema = id === 'saved-lars' ? LAR_SCHEMA : TS_SCHEMA
  const filteredRows = searchFilter.length
    ? injectedRows.filter(iRow => {
        return targetSchema.some(col => {
          const matches = iRow[col.fieldName]
            ?.toLowerCase()
            .includes(searchFilter.toLowerCase())

          if (matches) matchedColumns.push(col.fieldName)

          return matches
        })
      })
    : injectedRows

  const columns = rows.length
    ? getSchema(rows[0][RECORD_IDENTIFIER])
        .filter(x =>
          !matchedColumns.length ? true : matchedColumns.includes(x.fieldName)
        )
        .filter(x => applyFilter(x, columnFilter.toLowerCase()))
        .map(f => ({
          key: f.fieldName,
          header: f.fieldName,
          width: Math.max(f.fieldName.length * 10, 200),
          header: props => {
            const columnSelected =
              currCol?.fieldName === f.fieldName ? ' selected' : ''
            const fieldId =
              'header-' + f.fieldName.toLowerCase().replaceAll(' ', '-')
            return (
              <div
                className='header-cell'
                className={'clickable header-cell custom' + columnSelected}
                {...props}
                onClick={() => {
                  setCurrCol(f)
                  document.getElementById(fieldId).scrollIntoView()
                }}
                id={fieldId}
              >
                <div className={'custom-cell-content header-cell-text'}>
                  {f.fieldName}
                </div>
              </div>
            )
          },
          content: ({ row }) => {
            const plainValue = row[f.fieldName] || '-'
            const colSelected =
              currCol?.fieldName == f.fieldName ? ' col-selected' : ''
            if (id.match(/^ts/))
              return (
                <div className={'custom-cell-content ' + colSelected}>
                  {plainValue}
                </div>
              )
            if (
              !!searchFilter.length &&
              row[f.fieldName]
                ?.toLowerCase()
                .includes(searchFilter.toLowerCase())
            ) {
              return (
                <span
                  className={
                    'custom-cell-content highlight-match' + colSelected
                  }
                >
                  {row[f.fieldName]}
                </span>
              )
            }
            return (
              <span className={'custom-cell-content ' + colSelected}>
                {plainValue}
              </span>
            )
          },
        }))
    : null

  if (!columns) body = <div className='no-records'>No Records Saved</div>
  else {
    columns.unshift({ key: 'rowId', header: 'Row #', width: 75 })
    if (!filteredRows.length)
      body = (
        <div className='no-matches'>
          {' '}
          No records match your search/filter criteria
        </div>
      )
    else
      body = (
        <Table
          data={filteredRows}
          columns={columns}
          tableHeight={tableHeight(filteredRows) * 32}
          minColumnWidth={200}
          onRowClick={(e, { index }) => setSelected(filteredRows[index])}
          rowStyle={i => highlightSelected(filteredRows[i])}
        />
      )
  }

  const rowCountLabel =
    filteredRows.length !== rows.length
      ? `(${filteredRows.length}/${rows.length})`
      : `(${rows.length})`

  return (
    <div className='section' id={id}>
      {title && (
        <h3 className='clickable' onClick={goToFileActions}>
          <div className='count'>
            {title} {rowCountLabel}
          </div>
          {!rows.length ? null : (
            <div className='filters'>
              <span className='search-box'>
                <input
                  type='text'
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder={'Search ' + (id.match(/ts/) ? 'TS' : 'LAR')}
                  value={searchFilter}
                  hidden={!rows.length}
                />
                {!!searchFilter.length && (
                  <button className='clear' onClick={() => setSearchFilter('')}>
                    Clear Search
                  </button>
                )}
              </span>
              <span className='search-box'>
                <input
                  type='text'
                  onChange={e => setColumnFilter(e.target.value)}
                  placeholder='Filter columns'
                  value={columnFilter}
                  hidden={!rows.length}
                />
                {!!columnFilter.length && (
                  <button className='clear' onClick={() => setColumnFilter('')}>
                    Clear Filter
                  </button>
                )}
              </span>
            </div>
          )}
        </h3>
      )}
      {body || null}
    </div>
  )
}

const TSheet = ({ rows, ...props }) => (
  <Section {...props} title='Transmittal Sheet' rows={rows} id='saved-ts' />
)

const LARs = ({ rows, ...props }) => (
  <Section
    {...props}
    title={`Loan Application Register`}
    rows={rows}
    id='saved-lars'
  />
)

export const SavedRows = ({
  selected,
  ts,
  lars,
  setSelected,
  deleteRow,
  setCurrCol,
  currCol,
}) => {
  const highlightSelected = r => {
    if (!selected || !r) return {}
    const highlighted =
      selected.id === r.id &&
      selected[RECORD_IDENTIFIER] === r[RECORD_IDENTIFIER]
    return highlighted ? { background: 'lightblue' } : {}
  }

  return (
    <div className='saved-rows'>
      <h2 className='saved clickable' onClick={goToFileActions}>
        Saved Records
      </h2>
      <TSheet
        rows={ts}
        highlightSelected={highlightSelected}
        setSelected={setSelected}
        deleteRow={deleteRow}
        selected={selected}
        setCurrCol={setCurrCol}
        currCol={currCol}
      />
      <LARs
        rows={lars}
        highlightSelected={highlightSelected}
        setSelected={setSelected}
        deleteRow={deleteRow}
        selected={selected}
        setCurrCol={setCurrCol}
        currCol={currCol}
      />
    </div>
  )
}
