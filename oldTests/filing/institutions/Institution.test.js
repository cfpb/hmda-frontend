jest.unmock('./Institution.jsx')

jest.mock('./NameAndId.jsx', () => jest.fn(() => null))
jest.mock('./Status.jsx', () => jest.fn(() => null))
jest.mock('./ViewButton.jsx', () => jest.fn(() => null))
jest.mock('./Refile.jsx', () => jest.fn(() => null))
jest.mock('./SubmissionHistory.jsx', () => jest.fn(() => null))

import Institution from '../../../src/filing/institutions/Institution.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const filings = JSON.parse(
  fs.readFileSync('./test-resources/json/filings.json'),
)
const filing = filings.filing
const submissions = filings.submissions
const submission = submissions[0]

const institutions = JSON.parse(
  fs.readFileSync('./test-resources/json/institutions.json'),
)
const singleFI = institutions.institutions[0]

describe('Institution', () => {
  it('renders the previous submissions', () => {
    const fi = TestUtils.renderIntoDocument(
      <Wrapper>
        <Institution
          institution={singleFI}
          filing={filing}
          submissions={submissions}
          filingPeriod='2017'
        />
      </Wrapper>,
    )
    const fiNode = ReactDOM.findDOMNode(fi)

    expect(fiNode).toBeDefined()

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(fi, 'institution').length,
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(fi, 'current-status').length,
    ).toBe(1)
  })
})
