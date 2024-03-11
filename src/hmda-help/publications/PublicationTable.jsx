import React from 'react'
import PublicationRows from './PublicationRows'
import './PublicationTable.css'

const PublicationTable = ({ institutions }) => {
  if (!institutions || (institutions && !institutions.length)) return null

  institutions.sort((a, b) => (b.activityYear > a.activityYear ? 1 : -1))
  const colWidth = 90 / 4

  return (
    <section id='publications' className='SearchResults'>
      <h2>Institution Publications</h2>
      <table className='institutions'>
        <thead>
          <tr>
            <th width='10%'>Year</th>
            <th width={colWidth}>Name</th>
            <th width={colWidth}>Publication</th>
            <th width={colWidth}>File</th>
            <th width={colWidth}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {institutions.map((institution) => (
            <PublicationRows
              key={`${institution.lei}-${institution.activityYear}`}
              institution={institution}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default PublicationTable
