import { useSelector } from 'react-redux'
import InstitutionsContainer from '../institutions/container.jsx'
import Home from './index.jsx'

function HomeContainer({ config }) {
  const isLoggedIn = useSelector((state) => state.app.user?.userInfo?.authenticated)
  const { filingPeriods, maintenanceMode, announcement } = config

  if (!isLoggedIn || maintenanceMode) {
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
