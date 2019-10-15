jest.unmock('./Verifier.jsx')

import Verifier from './Verifier.jsx'
import Wrapper from '../../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('Verifier component', () => {
  const onVerify = jest.fn()
  const verifier = TestUtils.renderIntoDocument(
    <Wrapper>
      <Verifier
        verified={true}
        onVerify={onVerify}
        type="macro"
        code={1}
        isFetching={false}
        noEditsExist={false}
      />
    </Wrapper>
  )
  const verifierNode = ReactDOM.findDOMNode(verifier)

  it('renders the component', () => {
    expect(verifierNode).toBeDefined()
  })

  it('contains the checkbox input', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(verifier, 'input').length
    ).toEqual(1)
  })

  expect(
    TestUtils.scryRenderedDOMComponentsWithClass(verifier, 'usa-alert').length
  ).toEqual(1)

  expect(
    TestUtils.scryRenderedDOMComponentsWithTag(verifier, 'h2')[0].textContent
  ).toEqual('Verify macro edits')

  it('calls the function on change', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(verifier, 'input')
    expect(checkbox.checked).toBeTruthy()

    TestUtils.Simulate.change(checkbox, {
      target: {
        checked: false
      }
    })

    expect(onVerify).toBeCalled()
  })

  it('does not render the verification message when unchecked', () => {
    const verifier = TestUtils.renderIntoDocument(
      <Wrapper>
        <Verifier
          verified={false}
          onVerify={onVerify}
          type="quality"
          isFetching={false}
          code={1}
        />
      </Wrapper>
    )
    const verifierNode = ReactDOM.findDOMNode(verifier)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(verifier, 'usa-alert').length
    ).toEqual(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(verifier, 'h2')[0].textContent
    ).toEqual('Verify quality edits')
  })

  it('renders as disabled after signature', () => {
    const verifier = TestUtils.renderIntoDocument(
      <Wrapper>
        <Verifier
          verified={false}
          onVerify={onVerify}
          type="quality"
          isFetching={false}
          code={10}
        />
      </Wrapper>
    )

    const input = TestUtils.findRenderedDOMComponentWithTag(verifier, 'input')
    expect(ReactDOM.findDOMNode(input).hasAttribute('disabled')).toBe(true)
  })

  it('renders the no verification message without edits', () => {
    const verifier = TestUtils.renderIntoDocument(
      <Wrapper>
        <Verifier
          verified={false}
          onVerify={onVerify}
          type="quality"
          code={10}
          isFetching={false}
          noEditsExist={true}
        />
      </Wrapper>
    )

    const input = TestUtils.scryRenderedDOMComponentsWithTag(verifier, 'input')
    expect(input.length).toBe(0)
    expect(verifier.props.children.key).toBe(null)
  })
})
