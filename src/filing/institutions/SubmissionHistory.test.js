jest.unmock('./SubmissionHistory.jsx')

import InstitutionSubmissionHistory from './SubmissionHistory.jsx'
import * as STATUS from '../constants/statusCodes.js'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const filings = JSON.parse(
  fs.readFileSync('./test-resources/json/filings.json')
)
const submissions = filings.submissions

describe('InstitutionSubmissionHistory', () => {
  it('renders the previous submissions', () => {
    const previous = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionSubmissionHistory
          submissions={submissions}
          lei="123456"
        />
      </Wrapper>
    )
    const previousNode = ReactDOM.findDOMNode(previous)

    expect(previousNode).toBeDefined()

    const ol = TestUtils.findRenderedDOMComponentWithTag(previous, 'ol')
    expect(ol.children.length).toBe(5)
    const links = TestUtils.scryRenderedDOMComponentsWithTag(previous, 'a')
    expect(links.length).toBe(4)
  })
})
