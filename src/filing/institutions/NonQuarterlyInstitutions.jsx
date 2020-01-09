import React from 'react'

export const NonQuarterlyInstitutions = ({ list }) => {
  if (!list.length) return null

  return (
    <section className='institution'>
      <div className='current-status'>
        <h3>The following institutions are not quarterly filers:</h3>
        <section className='status'>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
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
