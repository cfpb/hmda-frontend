jest.unmock('../../../src/filing/common/CSVDownload.jsx')

import CSVDownload from '../../../src/filing/common/CSVDownload.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import TestUtils from 'react-dom/test-utils'

const submission = {
  id: { lei: '123', period: '2017', sequenceNumber: 2 },
}

describe('CSVDownload', () => {
  let csvDownloadRef

  const csvDownload = TestUtils.renderIntoDocument(
    <Wrapper>
      <CSVDownload
        ref={(ref) => (csvDownloadRef = ref)}
        onDownloadClick={jest.fn()}
        submission={submission}
      />
    </Wrapper>,
  )

  it('renders the csvDownload', () => {
    expect(csvDownloadRef).toBeDefined()
  })

  it('does not render a loading icon if not fetching', () => {
    const odc = jest.fn()
    const rendered = CSVDownload({ submission, onDownloadClick: odc }, null)
    expect(odc).toBeCalled()
    expect(rendered.props.children[1]).toBe(null)
  })

  it('renders loading icon if fetching', () => {
    const odc = jest.fn()
    const rendered = CSVDownload(
      {
        submission,
        onDownloadClick: odc,
        isFetching: true,
      },
      null,
    )
    expect(odc).toBeCalled()
    expect(rendered.props.children[1].type.name).toBe('LoadingIcon')
  })

  it('renders null when id is null', () => {
    expect(CSVDownload({ submission: { id: null } }, null)).toBe(null)
  })

  it('renders supplied text', () => {
    const odc = jest.fn()
    const rendered = CSVDownload(
      {
        submission,
        onDownloadClick: odc,
        text: 'yo',
      },
      null,
    )
    expect(odc).toBeCalled()
    expect(rendered.props.children[0].props.children).toBe('yo')
  })
})
