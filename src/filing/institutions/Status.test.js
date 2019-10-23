jest.unmock('./Status.jsx')
jest.mock('../common/CSVContainer.jsx')

import InstitutionStatus from './Status.jsx'
import * as STATUS from '../constants/statusCodes.js'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('InstitutionStatus', () => {
  it('renders the status', () => {
    const filing = {
      status: {
        code: 1
      },
      period: '2017'
    }

    const submission = {
      status: {
        code: STATUS.CREATED,
        message: 'not started',
        description:
          'You may begin your filing process by selecting the "Begin Filing" button below.'
      }
    }

    const status = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionStatus filing={filing} submission={submission} />
      </Wrapper>
    )
    const statusNode = ReactDOM.findDOMNode(status)

    expect(statusNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(status, 'h4').length
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(status, 'h4')[0].textContent
    ).toEqual('not started')
  })

  it('renders the previous submission message', () => {
    const filing = {
      status: {
        code: 3
      },
      period: '2017'
    }

    const submission = {
      status: {
        code: STATUS.VALIDATED,
        message: 'not started',
        description:
          'You may begin your filing process by selecting the "Begin Filing" button below.'
      }
    }

    const status = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionStatus filing={filing} submission={submission} />
      </Wrapper>
    )

    const paras = TestUtils.scryRenderedDOMComponentsWithClass(
      status,
      'usa-text-small'
    )
    expect(paras.length).toBe(2)
    expect(paras[0].textContent).toBe(
      'You have previously submitted a HMDA file and are in the process of refiling. If you do not complete your current refiling process, your original submission will be accepted for the current filing period.'
    )
  })
})
