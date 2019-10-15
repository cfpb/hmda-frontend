jest.unmock('./container.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import RefileButton, {
  RefileButtonContainer,
  mapDispatchToProps
} from './container.jsx'
import Wrapper from '../../test-resources/Wrapper.js'

console.error = jest.fn()

const defaultState = {
  app: {
    institution: {
      id: '1'
    },
    filingPeriod: '2017',
    submission: {
      status: {
        code: 5
      }
    }
  }
}

describe('RefileButton', () => {
  it('renders the connected component', () => {
    const wrappedConnected = TestUtils.renderIntoDocument(
      <Wrapper store={defaultState}>
        <RefileButton />
      </Wrapper>
    )

    expect(console.error).not.toBeCalled()
  })

  it('fails to render the unconnected component', () => {
    const wrappedContainer = TestUtils.renderIntoDocument(
      <Wrapper>
        <RefileButtonContainer />
      </Wrapper>
    )
    expect(console.error).toHaveBeenCalledTimes(2)
  })

  it('uses the state without props', () => {
    const buttonState = TestUtils.renderIntoDocument(
      <Wrapper store={defaultState}>
        <RefileButton />
      </Wrapper>
    )
    expect(buttonState.props.store).toEqual(defaultState)
  })

  it('maps dispatch to props', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch)

    expect(Object.keys(mapped)).toEqual([
      'showConfirmModal',
      'updateInstitution'
    ])
    mapped.showConfirmModal()
    expect(dispatch).toBeCalled()
  })
})
