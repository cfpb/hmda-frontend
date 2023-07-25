import React from "react"
import "./ColumnLayout.css"
import "./Home.css"
import { Hero } from "./Hero"
import { QuickLinks } from "./QuickLinks"
import { AnnouncementBanner } from "./AnnouncementBanner"
import { FilerInfo } from "./ForFilers/FilerInfo"
import { DataInfo } from "./ForDataUsers/DataInfo"
import { ColumnLayout, Column } from "./ColumnLayout.jsx"
import { DataBrowser } from "./ForDataUsers/DataBrowser"
import { DataPublication } from "./ForDataUsers/DataPublication"
import { Filing } from "./ForFilers/Filing"
import { isBeta } from "../common/Beta.jsx"
import { isProd } from "../common/configUtils"
import { ResearchAndReports } from "./ForDataUsers/ResearchAndReports"
import { withAppContext } from "../common/appContextHOC"
import { FilingDocs } from "./ForFilers/FilingDocs"
import { FilingGuides } from "./ForFilers/FilingGuides"
import { DataDocs } from "./ForDataUsers/DataDocs"
import { ChangeLog } from "./ForDataUsers/ChangeLog"

const Home = ({ config }) => {
  const isProdBeta = isProd() && isBeta()

  return (
    <>
    <Hero />
    <QuickLinks />
    <main className="App home" id="main-content">
      <div>
        <header>
          <h1>The Home Mortgage Disclosure Act</h1>
          <p className="lead">
            HMDA requires many financial institutions to maintain, report, and
            publicly disclose information about mortgages.
          </p>
        </header>
        <AnnouncementBanner {...config} />
      </div>
      <div id="tableOfContents" className="grid-container">
        <div className="grid-row grid-gap">
          <div id="filerInfo" className="tablet:grid-col">
            <FilerInfo />
          </div>
          <div id="dataInfo" className="tablet:grid-col">
            <DataInfo config={config} />
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default withAppContext(Home)
