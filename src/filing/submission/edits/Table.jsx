import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '../../pagination/container.jsx'
import Loading from '../../../common/LoadingIcon.jsx'
import EditsTableRow from './TableRow.jsx'

import './Table.css'

export const supressULI = (edit) =>
  ['S303', 'V609', 'V608-1', 'V608-2'].indexOf(edit) > -1

export const formatHeader = (text, isTransmittal) => {
  if (text === 'value' || text === 'fields') return null
  if (text === 'id' && isTransmittal) return 'Legal Entity Identifier (LEI)'
  if (text === 'id') return 'Universal Loan Identifier (ULI)'
  if (text === 'edit') return 'Edit ID'
  if (text === 'editId') return 'Edit ID'
  if (text === 'description') return 'Description'
  return text
}

export const renderHeader = (edit, rows, type) => {
  let cellCount = 0
  const cells = []

  let keyCells = rows[0]
  const fieldCells = rows[0].length
  const numOfCells = fieldCells + 1
  const cellWidth = `${100 / numOfCells}%`

  Object.keys(keyCells).forEach((field, index) => {
    if (supressULI(edit.edit) && index === 0) return

    const text = formatHeader(field, edit.transmittalSheet)
    if (text) {
      cells.push(
        <th key={++cellCount} width={cellWidth}>
          {text}
        </th>,
      )
    }
  })

  rows[0].fields.forEach((field) => {
    cells.push(
      <th key={++cellCount} width={cellWidth}>
        {formatHeader(field.name)}
      </th>,
    )
  })

  return <tr>{cells}</tr>
}

export const renderBody = (edits, rows, type) => {
  return rows.map((row, i) => {
    return <EditsTableRow row={row} key={i} edit={edits} />
  })
}

export const renderTableCaption = (props) => {
  const name = props.edit.edit
  if (!name) return null
  let renderedName = name
  let captionHeader

  if (shouldSuppressTable(props)) {
    captionHeader = `Edit ${renderedName} found`
  } else {
    const length = props.pagination.total
    let editText = length === 1 ? 'edit' : 'edits'
    if (name === 'Q666') {
      editText = ''
    }
    captionHeader = `${renderedName} ${editText} (${length} found)`
  }

  if (name === 'Q666') {
    captionHeader = 'Review your loan/application IDs'
  }

  const description = props.edit.description.replace(/"/g, '')

  if (shouldSuppressTable(props)) {
    return (
      <div className='caption'>
        <h3>{captionHeader}</h3>
        {description ? <p>{description}</p> : null}
        {name === 'S040' ? (
          <p>
            Please check your file or system of record for duplicate
            application/loan numbers.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <caption>
      <h3>{captionHeader}</h3>
      {description ? <p>{description}</p> : null}
    </caption>
  )
}

export const makeTable = (props) => {
  const edit = props.edit
  const type = props.type
  const rowObj = props.rowObj
  const isLoading =
    !props.suppressEdits && (!rowObj || !rowObj.rows) ? <Loading /> : null

  const caption = renderTableCaption(props)
  if (shouldSuppressTable(props))
    return (
      <React.Fragment>
        {caption}
        {isLoading}
      </React.Fragment>
    )

  let className = 'PaginationTarget'
  className += props.paginationFade ? ' fadeOut' : ''

  return (
    <table
      width='100%'
      className={className}
      summary={`Report for edit ${edit.edit} - ${edit.description}`}
    >
      {caption}
      <thead>{renderHeader(edit, rowObj.rows, type)}</thead>
      <tbody>{renderBody(edit, rowObj.rows, type)}</tbody>
    </table>
  )
}

export const shouldSuppressTable = (props) => {
  return (
    props.type === 'macro' ||
    props.suppressEdits ||
    props.edit.edit === 'S040' ||
    !props.rowObj ||
    !props.rowObj.rows
  )
}

const EditsTable = (props) => {
  if (!props.edit) return null
  const name = props.edit.edit
  const rowObj = props.rowObj

  return (
    <section className='EditsTable' id={name}>
      {makeTable(props)}
      {shouldSuppressTable(props) ? null : (
        <Pagination isFetching={rowObj.isFetching} target={name} />
      )}
    </section>
  )
}

EditsTable.propTypes = {
  edit: PropTypes.object,
  suppressEdits: PropTypes.bool,
  rowObj: PropTypes.object,
  type: PropTypes.string,
  pagination: PropTypes.object,
  paginationFade: PropTypes.number,
}

export default EditsTable
