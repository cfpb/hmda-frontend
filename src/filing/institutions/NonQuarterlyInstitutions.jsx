import React from 'react'

export const NonQuarterlyInstitutions = ({ list }) => {
  if (!list.length) return null

  return (
    <section className='institution'>
      <div className='non-quarterlies'>
        <h3>These Institutions are not quarterly filers:</h3>
        <section className='status'>
          <ul>
            {list.map(i => <li key={i}>{i.name} - {i.lei}</li>)}
          </ul>
        </section>
      </div>
    </section>
  )
}

NonQuarterlyInstitutions.defaultProps = {
  list: []
}
