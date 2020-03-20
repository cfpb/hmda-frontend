import React from 'react'
import PropTypes from 'prop-types'

import EditsTableCell from './TableCell.jsx'

const EditsTableRow = props => {
  if (!props.row) return null

  const cells = []
  let cellCount = 0

  if(props.edit.edit !== 'S303') 
    cells.push(<EditsTableCell key={++cellCount} cell={props.row.id} />)

  props.row.fields.forEach(field => {
    cells.push(<EditsTableCell key={++cellCount} cell={field.value} cellName={field.name} />)
  })

  return <tr>{cells}</tr>
}

EditsTableRow.propTypes = {
  row: PropTypes.object,
  fields: PropTypes.object
}

export default EditsTableRow
