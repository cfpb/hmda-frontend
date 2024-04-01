jest.unmock('./NameAndId.jsx')

import InstitutionNameAndId from '../../../src/filing/institutions/NameAndId.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('InstitutionNameAndId', () => {
  it('renders the institution name and lei', () => {
    const nameAndId = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionNameAndId lei='123456' name='Bank0' />
      </Wrapper>,
    )
    const nameAndIdNode = ReactDOM.findDOMNode(nameAndId)

    expect(nameAndIdNode).toBeDefined()
    expect(nameAndIdNode.textContent).toEqual('Bank0 - 123456')
  })
})
