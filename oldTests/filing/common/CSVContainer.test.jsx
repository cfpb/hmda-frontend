jest.unmock('../../../src/filing/common/CSVContainer.jsx')

import React from 'react'
import TestUtils from 'react-dom/test-utils'
import CSV, {
  CSVContainer,
  mapStateToProps,
  mapDispatchToProps,
} from '../../../src/filing/common/CSVContainer.jsx'
import Wrapper from '../../test-resources/Wrapper.js'

console.error = jest.fn()

//ParseErrorsComponent.mockImplementation(() => null)
//fetchParseErrors.mockImplementation(() => parseFetch())
const submission = {
  id: { lei: '123', period: '2017', sequenceNumber: 2 },
}
const defaultState = {
  app: {
    submission,
  },
}

describe('CSVContainer', () => {
  it('renders the connected component', () => {
    const wrappedConnected = TestUtils.renderIntoDocument(
      <Wrapper store={defaultState}>
        <CSV />
      </Wrapper>,
    )

    expect(console.error).not.toBeCalled()
  })

  it('renders the unconnected component with passed in props', () => {
    const wrappedContainer = TestUtils.renderIntoDocument(
      <Wrapper>
        <CSVContainer submission={submission} onDownloadClick={jest.fn()} />
      </Wrapper>,
    )
    expect(console.error).not.toBeCalled()
  })

  it('maps state to props', () => {
    const mapped = mapStateToProps(defaultState, {})

    expect(Object.keys(mapped)).toEqual(['submission'])
    expect(mapped.submission).toBe(submission)

    const mappedWithPassedSubmission = mapStateToProps(defaultState, {
      submission: 'woah',
    })

    expect(mappedWithPassedSubmission.submission).toBe('woah')
  })

  it('maps dispatch to props', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch)
    expect(Object.keys(mapped)).toEqual(['onDownloadClick'])
  })

  it('wraps the correct functions in onDownloadClick', (done) => {
    const dispatch = jest.fn(() => Promise.resolve())
    const prev = jest.fn()
    const setState = jest.fn()
    const obj = { setState }
    const mapped = mapDispatchToProps(dispatch)
    const boundClick = mapped.onDownloadClick.bind(obj)
    const primedClick = boundClick(1, 2, 3)

    primedClick({ preventDefault: prev })
    expect(prev).toBeCalled()
    expect(setState.mock.calls.length).toBe(1)
    expect(dispatch).toBeCalled()
    setTimeout(() => {
      expect(setState.mock.calls.length).toBe(2)
      done()
    }, 0)
  })
})
