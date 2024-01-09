import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import ModifiedLar from './reports/ModifiedLar'
import Disclosure from './reports/Disclosure'
import Aggregate from './reports/Aggregate'
import NationalAggregate from './reports/NationalAggregate'
import {
  Snapshot,
  OneYearDataset,
  ThreeYearDataset,
} from './reports/snapshot/index'
import DynamicDataset from './reports/DynamicDataset'
import NotFound from '../common/NotFound'
import { withAppContext } from '../common/appContextHOC.jsx'

import './index.css'

const DataPublication = ({ config }) => {
  const { shared } = config.dataPublicationYears

  return (
    <div className='App DataPublication'>
      <Switch>
        <Redirect
          exact
          from='/data-publication'
          to={`/data-publication/${shared[0]}`}
        />
        <Route
          path='/data-publication/modified-lar/:year?'
          render={(props) => <ModifiedLar {...props} targetYearKey='mlar' />}
        />
        <Route
          path='/data-publication/disclosure-reports/:year?/:institutionId?/:msaMdId?/:reportId?'
          render={(props) => (
            <Disclosure {...props} targetYearKey='disclosure' />
          )}
        />
        <Route
          path='/data-publication/aggregate-reports/:year?/:stateId?/:msaMdId?/:reportId?'
          render={(props) => <Aggregate {...props} targetYearKey='aggregate' />}
        />
        <Route
          path='/data-publication/national-aggregate-reports/:year?/:reportId?'
          render={(props) => (
            <NationalAggregate {...props} targetYearKey='NationalAggregate' />
          )}
        />
        <Route
          path='/data-publication/snapshot-national-loan-level-dataset/:year?'
          render={(props) => <Snapshot {...props} targetYearKey='snapshot' />}
        />
        <Route
          path='/data-publication/three-year-national-loan-level-dataset/:year?'
          render={(props) => (
            <ThreeYearDataset {...props} targetYearKey='threeYear' />
          )}
        />
        <Route
          path='/data-publication/one-year-national-loan-level-dataset/:year?'
          render={(props) => (
            <OneYearDataset {...props} targetYearKey='oneYear' />
          )}
        />
        <Route
          path='/data-publication/dynamic-national-loan-level-dataset/:year?'
          render={(props) => (
            <DynamicDataset {...props} targetYearKey='dynamic' />
          )}
        />
        <Route path='/data-publication/:year' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default withAppContext(DataPublication)
