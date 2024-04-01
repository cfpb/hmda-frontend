jest.unmock('./ViewButton.jsx')

import InstitutionViewButton from '../../../src/filing/institutions/ViewButton.jsx'
import * as STATUS from '../../../src/filing/constants/statusCodes.js'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

window.HMDA_ENV = { APP_SUFFIX: '/filing/', HOMEPAGE_URL: 'home' }

describe('InstitutionViewButton', () => {
  it('renders the view button', () => {
    const viewButton = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionViewButton
          status={{
            code: STATUS.CREATED,
          }}
          lei='123456'
          filingPeriod='2017'
        />
      </Wrapper>,
    )
    const viewButtonNode = ReactDOM.findDOMNode(viewButton)

    expect(viewButtonNode).toBeDefined()

    expect(
      TestUtils.findRenderedDOMComponentWithClass(viewButton, 'status-button')
        .textContent,
    ).toBe('Upload your file')
  })

  it('renders correctly when status is FAILED', () => {
    const button = InstitutionViewButton({
      status: { code: -1 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('Upload your file')
  })

  it('renders correctly when status is UNINITIALIZED', () => {
    const button = InstitutionViewButton({
      status: { code: 0 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('Upload your file')
  })

  it('renders correctly when status is CREATED', () => {
    const button = InstitutionViewButton({
      status: { code: 1 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('Upload your file')
  })

  it('renders correctly when status is UPLOADING', () => {
    const button = InstitutionViewButton({
      status: { code: 2 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('View upload progress')
  })

  it('renders correctly when status is UPLOADED', () => {
    const button = InstitutionViewButton({
      status: { code: 3 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('View upload progress')
  })

  it('renders correctly when status is PARSING', () => {
    const button = InstitutionViewButton({
      status: { code: 4 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('View upload progress')
  })

  it('renders correctly when status is PARSED_WITH_ERRORS', () => {
    const button = InstitutionViewButton({
      status: { code: 5 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('Review formatting errors')
  })

  it('renders correctly when status is PARSED', () => {
    const button = InstitutionViewButton({
      status: { code: 6 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('View progress')
  })

  it('renders correctly when status is VALIDATING', () => {
    const button = InstitutionViewButton({
      status: { code: 7 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('View progress')
  })

  it('renders correctly when status is VALIDATED_WITH_ERRORS', () => {
    const button = InstitutionViewButton({
      status: { code: 8 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('Review edits')
  })

  it('renders correctly when status is VALIDATED', () => {
    const button = InstitutionViewButton({
      status: { code: 9 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('Review summary')
  })

  it('renders correctly when status is SIGNED', () => {
    const button = InstitutionViewButton({
      status: { code: 10 },
      lei: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('View completed filing')
  })

  it('renders correctly when no status is provided', () => {
    const button = InstitutionViewButton({
      status: null,
      instituionId: 'a',
      filingPeriod: 'b',
    })
    expect(button.props.children).toBe('Upload your file')
  })
})
