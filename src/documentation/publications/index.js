import React from 'react'
import ModifiedLar from './ModifiedLar.jsx'
import ADReports from './ADReports.jsx'
import SnapshotDynamic from './SnapshotDynamic.jsx'

const Publications = props => {
  const { version } = props
  return (
    <ul className="ProductCollection">
      <ModifiedLar version={version} inList={true}/>
      <ADReports version={version} inList={true}/>
      <SnapshotDynamic version={version} inList={true}/>
    </ul>
  )
}

export default Publications
