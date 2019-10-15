jest.unmock('./Alert.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../test-resources/Wrapper.js'
import Alert from './Alert.jsx'

describe('Alert', function() {
  const message = TestUtils.renderIntoDocument(
    <Wrapper>
      <Alert>
        <p>this is some text</p>
      </Alert>
    </Wrapper>
  )
  const messageNode = ReactDOM.findDOMNode(message)

  it('renders the alert', () => {
    expect(messageNode).toBeDefined()
  })

  it('has the correct text', () => {
    expect(message.props.children.props.children.props.children).toEqual(
      'this is some text'
    )
  })

  it('has the correct default class', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(message, 'usa-alert-info')
        .length
    ).toEqual(1)
  })

  it('has no alert check', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(message, 'alert-check')
        .length
    ).toEqual(0)
  })

  const messageHeading = TestUtils.renderIntoDocument(
    <Wrapper>
      <Alert type="success" heading="this is a heading">
        <p>this is some text</p>
      </Alert>
    </Wrapper>
  )
  const messageHeadingNode = ReactDOM.findDOMNode(messageHeading)

  it('renders the alert', () => {
    expect(messageHeadingNode).toBeDefined()
  })

  it('has the correct heading', () => {
    expect(messageHeading.props.children.props.heading).toEqual(
      'this is a heading'
    )
  })

  it('has the success class', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        messageHeading,
        'usa-alert-success'
      ).length
    ).toEqual(1)
  })

  const messageHtml = TestUtils.renderIntoDocument(
    <Wrapper>
      <Alert type="success" heading="this is a heading">
        <div>this is some text</div>
      </Alert>
    </Wrapper>
  )

  it('has the success class', () => {
    expect(messageHtml.props.children.props.children.type).toBe('div')
  })

  it('renders null when no children exist', () => {
    const alert = Alert({})
    expect(alert).toBeNull()
  })

  it('sets alertClass when needed', () => {
    const alert = Alert({ children: [], type: 'error' })
    expect(alert.props.children[0].props.className).toBe(
      'AlertImage AlertImageClose'
    )
  })
})
