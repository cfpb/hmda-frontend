jest.unmock('./index.jsx')

import ModalConfirm, { _focusIfShowing } from './index.jsx'
import Wrapper from '../../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('Confirmation Modal', () => {
  const hideConfirmModal = jest.fn()
  const triggerRefile = jest.fn()

  const confirm = TestUtils.renderIntoDocument(
    <Wrapper>
      <ModalConfirm
        code={1}
        filingPeriod="2017"
        lei="1"
        showing={false}
        hideConfirmModal={hideConfirmModal}
        triggerRefile={triggerRefile}
      />
    </Wrapper>
  )
  const confirmNode = ReactDOM.findDOMNode(confirm)

  it('renders the modal', () => {
    expect(confirmNode).toBeDefined()
  })

  it('renders button when hidden', () => {
    const button = TestUtils.findRenderedDOMComponentWithTag(confirm, 'button')
    expect(button.length).not.toBeNull()
    expect(button.tabIndex).toBe(-1)
  })

  it('renders link when hidden', () => {
    const link = TestUtils.findRenderedDOMComponentWithTag(confirm, 'a')
    expect(link.length).not.toBeNull()
    expect(link.tabIndex).toBe(-1)
  })

  it('renders WITHOUT the showing-blurred-blocker class', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        confirm,
        'showing-blurred-blocker'
      ).length
    ).toEqual(0)
  })

  it('calls hideConfirmModal', () => {
    const yesButton = TestUtils.scryRenderedDOMComponentsWithTag(
      confirm,
      'button'
    )[0]

    TestUtils.Simulate.click(yesButton)
    expect(triggerRefile).toBeCalled()
  })

  it('calls hideConfirmModal', () => {
    const noLink = TestUtils.scryRenderedDOMComponentsWithTag(confirm, 'a')[0]

    TestUtils.Simulate.click(noLink)
    expect(hideConfirmModal).toBeCalled()
  })

  it('blurs button', () => {
    const yesButton = TestUtils.scryRenderedDOMComponentsWithTag(
      confirm,
      'button'
    )[0]
    const prev = jest.fn()
    TestUtils.Simulate.blur(yesButton, { preventDefault: prev })
    expect(prev).toHaveBeenCalled()
  })

  it('blurs link', () => {
    const noLink = TestUtils.scryRenderedDOMComponentsWithTag(confirm, 'a')[0]
    const prev = jest.fn()
    TestUtils.Simulate.blur(noLink, { preventDefault: prev })
    expect(prev).toHaveBeenCalled()
  })

  const confirmShowing = TestUtils.renderIntoDocument(
    <Wrapper>
      <ModalConfirm
        code={1}
        filingPeriod="2017"
        lei="1"
        showing={true}
        hideConfirmModal={hideConfirmModal}
        triggerRefile={triggerRefile}
      />
    </Wrapper>
  )

  it('focuses if showing', () => {
    const mockTimeout = jest.fn()
    delete global.setTimeout
    global.setTimeout = mockTimeout
    _focusIfShowing.call({ props: { showing: false } })
    expect(mockTimeout).not.toHaveBeenCalled()

    _focusIfShowing.call({ props: { showing: true } })
    expect(mockTimeout).toHaveBeenCalled()
  })

  it('renders WITH the showing-blurred-blocker class', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(
        confirmShowing,
        'showing-blurred-blocker'
      ).length
    ).toEqual(1)
  })

  it('renders showing button', () => {
    const button = TestUtils.findRenderedDOMComponentWithTag(
      confirmShowing,
      'button'
    )
    expect(button.length).not.toBeNull()
    expect(button.tabIndex).toBe(0)
  })

  it('renders showing link', () => {
    const link = TestUtils.findRenderedDOMComponentWithTag(confirmShowing, 'a')
    expect(link.length).not.toBeNull()
    expect(link.tabIndex).toBe(0)
  })
  const confirmBroken = TestUtils.renderIntoDocument(
    <Wrapper>
      <ModalConfirm
        lei="1"
        hideConfirmModal={hideConfirmModal}
        triggerRefile={triggerRefile}
      />
    </Wrapper>
  )

  it('with no code passed, renders WITHOUT the showing-blurred-blocker class', () => {
    expect(TestUtils.isElement(confirmBroken)).toBe(false)
  })
})
