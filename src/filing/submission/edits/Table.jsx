import PropTypes from 'prop-types'
import Loading from '../../../common/LoadingIcon.jsx'
import { splitEditPart, splitYearQuarter } from '../../api/utils.js'
import Pagination from '../../pagination/container.jsx'
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

export const renderHeader = (edit, rows) => {
  let cellCount = 0
  const cells = []

  const keyCells = rows[0]
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

export const renderBody = (edits, rows) => {
  return rows.map((row, i) => {
    return <EditsTableRow row={row} key={i} edit={edits} />
  })
}

export const renderTableCaption = (props) => {
  const name = props.edit.edit
  if (!name) return null
  const [year] = splitYearQuarter(props.filingPeriod)
  const [edit] = splitEditPart(name)

  const linkedName = (
    <a
      href={`/documentation/fig/${year}/overview#edit-${edit}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      {name}
    </a>
  )
  let captionHeader

  if (shouldSuppressTable(props)) {
    captionHeader = <span>Edit {linkedName} found</span>
  } else {
    captionHeader = <span>{linkedName}</span>
  }

  if (name === 'Q666') {
    captionHeader = 'Review your loan/application IDs'
  }

  const description = props.edit.description.replace(/"/g, '')

  if (shouldSuppressTable(props)) {
    return (
      <div className='caption'>
        <p>
          {captionHeader}
          {description ? <span>: {description}</span> : null}
        </p>
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
      <p>
        {captionHeader}
        {description ? <span>: {description}</span> : null}
      </p>
    </caption>
  )
}

export const makeTable = (props) => {
  const { edit } = props
  const { rowObj } = props
  const isLoading =
    !props.suppressEdits && (!rowObj || !rowObj.rows) ? <Loading /> : null

  const caption = renderTableCaption(props)
  if (shouldSuppressTable(props))
    return (
      <>
        {caption}
        {isLoading}
      </>
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
      <thead>{renderHeader(edit, rowObj.rows)}</thead>
      <tbody>{renderBody(edit, rowObj.rows)}</tbody>
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

function getAccordionHeading(props) {
  const name = props.edit.edit
  if (!name) return null

  if (name === 'Q666') return 'Review your loan/application IDs'

  if (shouldSuppressTable(props)) return `Edit ${name} found`

  const length = props.pagination.total
  const editText = length === 1 ? 'edit' : 'edits'
  return `${name} ${editText} (${length} found)`
}

function EditsTable(props) {
  const { edit, rowObj, isExpanded, onToggle } = props
  if (!edit) return null
  const name = edit.edit

  const onToggleAccordion = (e) => {
    e.stopPropagation()
    if (onToggle) onToggle(name)
  }

  return (
    <>
      <h4 className='usa-accordion__heading'>
        <button
          type='button'
          className='usa-accordion__button'
          aria-expanded={!!isExpanded}
          aria-controls={name}
          onClick={onToggleAccordion}
        >
          {getAccordionHeading(props)}
        </button>
      </h4>
      <div id={name} className='usa-accordion__content' hidden={!isExpanded}>
        <section className='EditsTable'>
          {makeTable(props)}
          {shouldSuppressTable(props) ? null : (
            <Pagination isFetching={rowObj.isFetching} target={name} />
          )}
        </section>
      </div>
    </>
  )
}

EditsTable.propTypes = {
  edit: PropTypes.object,
  suppressEdits: PropTypes.bool,
  rowObj: PropTypes.object,
  type: PropTypes.string,
  pagination: PropTypes.object,
  paginationFade: PropTypes.number,
  filingPeriod: PropTypes.string,
  isExpanded: PropTypes.bool,
  onToggle: PropTypes.func,
}

export default EditsTable
