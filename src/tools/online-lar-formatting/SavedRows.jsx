import React, { useMemo } from 'react'
import { getSchema, log } from './utils'
import { Table } from 'react-fluid-table'

const tableHeight = rows => {
  if (rows.length === 1) return 3
  return Math.min(rows.length * 2, 10)
}

const Section = ({ id, title, rows, highlightSelected, setSelected }) => {
  let body

  const columns = rows.length
    ? getSchema(rows[0]['Record Identifier']).map(f => ({
        key: f.fieldName,
        header: f.fieldName,
        width: Math.max(f.fieldName.length * 10, 200),
      }))
    : null

  if (!columns)
    body = <div className='no-records'>No Records Saved</div>
  else {
    columns.unshift({ key: 'rowId', header: 'Row #', width: 100 })

    // This memoization seems to fix the major performance bottle n
    const injectedRows = useMemo(() => {
      log(`Calculating row IDs: ${title}`)
      return rows.map((x, idx) => ({
        ...x,
        rowId: (idx + 1).toString(),
      }))}, [rows]
    )

    body = (
      <Table
        data={injectedRows}
        columns={columns}
        tableHeight={tableHeight(injectedRows) * 32}
        minColumnWidth={200}
        onRowClick={(e, { index }) => setSelected(injectedRows[index])}
        rowStyle={i => highlightSelected(injectedRows[i])}
      />
    )
  }

  return (
    <div className='section' id={id}>
      {title && (
        <h3 className='clickable'
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          {title}
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
    title={`Loan Application Register (${rows?.length || 0})`}
    rows={rows}
    id='saved-lars'
  />
)


export const SavedRows = ({ ts, lars, selected, setSelected, deleteRow }) => {
  
  const highlightSelected = r => {
    if (!selected || !r) return {}
    const highlighted = selected.id === r.id &&
    selected['Record Identifier'] === r['Record Identifier']
    return highlighted ? { background: 'lightblue' } : {}
  }

  return (
    <div className='saved-rows'>
      <TSheet
        rows={ts}
        highlightSelected={highlightSelected}
        setSelected={setSelected}
        deleteRow={deleteRow}
      />
      <LARs
        rows={lars}
        highlightSelected={highlightSelected}
        setSelected={setSelected}
        deleteRow={deleteRow}
      />
    </div>
  )
}
