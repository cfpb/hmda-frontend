import 'react-app-polyfill/ie11' // For IE 11 support
import 'core-js/es/array'

import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import { Switch, Route, Redirect } from 'react-router-dom'
import AppContainer from './App.jsx'
import HomeContainer from './home/HomeContainer.jsx'
import InstitutionContainer from './institutions/container.jsx'
import SubmissionRouter from './submission/router.jsx'
import { initKeycloak } from '../common/api/Keycloak'
import { setStore } from './utils/store.js'
import appReducer from './reducers'
import { withAppContext } from '../common/appContextHOC'
import { composeWithDevTools } from '@redux-devtools/extension'
import CompleteProfile from './profile/CompleteProfile'

initKeycloak()
const middleware = [thunkMiddleware]

let store
if (import.meta.env.MODE !== 'production') {
  store = createStore(
    combineReducers({
      app: appReducer,
    }),
    composeWithDevTools(applyMiddleware(...middleware)),
  )
} else {
  store = createStore(
    combineReducers({
      app: appReducer,
    }),
    applyMiddleware(...middleware),
  )
}

setStore(store)

const Filing = ({ config }) => {
  return (
    <div className='App Filing'>
      <Provider store={store}>
        <Switch>
          <Route
            path='/filing/profile'
            render={(props) => {
              return (
                <AppContainer {...props} config={config}>
                  <CompleteProfile />
                </AppContainer>
              )
            }}
          />
          <Redirect
            exact
            from='/filing'
            to={`/filing/${config.defaultPeriod}/`}
          />
          <Route
            exact
            path={'/filing/:filingPeriod/'}
            render={(props) => {
              return (
                <AppContainer {...props} config={config}>
                  <HomeContainer />
                </AppContainer>
              )
            }}
          />
          <Route
            path={[
              '/filing/:filingPeriod/institutions/:institution',
              '/filing/:filingPeriod/institutions',
            ]}
            render={(props) => {
              return (
                <AppContainer {...props} config={config}>
                  <InstitutionContainer history={props.history} />
                </AppContainer>
              )
            }}
          />
          <Route
            exact
            path={'/filing/:filingPeriod/:lei/'}
            render={(props) => {
              return (
                <AppContainer {...props} config={config}>
                  <SubmissionRouter />
                </AppContainer>
              )
            }}
          />
          <Route
            path={'/filing/:filingPeriod/:lei/:splat'}
            render={(props) => {
              return (
                <AppContainer {...props} config={config}>
                  <SubmissionRouter />
                </AppContainer>
              )
            }}
          />
        </Switch>
      </Provider>
    </div>
  )
}

export default withAppContext(Filing)
