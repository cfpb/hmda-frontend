import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Geography from './geo/Geography.jsx'
import MapsGraphs from './charts/MapsGraphs.jsx'
import NotFound from '../common/NotFound'
import { withAppContext } from '../common/appContextHOC'

const DataBrowser = props => {
  return (
    <div className="DataBrowser App">
      <Switch>
        <Route exact path="/data-browser" component={Home} />
        <Route path="/data-browser/data/:year?" component={Geography} />
        {
          props.config.showMaps
          ? <Route path="/data-browser/maps-graphs/:year?" component={MapsGraphs} />
          : null
        }
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default withAppContext(DataBrowser)
