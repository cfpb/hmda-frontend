jest.unmock('./router.jsx')
jest.mock('./container.jsx')
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import TestUtils from 'react-dom/test-utils'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ConnectedRouter, {
  SubmissionRouter,
  mapStateToProps
} from './router.jsx'
import * as STATUS from '../constants/statusCodes.js'
import Wrapper from '../../test-resources/Wrapper.js'

const mockStore = configureMockStore([thunk])
window.localStorage = {
  getItem: jest.fn()
}

const submissionDefault = {
  id: { lei: '123' },
  status: { code: STATUS.VALIDATED }
}
const typesDefault = {
  syntactical: { edits: [] },
  validity: { edits: [] },
  quality: { edits: [], verified: false },
  macro: { edits: [], verified: false }
}

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('ConnectedRouter', () => {
  const store = mockStore({
    app: {
      submission: submissionDefault,
      edits: {
        types: typesDefault
      },
      lei: '123',
      institutions: {
        institutions: {}
      }
    }
  })
  console.error = jest.fn()
  const container = TestUtils.renderIntoDocument(
    <ConnectedRouter
      store={store}
      params={{ lei: '123', filingPeriod: '234', splat: 'upload' }}
    >
      <p>hey</p>
    </ConnectedRouter>
  )

  const containerNode = ReactDOM.findDOMNode(container)

  it('renders the component', () => {
    expect(containerNode).toBeDefined()
    expect(console.error).not.toBeCalled()
  })
})

describe('mapStateToProps', () => {
  it('maps state to props correctly', () => {
    expect(
      mapStateToProps(
        {
          app: {
            submission: submissionDefault,
            edits: {
              types: typesDefault
            }
          }
        },
        { params: 'argle' }
      )
    ).toEqual({
      submission: submissionDefault,
      types: typesDefault,
      params: 'argle'
    })
  })
})

describe('replaceHistory', () => {
  it('replaces history correctly', () => {
    const replace = jest.fn()
    browserHistory.replace = replace

    const router = new SubmissionRouter({
      params: { lei: 'argle', filingPeriod: 'bargle' }
    })
    router.replaceHistory('foofaraw')

    expect(replace).toBeCalledWith('/filing/argle/bargle/foofaraw')
  })
})

describe('render', () => {
  it('renders with filled props', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', splat: 'bargle' }
    })
    router.renderChildren = true
    const rendered = router.render()
    expect(rendered.type.displayName).toBe('Connect(SubmissionContainer)')
  })

  it('renders loading when uninitialized', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UNINITIALIZED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', splat: 'bargle' }
    })
    router.renderChildren = true
    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })

  it('renders failed status when failed', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.FAILED, message: 'Failzone' },
        id: { lei: 'argle' }
      },
      params: { lei: 'elsewise', splat: 'bargle' }
    })
    const rendered = router.render()
    expect(rendered.props.children.props.children).toBe('Failzone')
  })
  it('renders loading when ids are not matched', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { lei: 'elsewise', splat: 'bargle' }
    })
    router.renderChildren = true
    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })

  it('renders loading when renderChildren is unset', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', splat: 'bargle' }
    })

    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })

  it('renders loading when no splat is present', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle' }
    })

    router.renderChildren = true

    const rendered = router.render()
    expect(rendered.type.name).toBe('LoadingIcon')
  })
})

describe('componentDidMount', () => {
  it('routes to homepage when lei is missing', () => {
    const dispatch = jest.fn()
    const replace = jest.fn()
    browserHistory.replace = replace

    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { filingPeriod: 'bargle' },
      dispatch: dispatch
    })

    router.componentDidMount()

    expect(replace).toBeCalled()
    expect(dispatch).not.toBeCalled()
  })

  it('routes to homepage when filing is missing', () => {
    const dispatch = jest.fn()
    const replace = jest.fn()
    browserHistory.replace = replace

    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle' },
      dispatch: dispatch
    })

    router.componentDidMount()

    expect(replace).toBeCalled()
    expect(dispatch).not.toBeCalled()
  })

  it('routes when submission exists and edits are not needed', () => {
    const route = jest.fn()
    const dispatch = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', filingPeriod: 'bargle' },
      dispatch: dispatch
    })

    router.route = route
    router.componentDidMount()

    expect(router.renderChildren).toBe(false)
    expect(route).toBeCalled()
    expect(dispatch.mock.calls.length).toBe(2)
  })

  it('refreshes and routes when id exists and is unmatched', done => {
    const route = jest.fn()
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      params: { lei: 'elsewise', filingPeriod: 'bargle' },
      dispatch: dispatch
    })

    router.route = route
    router.componentDidMount()

    expect(dispatch.mock.calls.length).toBe(4)
    setTimeout(() => {
      expect(route).toBeCalled()
      done()
    }, 0)
  })

  it('routes with no status', done => {
    const route = jest.fn()
    const editsNeeded = jest.fn(() => false)
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: null,
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', filingPeriod: 'bargle' },
      dispatch: dispatch
    })

    router.route = route
    router.editsNeeded = editsNeeded
    router.componentDidMount()

    expect(dispatch.mock.calls.length).toBe(3)
    setTimeout(() => {
      expect(route).toBeCalled()
      expect(dispatch.mock.calls.length).toBe(3)
      done()
    }, 0)
  })

  it('routes with UNINITIALIZED status', done => {
    const route = jest.fn()
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UNINITIALIZED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', filingPeriod: 'bargle' },
      dispatch: dispatch
    })

    router.route = route
    router.componentDidMount()

    expect(dispatch.mock.calls.length).toBe(3)
    setTimeout(() => {
      expect(route).toBeCalled()
      done()
    }, 0)
  })

  it('routes with UNINITIALIZED status and edits needed', done => {
    const route = jest.fn()
    const editsNeeded = jest.fn(() => true)
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UNINITIALIZED },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', filingPeriod: 'bargle' },
      dispatch: dispatch
    })

    router.route = route
    router.editsNeeded = editsNeeded
    router.componentDidMount()

    setTimeout(() => {
      expect(dispatch.mock.calls.length).toBe(4)
      expect(route).toBeCalled()
      done()
    }, 0)
  })

  it('routes when edits needed', done => {
    const route = jest.fn()
    const editsNeeded = jest.fn(() => true)
    const dispatch = jest.fn(() => {
      return Promise.resolve()
    })
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS },
        id: { lei: 'argle' }
      },
      params: { lei: 'argle', filingPeriod: 'bargle' },
      dispatch: dispatch
    })

    router.route = route
    router.editsNeeded = editsNeeded
    router.componentDidMount()

    expect(dispatch.mock.calls.length).toBe(3)
    setTimeout(() => {
      expect(route).toBeCalled()
      done()
    }, 0)
  })
})

