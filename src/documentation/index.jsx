import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import NotFound from '../common/NotFound'
import { withAppContext } from '../common/appContextHOC'
import './index.css'

const Documentation = () => {
  // Redirects setup to handle bookmarked pages and general navigation to the old doc paths
  // Redirects point to Docusaurus base route
  return (
    <Switch>
      <Redirect
        exact
        path='/documentation'
        to={window.location.assign(
          `${window.location.origin}/documentation/category/frequently-asked-questions`,
        )}
      />
      <Route component={NotFound} />
    </Switch>
  )
}

export default withAppContext(Documentation)
