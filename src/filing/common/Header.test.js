jest.unmock('./Header.jsx')
jest.mock('oidc-client')

import Header, { addActiveClass, makeNav, logOutHandler } from './Header.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('Header', () => {
  const header = TestUtils.renderIntoDocument(
    <Wrapper>
      <Header
        user={{ profile: { name: 'Some One' } }}
        pathname="/0/2017/upload"
      />
    </Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', () => {
    expect(headerNode).toBeDefined()
  })

  const headerNoUser = TestUtils.renderIntoDocument(
    <Wrapper>
      <Header pathname="/0/2017/upload" />
    </Wrapper>
  )

  it('renders links without a user', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(headerNoUser, 'li').length
    ).toBe(1)
  })
})

describe('addActiveClass', () => {
  it('returns the correct style', () => {
    const returned = addActiveClass('upload', 'upload')
    expect(returned).toEqual('active')
  })

  it('returns null', () => {
    const returned = addActiveClass('upload', 'notupload')
    expect(returned).toEqual(null)
  })
})

describe('makeNav', () => {
  it('returns wrapped null if on oidc-callback', () => {
    expect(makeNav({}, 'oidc-callback').props.children).toBe(null)
  })
})

describe('logOutHandler', () => {
  it('returns a handler that behaves as expected', () => {
    const pd = jest.fn()
    logOutHandler({ preventDefault: pd })
    expect(pd).toBeCalled()
  })
})
