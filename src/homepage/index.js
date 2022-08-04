import React from 'react'
import './ColumnLayout.css'
import './Home.css'
import { AnnouncementBanner } from './AnnouncementBanner'
import { Column } from './Column'
import { ColumnLayout } from './ColumnLayout.jsx'
import { DataBrowser } from './ForDataUsers/DataBrowser'
import { DataPublication } from './ForDataUsers/DataPublication'
import { Filing } from './ForFilers/Filing'
import { isBeta } from '../common/Beta.jsx'
import { isProd } from '../common/configUtils'
import { ResearchAndReports } from './ForDataUsers/ResearchAndReports'
import { withAppContext } from '../common/appContextHOC'
import { FilingDocs } from './ForFilers/FilingDocs'
import { FilingGuides } from './ForFilers/FilingGuides'
import { DataDocs } from './ForDataUsers/DataDocs'
import { ChangeLog } from './ForDataUsers/ChangeLog'

const Home = ({ config }) => {
  const isProdBeta = isProd() && isBeta()

  return (
    <main className='App home' id='main-content'>
      <div>
        <header>
          <h1>The Home Mortgage Disclosure Act</h1>
          <p className='lead'>
            HMDA requires many financial institutions to maintain, report, and
            publicly disclose information about mortgages.
          </p>
        </header>
        <AnnouncementBanner {...config} />
      </div>
      <ColumnLayout>
        <Column title='Info for Filers'>
          <Filing defaultPeriod={config.defaultPeriod} />
          <FilingDocs />
          <FilingGuides />
        </Column>
        <Column title='Info for Data Users' hideContent={isProdBeta}>
          <DataBrowser  />
          <DataDocs />
          <DataPublication {...config}  />
          <ResearchAndReports />
          <ChangeLog />
        </Column>
      </ColumnLayout>
    </main>
  )
}

export default withAppContext(Home)
