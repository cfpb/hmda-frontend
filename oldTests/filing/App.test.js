jest.unmock('./App.jsx')
jest.mock('./common/Header.jsx', () => jest.fn(() => null))
jest.mock('./modals/confirmationModal/container.jsx')
jest.mock('detect-browser', () => {
  return { name: 'ie', version: '9.0.0' }
})
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import ConnectedAppContainer, { AppContainer, mapStateToProps } from '../../src/filing/App.jsx'
import * as AccessToken from './api/AccessToken.js'
import * as redirect from './utils/redirect.js'
import * as log from '../../src/filing/utils/log'
import Wrapper from '../test-resources/Wrapper.js'
import browser from 'detect-browser'

const set = jest.fn()
AccessToken.set = set

const signinRedirect = jest.fn()
redirect.signinRedirect = signinRedirect

const getUser = jest.fn(() => Promise.resolve())
redirect.getUserManager = () => {
  return { getUser: getUser }
}

const defaultState = {
  app: {
    redirecting: false,
    user: {
      oidc: null,
      userError: false,
      isFetching: false,
    },
  },
}

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('AppContainer', () => {
  console.error = jest.fn()
  const wrappedContainer = TestUtils.renderIntoDocument(
    <Wrapper store={defaultState}>
      <ConnectedAppContainer location={{}}>
        <p>hey</p>
      </ConnectedAppContainer>
    </Wrapper>,
  )

  const containerNode = ReactDOM.findDOMNode(wrappedContainer).firstChild

  it('renders the connected component', () => {
    expect(containerNode).toBeDefined()
    expect(containerNode.firstChild.textContent).toEqual('Skip to main content')
    expect(console.error).not.toBeCalled()
  })
})

describe('mapStateToProps', () => {
  it('maps state to props correctly', () => {
    expect(mapStateToProps(defaultState)).toEqual({
      isFetching: false,
      userError: false,
      redirecting: false,
      oidc: null,
    })
  })
})

describe('componentWillMount', () => {
  it('sets accessToken when provided an unexpired user', () => {
    const app = new AppContainer({
      oidc: { access_token: 1, expired: false },
    })

    app.componentWillMount()
    expect(set.mock.calls.length).toBe(1)
  })

  it('gets user if given an expired user', () => {
    const getUser = jest.fn(() => Promise.resolve())
    redirect.getUserManager = () => {
      return { getUser: getUser }
    }
    const dispatch = jest.fn()
    const app = new AppContainer({
      oidc: { access_token: 1, expired: true },
      dispatch: dispatch,
    })

    app.componentWillMount()
    expect(dispatch).toBeCalled()
    expect(getUser).toBeCalled()
  })

  it('gets user if given a null user', () => {
    const getUser = jest.fn(() => Promise.resolve())
    redirect.getUserManager = () => {
      return { getUser: getUser }
    }
    const dispatch = jest.fn()
    const app = new AppContainer({
      oidc: { access_token: 1, expired: true },
      dispatch: dispatch,
    })

    app.componentWillMount()
    expect(dispatch).toBeCalled()
    expect(getUser).toBeCalled()
  })
})

describe('componentWillUpdate', () => {
  const signinRedirect = jest.fn()
  redirect.signinRedirect = signinRedirect
  it('short circuits if oidc is present', () => {
    const app = new AppContainer({
      oidc: { access_token: 1, expired: false },
    })
    app.componentWillUpdate({
      oidc: { access_token: 1, expired: false },
    })
    expect(signinRedirect).not.toBeCalled()
  })

  it('short circuits if isFetching', () => {
    const app = new AppContainer({})
    app.componentWillUpdate({ isFetching: true })
    expect(signinRedirect).not.toBeCalled()
  })

  it('short circuits if isUnprotected', () => {
    const app = new AppContainer({})
    app._isUnprotected = jest.fn(() => true)
    app.componentWillUpdate({})
    expect(signinRedirect).not.toBeCalled()
  })

  it('redirects if on a protected page with no user or fetching user', () => {
    const app = new AppContainer({})
    app._isUnprotected = jest.fn(() => false)
    app.componentWillUpdate({})
    expect(signinRedirect).toBeCalled()
  })
})

