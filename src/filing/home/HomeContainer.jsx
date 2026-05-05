import { getKeycloak } from '../../common/api/Keycloak.js'
import InstitutionsContainer from '../institutions/container.jsx'
import Home from './index.jsx'

function HomeContainer({ config, ...props }) {
  const isLoggedIn = getKeycloak()?.authenticated
  const { filingPeriods, maintenanceMode, announcement } = config

  if (!isLoggedIn || maintenanceMode) {
    return <Home maintenanceMode={maintenanceMode} />
  }

  return (
    <InstitutionsContainer
      {...props}
      config={config}
      filingPeriods={filingPeriods}
      announcement={announcement}
    />
  )
}

export default HomeContainer
