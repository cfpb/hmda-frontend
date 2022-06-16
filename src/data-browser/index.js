import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Geography from './datasets/Geography.jsx'
import MapsGraphs from './maps/MapsGraphs.jsx'
import NotFound from '../common/NotFound'
import { withAppContext } from '../common/appContextHOC'
import { redirectIfNoYearProvided } from '../common/redirectIfNoYearProvided'

const DataBrowser = props => {
  const { publicationReleaseYear } = props.config

  return (
    <div className='DataBrowser App'>
      <Switch>
        <Route exact path='/data-browser' component={Home} />
        <Route
          path='/data-browser/data/:year?'
          render={r_props =>
            redirectIfNoYearProvided(r_props, publicationReleaseYear) || <Geography {...r_props} {...props} />
          }
        />
        <Route
          path={['/data-browser/maps/:year?', '/data-browser/maps']}
          render={r_props =>
            redirectIfNoYearProvided(r_props, publicationReleaseYear) || <MapsGraphs {...r_props} {...props} />
          }
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default withAppContext(DataBrowser)