describe('_userError', () => {
  it('reports an error when called', () => {
    const error = jest.fn()
    log.error = error
    const app = new AppContainer({})
    app._userError('bargle')
    expect(error).toBeCalledWith('Error loading user.', 'bargle')
  })
})

describe('_handleUser', () => {
  it('emits USER_EXPIRED when expired', () => {
    const dispatch = jest.fn()
    const app = new AppContainer({ dispatch })
    app._handleUser({ expired: true })
    expect(dispatch).toBeCalledWith({ type: 'USER_EXPIRED' })
  })

  it('emits USER_EXPIRED when no user', () => {
    const dispatch = jest.fn()
    const app = new AppContainer({ dispatch })
    app._handleUser()
    expect(dispatch).toBeCalledWith({ type: 'USER_EXPIRED' })
  })

  it('sets access token and emits USER_FOUND if unexpired user present', () => {
    const dispatch = jest.fn()
    const app = new AppContainer({ dispatch })
    app._handleUser({ expired: false })
    expect(dispatch).toBeCalledWith({
      type: 'USER_FOUND',
      payload: { expired: false },
    })
    expect(set.mock.calls.length).toBe(2)
  })
})

describe('_isUnprotected', () => {
  it('reports unprotected on isOidc', () => {
    const app = new AppContainer({})
    app._isOidc = jest.fn(() => true)
    app._isHome = jest.fn(() => false)
    expect(app._isUnprotected({})).toBe(true)
  })

  it('reports unprotected on isHome', () => {
    const app = new AppContainer({})
    app._isOidc = jest.fn(() => false)
    app._isHome = jest.fn(() => true)
    expect(app._isUnprotected({})).toBe(true)
  })

  it('reports protected on neither oidc or Home', () => {
    const app = new AppContainer({})
    app._isOidc = jest.fn(() => false)
    app._isHome = jest.fn(() => false)
    expect(app._isUnprotected({})).toBe(false)
  })
})

describe('_isOidc', () => {
  it('returns true when matches oidc endpoint', () => {
    const app = new AppContainer({})
    expect(
      app._isOidc({ location: { pathname: '/filing/oidc-callback' } }),
    ).toBe(true)
  })

  it('returns false when does not match oidc endpoint', () => {
    const app = new AppContainer({})
    expect(app._isOidc({ location: { pathname: '/elsewise' } })).toBe(false)
  })
})

describe('_isHome', () => {
  it('returns true when matches home endpoint', () => {
    const app = new AppContainer({})
    expect(app._isHome({ location: { pathname: '/filing/' } })).toBe(true)
  })

  it('returns false when does not match home endpoint', () => {
    const app = new AppContainer({})
    expect(app._isHome({ location: { pathname: '/elsewise' } })).toBe(false)
  })
})

describe('_isOldBrowser', () => {
  it('returns true if browser is old', () => {
    const app = new AppContainer({})
    expect(app._isOldBrowser()).toBe(true)
  })
})

describe('_renderAppContents', () => {
  it('returns browser blocker when isOldBrowser', () => {
    const app = new AppContainer({})
    app._isOldBrowser = jest.fn(() => true)
    expect(app._renderAppContents().type.name).toBe('BrowserBlocker')
  })

  it('returns loading if redirecting', () => {
    const app = new AppContainer({})
    app._isOldBrowser = jest.fn(() => false)
    expect(app._renderAppContents({ redirecting: true }).type.name).toBe(
      'LoadingIcon',
    )
  })

  it('returns loading if protected and no oidc user exists', () => {
    const app = new AppContainer({})
    app._isOldBrowser = jest.fn(() => false)
    app._isUnprotected = jest.fn(() => false)
    expect(app._renderAppContents({}).type.name).toBe('LoadingIcon')
  })

  it('returns children otherwise', () => {
    const app = new AppContainer({})
    app._isOldBrowser = jest.fn(() => false)
    app._isUnprotected = jest.fn(() => true)
    expect(app._renderAppContents({ children: 'argle' })).toBe('argle')
  })
})

describe('render', () => {
  it('makes a logged out modal on userError', () => {
    const app = new AppContainer({ location: {}, userError: true })
    app._renderAppContents = jest.fn(() => null)
    expect(app.render().props.children[2].type.displayName).toBe(
      'Connect(LoggedOutContainer)',
    )
  })
})
