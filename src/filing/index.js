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

if(process.env.NODE_ENV === 'development'){
  setKeycloak(Keycloak(process.env.PUBLIC_URL + '/local_keycloak.json'))
}else{
  setKeycloak(Keycloak(process.env.PUBLIC_URL + '/keycloak.json'))
}

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
    <div className="App Filing">
      <Provider store={store}>
        <Switch>
          <Redirect exact from="/filing" to="/filing/2019/"/>
          <Route exact path={'/filing/:filingPeriod/'} render={props => {
            return <AppContainer {...props}>
              <HomeContainer/>
            </AppContainer>
          }}/>
          <Route path={'/filing/:filingPeriod/institutions'} render={props => {
            return <AppContainer {...props}>
              <InstitutionContainer/>
            </AppContainer>
          }}/>
          <Route exact path={'/filing/:filingPeriod/:lei/'} render={props => {
            return <AppContainer {...props}>
              <SubmissionRouter/>
            </AppContainer>
          }}/>
          <Route path={'/filing/:filingPeriod/:lei/:splat'} render={props => {
            return <AppContainer {...props}>
              <SubmissionRouter/>
            </AppContainer>
          }}/>
        </Switch>
      </Provider>
    </div>
  )
}

export default Filing
