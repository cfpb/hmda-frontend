jest.unmock('./CSVDownload.jsx')

import CSVDownload, { formatPeriod } from './CSVDownload.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const submission = {
  id: { lei: '123', period: '2017', sequenceNumber: 2 }
}
describe('CSVDownload', () => {
  const csvDownload = TestUtils.renderIntoDocument(
    <Wrapper>
      <CSVDownload onDownloadClick={jest.fn()} submission={submission} />
    </Wrapper>
  )
  const csvDownloadNode = ReactDOM.findDOMNode(csvDownload)

  it('renders the csvDownload', () => {
    expect(csvDownloadNode).toBeDefined()
  })

  it('does not render a loading icon if not fetching', () => {
    const odc = jest.fn()
    const rendered = CSVDownload({ submission, onDownloadClick: odc })
    expect(odc).toBeCalled()
    expect(rendered.props.children[1]).toBe(null)
  })

  it('renders loading icon if fetching', () => {
    const odc = jest.fn()
    const rendered = CSVDownload({
      submission,
      onDownloadClick: odc,
      isFetching: true
    })
    expect(odc).toBeCalled()
    expect(rendered.props.children[1].type.name).toBe('LoadingIcon')
  })
  it('renders null when id is null', () => {
    expect(CSVDownload({ submission: { id: null } })).toBe(null)
  })

  it('renders supplied text', () => {
    const odc = jest.fn()
    const rendered = CSVDownload({
      submission,
      onDownloadClick: odc,
      text: 'yo'
    })
    expect(odc).toBeCalled()
    expect(rendered.props.children[0].props.children).toBe('yo')
  })
})

describe('formatPeriod', () => {
  it('handles strings', () => {
    expect(formatPeriod('2018')).toBe('2018')
  })

  it('handles quarterly without quarter', () => {
    expect(formatPeriod({quarter: null, year: 2018})).toBe('2018')
  })

  it('handles quarterly with quarter', () => {
    expect(formatPeriod({quarter: 'q1', year: 2018})).toBe('2018/quarter/Q1')
  })
})
