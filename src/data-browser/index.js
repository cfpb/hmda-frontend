import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Geography from './geo/Geography.jsx'
import MapsGraphs from './charts/MapsGraphs.jsx'
import NotFound from '../common/NotFound'

const DataBrowser = () => {
  return (
    <div className="DataBrowser App">
      <Switch>
        <Route exact path="/data-browser" component={Home} />
        <Route path="/data-browser/data/:year?" component={Geography} />
        <Route path="/data-browser/maps-graphs/:year?" component={MapsGraphs} />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default DataBrowser
