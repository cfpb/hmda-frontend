import React from 'react'
import { Switch, Redirect, Route, Link } from 'react-router-dom'

import Heading from '../common/Heading.jsx'
import NotFound from '../common/NotFound'
import YearSelector from '../common/YearSelector.jsx'
import Home from './Home'
import DynamicRenderer from './DynamicRenderer'
import { isBadYear } from './markdownUtils'
import FAQs from './FAQs.jsx'
import FigLinks from './FigLinks.jsx'
import Publications from './publications'
import ModifiedLar from './publications/ModifiedLar.jsx'
import ADReports from './publications/ADReports.jsx'
import SnapshotDynamic from './publications/SnapshotDynamic.jsx'
import Tools from './tools'
import DataBrowser from './tools/DataBrowser.jsx'
import RateSpread from './tools/RateSpread.jsx'
import CheckDigit from './tools/CheckDigit.jsx'
import LARFT from './tools/LARFT.jsx'
import FFVT from './tools/FFVT.jsx'
import { withAppContext } from '../common/appContextHOC'

import './index.css'

function makeCollectionPage(Component, heading, year, url) {
  return (
    <div className="App Documentation">
      <Link className="BackLink" to="/documentation/">{'\u2b05'} DOCUMENTATION HOME</Link>
      <Heading type={1} headingText={heading}></Heading>
      <YearSelector year={year} url={url}/>
      <Component year={year}/>
    </div>
  )
}

const pageSlugs = {
  'modified-lar': ModifiedLar,
  'ad-reports': ADReports,
  'snapshot-dynamic': SnapshotDynamic,
  'data-browser': DataBrowser,
  'rate-spread': RateSpread,
  'check-digit': CheckDigit,
  'lar-formatting': LARFT,
  'file-format-verification': FFVT
}

const Documentation = ({ config }) => {
  return (
    <Switch>
      <Redirect exact from="/documentation" to={`/documentation/${config.defaultDocsPeriod}/`} />

      <Route exact path="/documentation/:year/" render={props => {
        const { url, params: { year } } = props.match

        if(isBadYear(year)) return <NotFound/>

        return (
          <div className="App Documentation">
            <Home year={year} url={url}/>
          </div>
        )
      }}/>

      <Route exact path="/documentation/:year/:collection/" render={props => {
        const { url, params: { year, collection } } = props.match

        if(isBadYear(year)) return <NotFound/>

        if(collection === 'faqs')
          return makeCollectionPage(FAQs, 'Frequently Asked Questions', year, url)
        if(collection === 'fig')
          return makeCollectionPage(FigLinks, 'Filing Instructions Guide (FIG)', year, url)
        if(collection === 'publications')
          return makeCollectionPage(Publications, 'HMDA Publications', year, url)
        if(collection === 'tools')
          return makeCollectionPage(Tools, 'HMDA Tools', year, url)

        return (
          <div className="App Documentation">
            <DynamicRenderer year={year} slug={collection}/>
          </div>
        )
      }}/>

      <Route exact path="/documentation/:year/:collection/:slug/" render={props => {
        const { url, params: { year, collection, slug } } = props.match
        const Component = pageSlugs[slug]

        if(isBadYear(year) ||
          (collection !== 'publications' && collection !== 'tools') ||
          !Component
        ){
          return <NotFound/>
        }

        return (
          <div className="App Documentation">
            <Link className="BackLink" to={`/documentation/${year}/${collection}/`}>{'\u2b05'} HMDA {collection}</Link>
            <Component year={year} inList={false} url={url} collection={collection} slug={slug}/>
          </div>
        )
      }}/>

      <Route component={NotFound} />
    </Switch>
  )
}

export default withAppContext(Documentation)
