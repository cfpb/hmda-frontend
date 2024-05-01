jest.unmock('./Receipt.jsx')
jest.unmock('../common/Alert.jsx')

import Receipt from '../../../src/filing/submission/Receipt.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const signJSON = JSON.parse(
  fs.readFileSync('./test-resources/json/receipt.json'),
)
const status = {
  code: 10,
  message: '',
}

describe('Receipt component', () => {
  const receipt = TestUtils.renderIntoDocument(
    <Wrapper>
      <Receipt
        receipt={signJSON.receipt}
        timestamp={signJSON.timestamp}
        status={status}
        email='yo@me.com'
        filingPeriod='2017'
      />
    </Wrapper>,
  )

  it('renders the receipt and timestamp', () => {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(receipt, 'usa-alert-success'),
    ).toBeTruthy()
  })

  it('has the correct filingPeriod', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(
        receipt,
        'div',
      )[0].textContent.match('2017'),
    ).toBeTruthy()
  })

  it('has the correct receipt', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(
        receipt,
        'strong',
      )[1].textContent.match('fee-fi-fo-fum'),
    ).toBeTruthy()
  })

  const unsigned = TestUtils.renderIntoDocument(
    <Wrapper>
      <Receipt
        receipt={signJSON.receipt}
        timestamp={signJSON.timestamp}
        status={{ code: 9, message: '' }}
        email='yo@me.com'
        filingPeriod='2017'
      />
    </Wrapper>,
  )

  it('does not render when not signed', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(unsigned, 'p').length,
    ).toBe(0)
  })
})
