jest.unmock('./index.jsx')

jest.mock('../../pagination/container.jsx')

import IRSReport from '../../../../src/filing/submission/irs/index.jsx'
import Wrapper from '../../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const irsJSON = JSON.parse(fs.readFileSync('./test-resources/json/irs.json'))
const id = {
  lei: 1,
  period: '2017',
  sequenceNumber: 1,
}

describe('IRS report', () => {
  const irsReport = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={false}
        id={id}
      />
    </Wrapper>,
  )
  const irsReportNode = ReactDOM.findDOMNode(irsReport)

  it('renders the irsReport', () => {
    expect(irsReportNode).toBeDefined()
  })

  it('creates the correct number of rows', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(irsReport, 'tr').length,
    ).toEqual(4)
  })

  const withTotals = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={true}
        id={id}
      />
    </Wrapper>,
  )

  it('creates the correct number of rows with totals', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(withTotals, 'tr').length,
    ).toEqual(5)
  })

  const irsLoading = TestUtils.renderIntoDocument(
    <Wrapper>
      <IRSReport
        msas={irsJSON.msas}
        summary={irsJSON.summary}
        renderTotals={false}
        id={id}
        isFetching={true}
      />
    </Wrapper>,
  )

  it('creates a loading icon when IRS is loading', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        irsLoading,
        'LoadingIconWrapper',
      ).length,
    ).toEqual(1)
  })
})
