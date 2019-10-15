jest.unmock('./Loading.jsx')

import Loading from './Loading.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('Loading', () => {
  const loadingIcon = TestUtils.renderIntoDocument(
    <Wrapper>
      <Loading />
    </Wrapper>
  )
  const loadingIconNode = ReactDOM.findDOMNode(loadingIcon)

  it('renders the loadingIcon', () => {
    expect(loadingIconNode).toBeDefined()
  })

  it('creates the correct div with class, "LoadingIconWrapper"', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        loadingIcon,
        'LoadingIconWrapper'
      ).length
    ).toEqual(1)
  })

  it('creates the correct div with class, "LoadingIcon"', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(loadingIcon, 'LoadingIcon')
        .length
    ).toEqual(1)
  })

  it('passes a passed class to the LoadingIconWrapper', () => {
    const loadingIcon = Loading({ className: 'argle' })
    expect(loadingIcon.props.className).toBe('LoadingIconWrapper argle')
  })
})
