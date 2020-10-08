import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Geography from './datasets/Geography.jsx'
import MapsGraphs from './maps/MapsGraphs.jsx'
import NotFound from '../common/NotFound'
import { withAppContext } from '../common/appContextHOC'

const DataBrowser = props => {
  return (
    <div className="DataBrowser App">
      <Switch>
        <Route exact path="/data-browser" component={Home} />
        <Route
          path="/data-browser/data/:year?"
          render={(r_props) => <Geography {...r_props} {...props} /> }
        />
        {
          props.config.showMaps
          ? <Route
              path="/data-browser/maps-graphs/:year?"
              render={(r_props) => <MapsGraphs {...r_props} {...props} /> }
            />
          : null
        }
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default withAppContext(DataBrowser)
