jest.unmock('./container.jsx')
jest.mock('../actions/fetchInstitutions.js')

import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../test-resources/Wrapper.js'
import fetchInstitutions from '../actions/fetchInstitutions.js'
import Connected, {
  InstitutionContainer,
  mapStateToProps,
} from '../../../src/filing/institutions/container.jsx'

const fetch = jest.fn(() => {
  return { type: 'FAKE' }
})

fetchInstitutions.mockImplementation(fetch)

const state = {
  app: {
    institutions: {
      institutions: {},
      isFetching: false,
      fetched: false,
    },
    filingPeriod: '2017',
    filings: {},
    error: null,
    submission: {
      status: {
        code: 1,
      },
    },
  },
}

describe('Institution Container', () => {
  it('renders the unwrapped component', () => {
    const err = console.error
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(
      <InstitutionContainer
        dispatch={jest.fn()}
        institutions={state.app.institutions}
      />,
    )

    expect(rendered).toBeDefined()
    expect(console.error).not.toBeCalled()
    expect(fetch.mock.calls.length).toBe(1)
  })

  it('fetches institutions if not fetched and not fetching', () => {
    const container = new InstitutionContainer({
      dispatch: jest.fn(),
      institutions: {},
    })
    container.componentDidMount()
    expect(fetch.mock.calls.length).toBe(2)

    const c2 = new InstitutionContainer({
      institutions: { fetched: false, isFetching: true, dispatch: jest.fn() },
    })
    c2.componentDidMount()
    expect(fetch.mock.calls.length).toBe(2)

    const c3 = new InstitutionContainer({
      institutions: { fetched: true, isFetching: false },
    })
    c3.componentDidMount()
    expect(fetch.mock.calls.length).toBe(2)
  })

  it('maps state to props', () => {
    expect(mapStateToProps(state)).toEqual({
      institutions: {
        institutions: {},
        isFetching: false,
        fetched: false,
      },
      filingPeriod: '2017',
      filings: {},
      error: null,
      submission: { status: { code: 1 } },
    })
  })

  it('throws on bad state', () => {
    expect(() => {
      mapStateToProps()
    }).toThrow()
  })

  it('renders the connected component', () => {
    const err = console.error
    console.error = jest.fn()
    const wrapped = TestUtils.renderIntoDocument(
      <Wrapper store={state}>
        <Connected />
      </Wrapper>,
    )

    expect(wrapped).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })
})
