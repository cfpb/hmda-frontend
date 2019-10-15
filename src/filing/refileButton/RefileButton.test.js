jest.unmock('./index.jsx')

import RefileButton from './index.jsx'
import React from 'react'
import TestUtils from 'react-dom/test-utils'

describe('RefileButton', () => {
  it('renders with provided props', () => {
    const showConfirmModal = jest.fn()
    const updateInstitution = jest.fn()
    const rendered = RefileButton({
      showConfirmModal: showConfirmModal,
      updateInstitution: updateInstitution,
      institution: { id: '1', name: 'bank0' }
    })

    expect(rendered).toBeDefined()
    expect(rendered.props.className).not.toBe('')
    rendered.props.onClick({ preventDefault: jest.fn() })
    expect(showConfirmModal).toBeCalled()
    //expect(updateInstitution).toBeCalled()
    expect(showConfirmModal.mock.calls[0][0]).toBe(undefined)
  })

  it('should update the institution', () => {
    const showConfirmModal = jest.fn()
    const updateInstitution = jest.fn()
    const rendered = RefileButton({
      showConfirmModal: showConfirmModal,
      updateInstitution: updateInstitution,
      institution: { id: '1', name: 'bank0' }
    })

    rendered.props.onClick({ preventDefault: jest.fn() })
    expect(updateInstitution).toBeCalled()
  })

  it('should NOT update the institution', () => {
    const showConfirmModal = jest.fn()
    const updateInstitution = jest.fn()
    const rendered = RefileButton({
      showConfirmModal: showConfirmModal,
      updateInstitution: updateInstitution
    })

    rendered.props.onClick({ preventDefault: jest.fn() })
    expect(updateInstitution).not.toBeCalled()
  })

  it('can be overrided as a link', () => {
    const showConfirmModal = jest.fn()
    const rendered = RefileButton({
      showConfirmModal: showConfirmModal,
      isLink: true
    })

    expect(rendered).toBeDefined()
    expect(rendered.props.className).toBe('')
  })

  it('fails to render without provided props', () => {
    console.error = jest.fn()
    const errored = TestUtils.renderIntoDocument(<RefileButton />)
    expect(console.error).toHaveBeenCalledTimes(2)
  })
})
