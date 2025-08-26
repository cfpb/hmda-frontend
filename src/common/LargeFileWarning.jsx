import React from 'react'
import { Link } from 'react-router-dom'

function LargeFileWarning({ category }) {
  const isNationwide = category.includes('nationwide')

  const standardWarning = (
    <>
      <h4>Warning:</h4> This dataset may be too large to be opened in standard
      spreadsheet applications.
    </>
  )

  const nationWideWarning = (
    <>
      {standardWarning} To download the entire Nationwide dataset, please see
      the available static datasets on the{' '}
      <Link to='/data-publication/'>Data Publication</Link> page.
    </>
  )

  return (
    <div className='LargeFileWarning' style={{ paddingBottom: '20px' }}>
      {isNationwide ? nationWideWarning : standardWarning}
    </div>
  )
}

export default LargeFileWarning
