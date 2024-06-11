import React from 'react'

export const FilteredOutList = ({ list = [], title }) => {
  if (!list.length) return null

  return (
    <section className='institution'>
      <div className='non-quarterlies'>
        <h3>{title}</h3>
        <section className='status'>
          <ul>
            {list.map((i, idx) => (
              <li key={idx}>
                {i.name} - {i.lei}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
