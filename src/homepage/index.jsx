import React from 'react'
import './ColumnLayout.css'
import './Home.css'
import { Hero } from './Hero'
import { QuickLinks } from './QuickLinks'
import { AnnouncementBanner } from './AnnouncementBanner'
import { FilerInfo } from './ForFilers/FilerInfo'
import { DataInfo } from './ForDataUsers/DataInfo'
import { isBeta } from '../common/Beta.jsx'
import { isProd } from '../common/configUtils'
import { withAppContext } from '../common/appContextHOC'

const Home = ({ config }) => {
  const isProdBeta = isProd() && isBeta()
  return (
    <>
      <Hero hideContent={isProdBeta} />
      <QuickLinks hideContent={isProdBeta} />
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
        <div id='tableOfContents' className='grid-container'>
          <div className='grid-row grid-gap'>
            <div id='filerInfo' className='tablet:grid-col'>
              <FilerInfo hideContent={isProdBeta} />
            </div>
            <div id='dataInfo' className='tablet:grid-col'>
              <DataInfo config={config} hideContent={isProdBeta} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default withAppContext(Home)
