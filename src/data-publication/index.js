import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import ModifiedLar from './reports/ModifiedLar'
import SupportingDocs from './reports/SupportingDocs.jsx'
import Disclosure from './reports/Disclosure'
import Aggregate from './reports/Aggregate'
import NationalAggregate from './reports/NationalAggregate'
import Snapshot from './reports/snapshot/index'
import ThreeYearDataset from './reports/three_year/index'
import OneYearDataset from './reports/one_year/index'
import DynamicDataset from './reports/DynamicDataset'
import NotFound from '../common/NotFound'
import { withAppContext } from '../common/appContextHOC.jsx'
import PublicationChanges from './ChangeLog/'
import { redirectIfNoYearProvided } from '../common/withRedirectToTargetYear'

import './index.css'

const DataPublication = ({ config }) => {
  const { dynamic, oneYear, snapshot, shared, threeYear } = config.dataPublicationYears
  const snapshotYears = snapshot || shared
  const dynamicYears = dynamic || shared
  const threeYearYears = threeYear || shared
  const oneYearYears = oneYear || shared

  return (
    <div className='App DataPublication'>
      <Switch>
        <Redirect
          exact
          from='/data-publication'
          to={`/data-publication/${shared[0]}`}
        />
        <Route
          exact
          path='/data-publication/updates'
          component={PublicationChanges}
        />
        <Redirect
          exact
          from='/data-publication/modified-lar'
          to='/data-publication/modified-lar/2019'
        />
        <Route path='/data-publication/documents' component={SupportingDocs} />
        <Route
          path='/data-publication/modified-lar/:year'
          component={ModifiedLar}
        />
        <Route
          path='/data-publication/disclosure-reports/:year?/:institutionId?/:msaMdId?/:reportId?'
          render={props => (
            <Disclosure
              {...props}
              redirect={redirectIfNoYearProvided(props, shared[0])}
            />
          )}
        />
        <Route
          path='/data-publication/aggregate-reports/:year?/:stateId?/:msaMdId?/:reportId?'
          render={props => (
            <Aggregate
              {...props}
              redirect={redirectIfNoYearProvided(props, shared[0])}
            />
          )}
        />
        <Route
          path='/data-publication/national-aggregate-reports/:year?/:reportId?'
          render={props => (
            <NationalAggregate
              {...props}
              redirect={redirectIfNoYearProvided(props, 2017)}
            />
          )}
        />
        <Route
          path='/data-publication/snapshot-national-loan-level-dataset/:year?'
          render={props => {
            const { year } = props.match.params
            if (year && snapshotYears.indexOf(year) === -1) {
              return <NotFound />
            }

            return (
              <Snapshot
                {...props}
                redirect={redirectIfNoYearProvided(props, snapshotYears[0])}
              />
            )
          }}
        />
        <Route
          path='/data-publication/three-year-national-loan-level-dataset/:year?'
          render={props => {
            const { year } = props.match.params
            if (year && threeYearYears.indexOf(year) === -1) return <NotFound />

            return (
              <ThreeYearDataset
                {...props}
                redirect={redirectIfNoYearProvided(props, threeYearYears[0])}
              />
            )
          }}
        />
        <Route
          path='/data-publication/one-year-national-loan-level-dataset/:year?'
          render={props => {
            const { year } = props.match.params
            if (year && oneYearYears.indexOf(year) === -1) return <NotFound />

            return (
              <OneYearDataset
                {...props}
                redirect={redirectIfNoYearProvided(props, oneYearYears[0])}
              />
            )
          }}
        />
        <Route
          path='/data-publication/dynamic-national-loan-level-dataset/:year?'
          render={props => {
            const { year } = props.match.params
            if (year && dynamicYears.indexOf(year) === -1) return <NotFound />

            return (
              <DynamicDataset
                {...props}
                redirect={redirectIfNoYearProvided(props, dynamicYears[0])}
              />
            )
          }}
        />
        <Route path='/data-publication/:year' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default withAppContext(DataPublication)
