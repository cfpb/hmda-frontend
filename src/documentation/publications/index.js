import React from 'react'
import ModifiedLar from './ModifiedLar.jsx'
import ADReports from './ADReports.jsx'
import SnapshotDynamic from './SnapshotDynamic.jsx'

const Publications = props => {
  const { year } = props
  return (
    <ul className="ProductCollection">
      <ModifiedLar year={year} inList={true}/>
      <ADReports year={year} inList={true}/>
      <SnapshotDynamic year={year} inList={true}/>
    </ul>
  )
}

export default Publications
