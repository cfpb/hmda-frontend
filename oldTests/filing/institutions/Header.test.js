jest.unmock('./Header.jsx')
jest.unmock('../common/Alert.jsx')
jest.mock('../utils/date.js')

import InstitutionsHeader from '../../../src/filing/institutions/Header.jsx'
import { beforeFilingPeriod, afterFilingPeriod } from '../../../src/filing/utils/date.js'
import { isBeta } from '../../../src/common/Beta.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('InstitutionsHeader', () => {
  it('renders the header', () => {
    beforeFilingPeriod.mockImplementation(() => false)
    afterFilingPeriod.mockImplementation(() => false)
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader filingPeriod='2017' />
      </Wrapper>,
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(headerNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h2').length,
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h2')[0].textContent,
    ).toEqual('2017 filing period')
  })

  it('renders null without the filing period', () => {
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader />
      </Wrapper>,
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(headerNode).toBeNull()
  })

  it('renders an alert before the filing period', () => {
    beforeFilingPeriod.mockImplementation(() => true)
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader filingPeriod='2017' />
      </Wrapper>,
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3').length,
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3')[0].textContent,
    ).toEqual('The 2017 filing period is not yet open.')
  })

  it('renders an alert after the filing period', () => {
    beforeFilingPeriod.mockImplementation(() => false)
    afterFilingPeriod.mockImplementation(() => true)
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader filingPeriod='2017' />
      </Wrapper>,
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3').length,
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3')[0].textContent,
    ).toEqual('The 2017 filing period is closed.')
  })

  it('renders an alert in beta', () => {
    isBeta.mockImplementation(() => true)
    const header = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsHeader filingPeriod='2017' />
      </Wrapper>,
    )
    const headerNode = ReactDOM.findDOMNode(header)

    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3').length,
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(header, 'h3')[0].textContent,
    ).toEqual('HMDA Filing Beta')
  })
})
