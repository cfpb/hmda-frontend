import { useSelector } from 'react-redux'
import InstitutionsContainer from '../institutions/container.jsx'
import Home from './index.jsx'

function HomeContainer({ config, ...props }) {
  const isLoggedIn = Boolean(useSelector((state) => state.app.user?.oidc))
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
