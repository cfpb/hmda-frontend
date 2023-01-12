import React from 'react'
import { Switch, Redirect, Route, Link } from 'react-router-dom'

import Heading from '../common/Heading.jsx'
import NotFound from '../common/NotFound'
import DynamicRenderer from './DynamicRenderer'
import { isBadVersion } from './markdownUtils'
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
import ScrollToTop from '../common/ScrollToTop.jsx'
import Home from './Home.jsx'
import VersionSelector from '../common/VersionSelector.jsx'
import { VERSIONS } from '../common/constants/DocumentationVersions.js'

const createCollectionPage = (Component, heading, version, url) => {
  const backLink = `/documentation/${version}`
  return (
    <div className='App Documentation'>
      <Link className='BackLink' to={backLink}>
        {'\u2b05'} DOCUMENTATION HOME
      </Link>
      <Heading type={1} headingText={heading}></Heading>
      <VersionSelector version={version} url={url} versions={VERSIONS} />
      <Component version={version} />
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
  'file-format-verification': FFVT,
}

const Documentation = ({ config }) => {
  return (
    <ScrollToTop>
      <Switch>

        <Redirect exact from='/documentation' to={`/documentation/v2/`} />

        <Route
          exact
          path='/documentation/:version/'
          render={props => {
            const {
              url,
              params: { version },
            } = props.match

            if (isBadVersion(version)) return <NotFound />

            return (
              <div className='App Documentation'>
                <Home url={url} version={version} />
              </div>
            )
          }}
        />

        <Route
          exact
          path='/documentation/:version/:collection'
          render={props => {
            const {
              url,
              params: { version, collection },
            } = props.match

            if (isBadVersion(version)) return <NotFound />

            if (collection === 'faqs')
              return createCollectionPage(
                FAQs,
                'Frequently Asked Questions',
                version,
                url
              )
            if (collection === 'fig')
              return createCollectionPage(FigLinks, 'HMDA Filing', version, url)
            if (collection === 'publications')
              return createCollectionPage(
                Publications,
                'HMDA Publications',
                version,
                url
              )
            if (collection === 'tools')
              return createCollectionPage(Tools, 'HMDA Tools', version, url)

            return (
              <div className='App Documentation'>
                <DynamicRenderer
                  version={version}
                  slug={collection}
                  props={props}
                  displayTOCBackLink={true}
                />
              </div>
            )
          }}
        />

        <Route
          exact
          path='/documentation/:version/:collection/:slug/'
          render={props => {
            const {
              url,
              params: { version, collection, slug },
            } = props.match
            const Component = pageSlugs[slug]

            if (
              isBadVersion(version) ||
              (collection !== 'publications' && collection !== 'tools') ||
              !Component
            ) {
              return <NotFound />
            }

            return (
              <div className='App Documentation'>
                <Link
                  className='BackLink'
                  to={`/documentation/${version}/${collection}/`}
                >
                  {'\u2b05'} HMDA {collection}
                </Link>
                <Component
                  version={version}
                  inList={false}
                  url={url}
                  collection={collection}
                  slug={slug}
                />
              </div>
            )
          }}
        />

        <Route component={NotFound} />
      </Switch>
    </ScrollToTop>
  )
}

export default withAppContext(Documentation)
