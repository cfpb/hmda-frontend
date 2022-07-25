import React from 'react'
import './ColumnLayout.css'
import './Home.css'
import { AnnouncementBanner } from './AnnouncementBanner'
import { Column } from './Column'
import { ColumnLayout } from './ColumnLayout.jsx'
import { DataBrowser } from './ForDataUsers/DataBrowser'
import { DataPublication } from './ForDataUsers/DataPublication'
import { Documentation } from './ForFilers/Documentation'
import { Filing } from './ForFilers/Filing'
import { HelpForFilers } from './ForFilers/HelpForFilers'
import { isBeta } from '../common/Beta.jsx'
import { isProd } from '../common/configUtils'
import { ResearchAndReports } from './ForDataUsers/ResearchAndReports'
import { Tools } from './ForFilers/Tools'
import { withAppContext } from '../common/appContextHOC'
import { FilersFAQs } from './ForFilers/FilersFAQs'
import { FilingGuides } from './ForFilers/FilingGuides'
import { DataUsersFAQs } from './ForDataUsers/DataUsersFAQs'
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
          {/* <Tools isProdBeta={isProdBeta} /> */}
          <FilersFAQs />
          <FilingGuides />
          {/* <HelpForFilers /> */}
          <Documentation />
        </Column>
        <Column title='Info for Data Users'>
          <DataBrowser isProdBeta={isProdBeta} />
          <DataUsersFAQs />
          <DataPublication {...config} />
          <ResearchAndReports />
          <ChangeLog />
        </Column>
      </ColumnLayout>
    </main>
  )
}

export default withAppContext(Home)
