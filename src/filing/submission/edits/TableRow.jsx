import React from 'react'
import PropTypes from 'prop-types'

import EditsTableCell from './TableCell.jsx'
import { supressULI } from './Table.jsx'

/* Clearly differentiate erroneous "Provided" values */
export function highlightMismatch(value) {
  if (!value || value.indexOf('Provided') < 0) return value

  let [provided, expected] = value.split(',').map((v) => {
    const [label, val] = v.split(':')
    return { label, value: val }
  })

  if (provided.value !== expected.value)
    return (
      <>
        <span className='mismatch'>
          {provided.label}: {provided.value}
        </span>
        , {expected.label}: {expected.value}
      </>
    )

  return value
}

const EditsTableRow = (props) => {
  if (!props.row) return null

  const cells = []
  let cellCount = 0
  const isS303 = props.edit.edit === 'S303'

  if (!supressULI(props.edit.edit))
    cells.push(<EditsTableCell key={++cellCount} cell={props.row.id} />)

  props.row.fields.forEach((field) => {
    let cellValue = isS303
      ? highlightMismatch(field && field.value)
      : field.value

    cells.push(
      <EditsTableCell
        key={++cellCount}
        cell={cellValue}
        cellName={field.name}
      />,
    )
  })

  return <tr>{cells}</tr>
}

EditsTableRow.propTypes = {
  row: PropTypes.object,
  fields: PropTypes.object,
}

export default EditsTableRow
