import React, { useMemo, useState } from 'react'
import { getSchema, log, LAR_SCHEMA, goToFileActions } from './utils'
import { Table } from 'react-fluid-table'

const tableHeight = rows => {
  if (rows.length === 1) return 3
  return Math.min(rows.length * 2, 10)
}

const Section = ({ id, title, rows, highlightSelected, setSelected }) => {
  let body
  const [searchFilter, setSearchFilter] = useState('')

  // This memoization seems to fix the major performance bottleneck
  const injectedRows = useMemo(() => {
    log(`Calculating row IDs: ${title}`)
    return rows.map((x, idx) => ({
      ...x,
      rowId: (idx + 1).toString(),
    }))
  }, [rows])
  
  const filteredRows =
    searchFilter.length && id === 'saved-lars'
      ? injectedRows.filter(ir =>
          LAR_SCHEMA.some(col => ir[col.fieldName]?.includes(searchFilter))
        )
      : injectedRows

  const columns = rows.length
    ? getSchema(rows[0]['Record Identifier']).map(f => ({
        key: f.fieldName,
        header: f.fieldName,
        width: Math.max(f.fieldName.length * 10, 200),
        content: ({ row }) => {
          const plainValue = row[f.fieldName] || null
          if (id.match(/^ts/)) return plainValue
          if (!!searchFilter.length && row[f.fieldName]?.includes(searchFilter))
            return <span className='highlight-match'>{row[f.fieldName]}</span>

          return plainValue
        },
      }))
    : null

  if (!columns) body = <div className='no-records'>No Records Saved</div>
  else {
    columns.unshift({ key: 'rowId', header: 'Row #', width: 100 })

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

  const rowCount =
    filteredRows.length !== rows.length
      ? `(${filteredRows.length}/${rows.length})`
      : `(${rows.length})`

  return (
    <div className='section' id={id}>
      {title && (
        <h3 className='clickable' onClick={goToFileActions}>
          {title} {rowCount}
          <span className='search-box'>
            <input
              type='text'
              onChange={e => setSearchFilter(e.target.value.trim())}
              placeholder='Search LAR'
              value={searchFilter}
              hidden={id.match(/ts/) || !rows.length}
            />
            {!!searchFilter.length && (
              <button onClick={() => setSearchFilter('')}>Clear Search</button>
            )}
          </span>
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

export const SavedRows = ({ selected, ts, lars, setSelected, deleteRow }) => {
  const highlightSelected = r => {
    if (!selected || !r) return {}
    const highlighted =
      selected.id === r.id &&
      selected['Record Identifier'] === r['Record Identifier']
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
      />
      <LARs
        rows={lars}
        highlightSelected={highlightSelected}
        setSelected={setSelected}
        deleteRow={deleteRow}
        selected={selected}
      />
    </div>
  )
}
