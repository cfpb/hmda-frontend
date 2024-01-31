import React from 'react'
import { useSelector } from 'react-redux'
import Home from './index.jsx'
import InstitutionsContainer from '../institutions/container.jsx'

const HomeContainer = ({ config }) => {
  const user = useSelector((state) => state.app.user.oidc)
  const { filingPeriods, maintenanceMode, announcement } = config

  if (user === null || maintenanceMode) {
    return <Home maintenanceMode={maintenanceMode} />
  }

  return (
    <InstitutionsContainer
      filingPeriods={filingPeriods}
      announcement={announcement}
    />
  )
}

export default HomeContainer
