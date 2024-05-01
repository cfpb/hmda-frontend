jest.unmock('./UserHeading.jsx')

import UserHeading from '../../../src/filing/submission/UserHeading.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

console.error = jest.fn()

const data = {
  user: 'User1',
  institution: {
    id: '1',
    name: 'Wacky data',
  },
  period: '2017',
}

describe('UserHeading', () => {
  describe('does NOT render without period', () => {
    const heading = TestUtils.renderIntoDocument(
      <Wrapper>
        <UserHeading institution={{}} period={null} />
      </Wrapper>,
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('does NOT render the component', () => {
      expect(headingNode).toBeNull()
    })
  })

  describe('render with username', () => {
    const heading = TestUtils.renderIntoDocument(
      <Wrapper>
        <UserHeading name='Test' period={data.period} />
      </Wrapper>,
    )
    const headingNode = ReactDOM.findDOMNode(heading)

    it('renders the component', () => {
      expect(headingNode).toBeDefined()
    })

    it('renders correctly', () => {
      expect(headingNode.textContent).toEqual(
        'Filing on behalf of Test for 2017',
      )
    })
  })
})
