jest.unmock('../../../src/filing/common/ErrorWarning.jsx')
jest.mock('./Alert.jsx', () => jest.fn(() => null))

import ErrorWarning, { getHeading, getText } from '../../../src/filing/common/ErrorWarning.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('ErrorWarning', () => {
  const errorWarning = TestUtils.renderIntoDocument(
    <Wrapper>
      <ErrorWarning error={{ status: 500 }} />
    </Wrapper>,
  )
  const warningNode = ReactDOM.findDOMNode(errorWarning)

  it('renders the warning', () => {
    expect(warningNode).toBeDefined()
  })

  const nullError = TestUtils.renderIntoDocument(
    <Wrapper>
      <ErrorWarning />
    </Wrapper>,
  )
  const nullNode = ReactDOM.findDOMNode(nullError)

  it('renders the nulled error as null', () => {
    expect(nullNode).toBe(null)
  })

  it('renders correct header on 401', () => {
    const rendered = getHeading({ error: { status: 401 } })
    expect(rendered).toEqual('You have been automatically logged out.')
  })

  it('renders correct header on 404', () => {
    const rendered = getHeading({ error: { status: 404 } })
    expect(rendered).toEqual('Sorry, an error has occurred.')
  })

  it('renders correct header on 500', () => {
    const rendered = getHeading({ error: { status: 500 } })
    expect(rendered).toEqual('Sorry, an error has occurred.')
  })

  it('renders correct header on unknown error', () => {
    const rendered = getHeading({ error: { status: 405 } })
    expect(rendered).toEqual('Sorry, an error has occurred.')
  })

  it('renders correct header with provided text', () => {
    const rendered = getHeading({ error: { status: 405 }, headerText: 'hi' })
    expect(rendered).toEqual('hi')
  })

  it('renders correct body on 400', () => {
    const rendered = getText({ error: { status: 400 } })
    expect(rendered).toEqual(
      'Your request could not be completed. Please try again.',
    )
  })

  it('renders correct body on 401', () => {
    const rendered = getText({ error: { status: 401 } })
    expect(rendered).toEqual('Please log in to complete this request.')
  })

  it('renders correct body on 403', () => {
    const rendered = getText({ error: { status: 403 } })
    expect(rendered).toEqual(
      "You don't have access to the requested resources. Please ensure you are filing for the correct institution.",
    )
  })

  it('renders correct body on 404', () => {
    const rendered = getText({ error: { status: 404 } })
    expect(rendered).toEqual('Please refresh the page.')
  })

  it('renders correct body on 500', () => {
    const rendered = getText({ error: { status: 500 } })
    expect(rendered).toEqual(
      "We're quickly working on resolving the issue, please refresh the page.",
    )
  })

  it('renders correct body on 502', () => {
    const rendered = getText({ error: { status: 502 } })
    expect(rendered).toEqual(
      "We're having trouble routing your request, please refresh the page or try again later.",
    )
  })
  it('renders correct body on 503', () => {
    const rendered = getText({ error: { status: 503 } })
    expect(rendered).toEqual(
      "We're experiencing some issues on our end, please refresh the page or try again later.",
    )
  })
  it('renders correct body on unknown error', () => {
    const rendered = getText({ error: { status: 405 } })
    expect(rendered).toEqual('Please refresh the page.')
  })

  it('renders correct body with provided text', () => {
    const rendered = getText({ error: { status: 405 }, bodyText: 'hi' })
    expect(rendered).toEqual('hi')
  })
})