describe('editsNeeded', () => {
  it('returns positively when editsneeded', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS }
      }
    })
    expect(router.editsNeeded()).toBe(true)
  })

  it('returns negatively when edits are not needed', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED }
      }
    })
    expect(router.editsNeeded()).toBe(false)
  })
})

describe('route', () => {
  it('routes with no splat', () => {
    const latest = jest.fn(() => 'latest')
    const replace = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle' }
    })
    router.getLatestPage = latest
    router.replaceHistory = replace
    router.route()
    expect(replace).toBeCalledWith('latest')
  })

  it('routes with bad splat', () => {
    const replace = jest.fn()
    browserHistory.replace = replace
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle', splat: 'badsplat' }
    })
    router.route()
    expect(replace).toBeCalledWith('/filing/')
  })

  it('routes on before validated on upload page', () => {
    const force = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UPLOADING },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle', splat: 'upload' }
    })
    router.forceUpdate = force
    router.route()
    expect(router.renderChildren).toBe(true)
    expect(force).toBeCalled()
  })

  it('routes on before validated not on upload page', () => {
    const replace = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UPLOADING },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle', splat: 'quality' }
    })
    router.replaceHistory = replace
    router.route()
    expect(replace).toBeCalled()
  })

  it('routes on validated with errors when splat is latest', () => {
    const latest = jest.fn(() => 'quality')
    const force = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle', splat: 'quality' }
    })
    router.forceUpdate = force
    router.getLatestPage = latest
    router.route()
    expect(force).toBeCalled()
  })

  it('routes on validated with errors when splat is greater than latest', () => {
    const replace = jest.fn()
    const latest = jest.fn(() => 'quality')
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle', splat: 'macro' }
    })
    router.replaceHistory = replace
    router.getLatestPage = latest
    router.route()
    expect(replace).toBeCalledWith('quality')
  })

  it('routes on validated with errors when splat is less than latest', () => {
    const force = jest.fn()
    const latest = jest.fn(() => 'quality')
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle', splat: 'upload' }
    })
    router.forceUpdate = force
    router.getLatestPage = latest
    router.route()
    expect(force).toBeCalled()
  })

  it('routes on validated with splat', () => {
    const force = jest.fn()
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED },
        id: { lei: 'argle' }
      },
      types: typesDefault,
      params: { lei: 'argle', filingPeriod: 'bargle', splat: 'quality' }
    })
    router.forceUpdate = force
    router.route()
    expect(force).toBeCalled()
  })
})

describe('getLatestPage', () => {
  it('latest is upload when code is < VALIDATED_WITH_ERRORS', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.UPLOADING }
      },
      types: typesDefault
    })
    expect(router.getLatestPage()).toBe('upload')
  })

  it('latest is submission when code is > VALIDATED_WITH_ERRORS', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED }
      },
      types: typesDefault
    })
    expect(router.getLatestPage()).toBe('submission')
  })

  it('latest is synval when code is VALIDATED_WITH_ERRORS and synvalExist', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS }
      },
      types: { ...typesDefault, syntactical: { edits: [{}] } }
    })
    expect(router.getLatestPage()).toBe('syntacticalvalidity')
  })

  it('latest is quality when code is VALIDATED_WITH_ERRORS and quality exists', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS }
      },
      types: { ...typesDefault, quality: { edits: [{}] } }
    })
    expect(router.getLatestPage()).toBe('quality')
  })

  it('latest is macro when code is VALIDATED_WITH_ERRORS and quality exists but is verified', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS }
      },
      types: { ...typesDefault, quality: { edits: [{}], verified: true } }
    })
    expect(router.getLatestPage()).toBe('macro')
  })

  it('latest is macro when code is VALIDATED_WITH_ERRORS and not blocked by errors', () => {
    const router = new SubmissionRouter({
      submission: {
        status: { code: STATUS.VALIDATED_WITH_ERRORS }
      },
      types: typesDefault
    })
    expect(router.getLatestPage()).toBe('macro')
  })
})
