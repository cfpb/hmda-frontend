import React from 'react'
import PrinterIcon from '../images/printer.svg?react'
import './PrintPageButton.css'

function clickHandler(e) {
  e.preventDefault()
  window.print()
  document.activeElement.blur()
}

const PrintPageButton = () => {
  return (
    <div className='print-page-container'>
      <button className='print-page' onClick={clickHandler}>
        <PrinterIcon className='icon' alt='printer' />
        Print
      </button>
    </div>
  )
}

export default PrintPageButton
