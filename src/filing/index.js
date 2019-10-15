import 'react-app-polyfill/ie11' // For IE 11 support

import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { Switch, Route, Redirect } from 'react-router-dom'
import Keycloak from 'keycloak-js'
import AppContainer from './App.jsx'
import HomeContainer from './home/container.jsx'
import InstitutionContainer from './institutions/container.jsx'
import SubmissionRouter from './submission/router.jsx'
import { setKeycloak } from './utils/keycloak.js'
import { setStore } from './utils/store.js'
import appReducer from './reducers'

const middleware = [thunkMiddleware]

setKeycloak(Keycloak(process.env.PUBLIC_URL + '/keycloak.json'))

let store
if (process.env.NODE_ENV !== 'production') {
  // use redux dev tools, extension required
  // see https://github.com/zalmoxisus/redux-devtools-extension#installation
  const { composeWithDevTools } = require('redux-devtools-extension')
  store = createStore(
    combineReducers({
      app: appReducer
    }),
    composeWithDevTools(applyMiddleware(...middleware))
  )
} else {
  store = createStore(
    combineReducers({
      app: appReducer
    }),
    applyMiddleware(...middleware)
  )
}

setStore(store)

const Filing = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <Switch>
          <Redirect from="/filing" to="/filing/2019/"/>
          <Route
            path={'/filing/:filingPeriod/'}
            component={HomeContainer}
          />
          <Route
            path={'/filing/:filingPeriod/institutions'}
            component={InstitutionContainer}
          />
          <Route
            path={'/filing/:filingPeriod/:lei/'}
            component={SubmissionRouter}
          />
          <Route
            path={'/filing/:filingPeriod/:lei/*'}
            component={SubmissionRouter}
          />
          <Route path={'/filing/:filingPeriod/*'} component={SubmissionRouter} />
        </Switch>
      </AppContainer>
    </Provider>
  )
}

export default Filing
