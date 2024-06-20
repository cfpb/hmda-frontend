jest.unmock('../../src/js/containers/App.jsx')

import React from 'react'
import TestUtils from 'react-dom/test-utils'
import AppContainer from '../../src/js/containers/App.jsx'
import Wrapper from '../Wrapper.js'

describe('AppContainer', () => {
  console.error = jest.fn()
  let containerRef

  const wrappedContainer = TestUtils.renderIntoDocument(
    <Wrapper store={{ app: {} }}>
      <AppContainer ref={(ref) => (containerRef = ref)}>
        <p>hey</p>
      </AppContainer>
    </Wrapper>,
  )

  it('renders the component', () => {
    expect(containerRef).toBeDefined()
    expect(containerRef.firstChild.textContent).toEqual(
      'This website is a work in progress',
    )
    expect(console.error).not.toBeCalled()
  })
})
