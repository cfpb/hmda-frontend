import React from 'react'
import { useDispatch } from 'react-redux'
import { selectCol } from '../../data-store/store'
import { matchColumnFilter } from '../../utils/search'

/**
 * Constructs the column configurations used to display the SavedRows tables (both headers and content).
 * This configuration gets passed to react-fluid-table for rendering.
 *
 * @param {Array} rows
 * @param {Array} matchedColumns
 * @param {String} columnFilter
 * @param {String} searchFiler
 * @param {Object} schema
 * @param {String} selectedColName
 * @returns Array of Column data
 */
export const buildColumns = ({
  rows,
  matchedColumns,
  columnFilter,
  searchFilter,
  schema,
  selectedColName,
}) => {
  if (!rows.length) return null

  const relevantColumns = filterFields({
    matchedColumns,
    schema,
    columnFilter,
  })

  return relevantColumns.map((f) => ({
    key: f.fieldName,
    width: 'auto',
    header: (props) => (
      <ColumnHeader field={f} selectedColName={selectedColName} {...props} />
    ),
    content: ({ row, ...props }) => (
      <ColumnContent
        row={row}
        field={f}
        searchFilter={searchFilter}
        selectedColName={selectedColName}
        {...props}
      />
    ),
  }))
}

/**
 * Column header.  When clicked, highlights the current column in both the SavedRows view
 * and the Editing view.
 *
 * @param {Object} field Field details
 * @param {String} selectedColName Currently selected column name
 * @param {Object} props Additional attributes
 */
const ColumnHeader = ({ field, selectedColName, ...props }) => {
  const dispatch = useDispatch()
  const fieldID = formatFieldID(field)
  const usableProps = getUsableProps(props)
  const wrapperClasses = ['clickable', 'header-cell', 'custom']
  const fieldName = field.fieldName

  if (isColumnSelected(selectedColName, field)) wrapperClasses.push('selected')

  const clickHandler = () => {
    dispatch(selectCol(fieldName))
    document
      .getElementById(fieldID)
      .scrollIntoView({ inline: 'center', block: 'start' })
  }

  return (
    <div
      id={fieldID}
      className={wrapperClasses.join(' ')}
      {...usableProps}
      style={{ width: formatColWidth(field) }}
      onClick={clickHandler}
    >
      <div className={'custom-cell-content header-cell-text'}>{fieldName}</div>
    </div>
  )
}

/**
 * Column header.  When clicked, highlights the current column in both the SavedRows view
 * and the Editing view.
 *
 * @param {Object} row LAR/TS row content
 * @param {Object} field Field details
 * @param {String} selectedColName Currently selected column name
 * @param {String} searchFilter Content search string
 */
const ColumnContent = ({ row, field, searchFilter, selectedColName }) => {
  const dispatch = useDispatch()
  const fieldName = field.fieldName
  let fieldValue = row[fieldName] || '-'

  const styles = { width: formatColWidth(field, -16) }
  const wrapperClasses = ['custom-cell-content']
  const clickHandler = () => dispatch(selectCol(fieldName))

  if (isColumnSelected(selectedColName, field))
    wrapperClasses.push('col-selected')

  const isMatchForSearch =
    searchFilter.length &&
    row[fieldName]
      ?.toString()
      .toLowerCase()
      .includes(searchFilter.toLowerCase())

  if (isMatchForSearch) {
    wrapperClasses.push('highlight-match')
    fieldValue = row[fieldName]
  }

  return (
    <div
      className={wrapperClasses.join(' ')}
      onClick={clickHandler}
      style={styles}
      id={`row-${row.rowId}`}
    >
      {fieldValue}
    </div>
  )
}

/* ----------- Utils ----------- */

/**
 * Part of the SavedRows search functionality.  This function filters
 * the list of all available fields for a given schema to only include
 * those who's fieldName match the columnFilter.
 *
 * @param {Array} matchedColumns List of Field names who's content matched the searchFilter
 * @param {String} columnFilter Value to filter by
 * @param {Object} schema JSON of LAR or TS fields
 *
 */
const filterFields = ({ matchedColumns, schema, columnFilter }) =>
  schema
    .filter((x) => {
      if (!matchedColumns.length) return true
      if (matchedColumns.includes(x.fieldName)) return true
    })
    .filter((x) => matchColumnFilter(x, columnFilter))

// Derive column width based on length of field name
const formatColWidth = (f, adjustment = 0) => {
  let width = Math.max(f.fieldName.length * 10, 200)
  width += adjustment

  return `${width}px`
}

// Build element ID from field name
const formatFieldID = (f) => {
  const REGEX_UNWANTED = /[:\s',()]/g
  let adjusted = f.fieldName.toLowerCase().replaceAll(REGEX_UNWANTED, '-')
  return 'header-' + adjusted
}

// Collect props that can be passed down to our custom component
export const getUsableProps = (props) => {
  const usableProps = {}
  Object.keys(props)
    .filter((p_key) => !['sortDirection'].includes(p_key))
    .forEach((p_key) => (usableProps[p_key] = props[p_key]))

  return usableProps
}

// Should highlight the current column?
const isColumnSelected = (curr, field) => curr === field.fieldName
