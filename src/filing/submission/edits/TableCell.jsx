import React from 'react'
import PropTypes from 'prop-types'

let aus = 'Automated Underwriting System'

const EditsTableCell = (props) => {
  let cellContent = props.cell
  let cellLabel = props.cellName
  let blankAUS = false

  if (cellLabel) blankAUS = isBlankAUS(cellContent, cellLabel)

  if (props.cell === '' || blankAUS) cellContent = <em>(blank)</em>
  return <td>{cellContent}</td>
}

function isBlankAUS(cellContent, cellLabel) {
  if (cellLabel.indexOf(aus) !== -1 && cellContent === '0') return true
}

EditsTableCell.propTypes = {
  cellName: PropTypes.string,
  cell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.element,
  ]),
}

export default EditsTableCell
