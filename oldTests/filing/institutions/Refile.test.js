jest.unmock('./Refile.jsx')
jest.unmock('../refileButton/container.jsx')

import InstitutionRefile from '../../../src/filing/institutions/Refile.jsx'
import * as STATUS from '../../../src/filing/constants/statusCodes.js'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const filing = {
  period: 2017,
  lei: '123456',
}
describe('InstitutionRefile', () => {
  it('renders the refile button', () => {
    const refile = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionRefile status={{ code: STATUS.CREATED }} filing={filing} />
      </Wrapper>,
    )
    const refileNode = ReactDOM.findDOMNode(refile)

    expect(refileNode).toBeDefined()
  })

  it('returns null without a status', () => {
    const refile = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionRefile filing={filing} />
      </Wrapper>,
    )
    const refileNode = ReactDOM.findDOMNode(refile)

    expect(refileNode).toBe(null)
  })

  it('returns null without a code', () => {
    const refile = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionRefile filing={filing} status={{ something: 'nothing' }} />
      </Wrapper>,
    )
    const refileNode = ReactDOM.findDOMNode(refile)

    expect(refileNode).toBe(null)
  })

  it('returns null with a code < PARSED_WITH_ERRORS', () => {
    const refile = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionRefile filing={filing} status={{ code: STATUS.PARSING }} />
      </Wrapper>,
    )
    const refileNode = ReactDOM.findDOMNode(refile)

    expect(refileNode).toBe(null)
  })

  it('returns null with a code of VALIDATING', () => {
    const refile = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionRefile
          filing={filing}
          status={{ code: STATUS.VALIDATING }}
        />
      </Wrapper>,
    )
    const refileNode = ReactDOM.findDOMNode(refile)

    expect(refileNode).toBe(null)
  })

  it('returns the button with a code of PARSED_WITH_ERRORS', () => {
    const refile = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionRefile
          filing={filing}
          status={{ code: STATUS.PARSED_WITH_ERRORS }}
        />
      </Wrapper>,
    )
    const refileNode = ReactDOM.findDOMNode(refile)
    expect(refileNode.textContent).toEqual('Upload a new file')
  })

  it('returns the button with a code > VALIDATING', () => {
    const refile = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionRefile
          filing={filing}
          status={{ code: STATUS.VALIDATED }}
        />
      </Wrapper>,
    )
    const refileNode = ReactDOM.findDOMNode(refile)
    expect(refileNode.textContent).toEqual('Upload a new file')
  })
})
