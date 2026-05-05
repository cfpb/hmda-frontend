import 'core-js/es/array'
import 'react-app-polyfill/ie11'; // For IE 11 support

import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { composeWithDevTools } from '@redux-devtools/extension'
import { Redirect, Route, Switch } from 'react-router-dom'
import { initKeycloak } from '../common/api/Keycloak'
import { withAppContext } from '../common/appContextHOC'
import AppContainer from './App.jsx'
import HomeContainer from './home/HomeContainer.jsx'
import InstitutionContainer from './institutions/container.jsx'
import CompleteProfile from './profile/CompleteProfile'
import appReducer from './reducers'
import SubmissionRouter from './submission/router.jsx'
import { setStore } from './utils/store.js'

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
  const getFilingPeriod = () => store.getState()?.app?.filingPeriod || config.defaultPeriod
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
          <Redirect exact from='/filing' to={`/filing/${getFilingPeriod()}/`} />
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
