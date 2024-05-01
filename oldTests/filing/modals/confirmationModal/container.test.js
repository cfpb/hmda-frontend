jest.unmock('./container.jsx')
jest.mock('react-router-dom')

import React from 'react'
import * as reactRouter from 'react-router-dom'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../../test-resources/Wrapper.js'
import Connected, {
  mapStateToProps,
  mapDispatchToProps,
} from '../../../../src/filing/modals/confirmationModal/container.jsx'

const replace = jest.fn()
reactRouter.browserHistory = {
  replace: replace,
}

const mockedState = {
  app: {
    confirmation: {
      showing: true,
    },
    lei: '123',
    filingPeriod: '2017',
    submission: {
      status: {
        code: 8,
      },
    },
    upload: {
      123: {
        file: {},
        newFile: {},
      },
    },
  },
}

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('ConfirmationModal Container', () => {
  it('maps state to props', () => {
    expect(mapStateToProps(mockedState)).toEqual({
      lei: '123',
      filingPeriod: '2017',
      code: 8,
      showing: true,
      newFile: {},
    })
  })

  it('maps dispatch appropriately', (done) => {
    const dispatch = jest.fn(() => Promise.resolve())
    const mapped = mapDispatchToProps(dispatch)

    expect(Object.keys(mapped)).toEqual(['hideConfirmModal', 'triggerRefile'])

    mapped.triggerRefile().then(() => {
      expect(replace).toBeCalled()
      done()
    })

    expect(dispatch.mock.calls.length).toBe(2)

    mapped.triggerRefile('a', 'b', 'upload', {})
    expect(dispatch.mock.calls.length).toBe(4)

    mapped.triggerRefile('a', 'b', 'upload', null)
    expect(dispatch.mock.calls.length).toBe(6)

    mapped.hideConfirmModal()
    expect(dispatch.mock.calls.length).toBe(7)
  })

  it('throws on bad state', () => {
    expect(() => {
      mapStateToProps()
    }).toThrow()
  })

  it('renders the connected component', () => {
    const err = console.error
    console.error = jest.fn()
    const connected = TestUtils.renderIntoDocument(
      <Wrapper store={mockedState}>
        <Connected />
      </Wrapper>,
    )

    expect(connected).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })
})
