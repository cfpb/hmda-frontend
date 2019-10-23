jest.unmock('./index.jsx')

import Signature from './index.jsx'
import Wrapper from '../../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const fs = require('fs')
const signJSON = JSON.parse(
  fs.readFileSync('./test-resources/json/receipt.json')
)
const status = {
  code: 9,
  message: ''
}

describe('Signature component', () => {
  const onSignatureClick = jest.fn()
  const onSignatureCheck = jest.fn()
  const signature = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature
        checked={false}
        status={status}
        onSignatureClick={onSignatureClick}
        onSignatureCheck={onSignatureCheck}
      />
    </Wrapper>
  )
  const signatureNode = ReactDOM.findDOMNode(signature)

  it('renders the signature component', () => {
    expect(signatureNode).toBeDefined()
  })

  it('contains the checkbox input', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(signature, 'input').length
    ).toEqual(1)
  })

  it('contains the submit button', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(signature, 'button').length
    ).toEqual(1)
  })

  it('has button disabled', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        signature,
        'usa-button-disabled'
      ).length
    ).toEqual(1)
  })

  it('calls the function on change', () => {
    var checkbox = TestUtils.findRenderedDOMComponentWithTag(signature, 'input')
    expect(checkbox.checked).toBeFalsy()

    TestUtils.Simulate.change(checkbox, {
      target: {
        checked: true
      }
    })

    expect(onSignatureCheck).toBeCalled()
  })

  // button enabled
  const buttonEnabled = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature
        checked={true}
        status={status}
        onSignatureClick={onSignatureClick}
        onSignatureCheck={onSignatureCheck}
      />
    </Wrapper>
  )
  const buttonEnabledNode = ReactDOM.findDOMNode(buttonEnabled)

  it('has button enabled', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        buttonEnabled,
        'usa-button-disabled'
      ).length
    ).toEqual(0)
  })

  it('calls the function on click', () => {
    var button = TestUtils.findRenderedDOMComponentWithTag(
      buttonEnabled,
      'button'
    )

    TestUtils.Simulate.click(button)

    expect(onSignatureClick).toBeCalled()
  })

  // checkbox checked and status is signed
  const statusSigned = {
    code: 10,
    message: ''
  }
  const signatureSigned = TestUtils.renderIntoDocument(
    <Wrapper>
      <Signature
        checked={true}
        status={statusSigned}
        onSignatureClick={onSignatureClick}
        onSignatureCheck={onSignatureCheck}
      />
    </Wrapper>
  )
  const signatureSignedNode = ReactDOM.findDOMNode(signatureSigned)

  it('has the checkbox checked', () => {
    const checkboxChecked = TestUtils.findRenderedDOMComponentWithTag(
      signatureSigned,
      'input'
    )
    expect(checkboxChecked.checked).toBeTruthy()
  })

  it('has the checkbox disabled', () => {
    const checkboxDisabled = TestUtils.findRenderedDOMComponentWithTag(
      signatureSigned,
      'input'
    )
    expect(checkboxDisabled.disabled).toBeTruthy()
  })

  it('has the button disabled', () => {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        signatureSigned,
        'usa-button-disabled'
      )
    ).toBeTruthy()
  })
})
