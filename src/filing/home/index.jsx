import React from 'react'
import { withAppContext } from '../../common/appContextHOC.jsx'
import useToolAnnouncement from '../../common/useToolAnnouncement.jsx'
import LoginHeader from '../common/LoginHeader.jsx'

const Home = ({ maintenanceMode, config }) => {
  const cname = 'FilingHome' + (maintenanceMode ? ' maintenance' : '')
  const sessionExpired = window.location.href.indexOf('session=expired') > -1
  const toolAnnouncement = useToolAnnouncement({
    toolName: 'filing',
    config: config,
  })

  return (
    <main className={cname} id='main-content'>
      <LoginHeader
        maintenanceMode={maintenanceMode}
        config={config}
        sessionExpired={sessionExpired}
        toolAnnouncement={toolAnnouncement}
      />
    </main>
  )
}

export default withAppContext(Home)
