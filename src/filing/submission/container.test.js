jest.unmock('./container.jsx')
jest.mock('../actions/fetchInstitution.js')

import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../test-resources/Wrapper.js'
import fetchInstitution from '../actions/fetchInstitution.js'
import Connected, {
  SubmissionContainer,
  mapStateToProps,
  renderByCode
} from './container.jsx'

const fetch = jest.fn(() => {
  return { type: 'FAKE' }
})

fetchInstitution.mockImplementation(fetch)

const state = {
  app: {
    institutions: {
      institutions: {},
      isFetching: false,
      fetched: false
    },
    lei: 'abc',
    error: null,
    submission: {
      status: {
        code: 1
      }
    }
  }
}

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('SubmissionContainer', () => {
  it('renders the unwrapped component', () => {
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(
      <SubmissionContainer
        params={{ lei: '123' }}
        dispatch={jest.fn()}
        institutions={{ institutions: { '123': {} } }}
      />
    )

    expect(rendered).toBeDefined()
    expect(console.error).not.toBeCalled()
    expect(fetch.mock.calls.length).toBe(0)
  })

  it('fetches institution if lei param does not exist in state', () => {
    const container = new SubmissionContainer({
      dispatch: jest.fn(),
      institutions: state.app.institutions,
      params: { lei: '123' }
    })
    container.componentDidMount()
    expect(fetch.mock.calls.length).toBe(1)

    const c2 = new SubmissionContainer({
      institutions: { institutions: { '123': {} } },
      params: { lei: '123' }
    })
    c2.componentDidMount()
    expect(fetch.mock.calls.length).toBe(1)
  })

  it('maps state to props', () => {
    expect(mapStateToProps(state)).toEqual({
      institutions: {
        institutions: {},
        isFetching: false,
        fetched: false
      },
      lei: 'abc',
      error: null,
      submission: { status: { code: 1 } }
    })
  })

  it('throws on bad state', () => {
    expect(() => {
      mapStateToProps()
    }).toThrow()
  })

  it('renders the proper components based on code', () => {
    const failed = renderByCode(-1, 'a', 'argle')
    expect(failed[0].props.children).toBe('argle')
    expect(failed[1].type.displayName).toBe('Connect(NavButton)')

    const parseErr = renderByCode(5, 'upload')
    expect(parseErr.length).toBe(3)
    expect(parseErr[1].type.displayName).toBe('Connect(ParseErrorsContainer)')

    const noRenderUpload = renderByCode(7, 'upload')
    expect(noRenderUpload.length).toBe(2)

    const edits = renderByCode(7, 'quality')
    expect(edits[0].type.displayName).toBe('Connect(Connect(EditsContainer))')

    const readyToSign = renderByCode(9, 'submission')
    expect(readyToSign.length).toBe(8)

    const sign = renderByCode(10, 'submission')
    expect(sign.length).toBe(6)

    const wrong = renderByCode(12, 'argle')
    expect(wrong[0].props.children[0]).toBe('Something is wrong.')
  })

  it('renders the connected component', () => {
    const err = console.error
    console.error = jest.fn()
    const wrapped = TestUtils.renderIntoDocument(
      <Wrapper store={state}>
        <Connected params={{ lei: '123' }} />
      </Wrapper>
    )

    expect(wrapped).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })

  it('renders with location', () => {
    const container = new SubmissionContainer({
      dispatch: jest.fn(),
      institutions: {
        ...state.app.institutions,
        institutions: { '123': { name: 'oi' } }
      },
      submission: state.app.submission,
      params: { lei: '123' },
      location: { pathname: '/upload' }
    })

    const rendered = container.render()
    expect(rendered.props.children[1].type.displayName).toBe(
      'Connect(EditsNav)'
    )
    expect(rendered.props.children[2].props.className).toBe(
      'usa-grid SubmissionContainer'
    )
    expect(rendered.props.children[2].props.children[0]).toBe(null)
  })

  it('renders with error', () => {
    const container = new SubmissionContainer({
      dispatch: jest.fn(),
      institutions: state.app.institutions,
      submission: state.app.submission,
      params: { lei: '123' },
      location: { pathname: '/upload' },
      error: { error: 'an err' }
    })

    const rendered = container.render()
    expect(rendered.props.children[1].type.displayName).toBe(
      'Connect(EditsNav)'
    )
    expect(rendered.props.children[2].props.className).toBe(
      'usa-grid SubmissionContainer'
    )
    expect(rendered.props.children[2].props.children[0]).not.toBe(null)
  })

  it('renders without code', () => {
    const container = new SubmissionContainer({
      dispatch: jest.fn(),
      institutions: state.app.institutions,
      submission: { ...state.app.submission, status: {} },
      params: { lei: '123' },
      location: { pathname: '/upload' }
    })

    const rendered = container.render()
    expect(
      rendered.props.children[2].props.children[1][0].props.children.type.name
    ).toBe('LoadingIcon')
  })
})
