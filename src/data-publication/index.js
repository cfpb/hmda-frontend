import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { DYNAMIC_DATASET } from './constants/dynamic-dataset'
import { SNAPSHOT_DATASET } from './constants/snapshot-dataset'

import Home from './Home'
import ModifiedLar from './reports/ModifiedLar'
import SupportingDocs from './reports/SupportingDocs.jsx'
import Disclosure from './reports/Disclosure'
import Aggregate from './reports/Aggregate'
import NationalAggregate from './reports/NationalAggregate'
import Snapshot from './reports/snapshot/index'
import DynamicDataset from './reports/DynamicDataset'
import NotFound from '../common/NotFound'

import './index.css'

const DataPublication = () => {
  return (
    <div className="App DataPublication">
      <Switch>
        <Route exact path="/data-publication" component={Home} />
        <Redirect exact from="/data-publication/modified-lar" to="/modified-lar/2018" />
        <Route path="/data-publication/documents" component={SupportingDocs} />
        <Route path="/data-publication/modified-lar/:year" component={ModifiedLar} />
        <Route
          path="/data-publication/disclosure-reports/:year?/:institutionId?/:msaMdId?/:reportId?"
          component={Disclosure}
        />
        <Route
          path="/data-publication/aggregate-reports/:year?/:stateId?/:msaMdId?/:reportId?"
          component={Aggregate}
        />
        <Route
          path="/data-publication/national-aggregate-reports/:year?/:reportId?"
          component={NationalAggregate}
        />
        <Route
          path="/data-publication/snapshot-national-loan-level-dataset/:year?"
          render={ props => {
            const { year } = props.match.params
            if(year && SNAPSHOT_DATASET.displayedYears.indexOf(year) === -1){
              return <NotFound/>
            }
            return <Snapshot {...props}/>
          }}
        />
        <Route
          path="/data-publication/dynamic-national-loan-level-dataset/:year?"
          render={ props => {
            const { year } = props.match.params
            if(year && DYNAMIC_DATASET.displayedYears.indexOf(year) === -1){
              return <NotFound/>
            }
            return <DynamicDataset {...props}/>
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default DataPublication
