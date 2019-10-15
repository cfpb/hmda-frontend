jest.unmock('./ProgressText.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import ProgressText from './ProgressText.jsx'
import * as STATUS from '../../constants/statusCodes.js'
import Wrapper from '../../../test-resources/Wrapper.js'

describe('ProgressText', function() {
  const rendered = TestUtils.renderIntoDocument(
    <Wrapper>
      <ProgressText />
    </Wrapper>
  )

  const renderedNode = ReactDOM.findDOMNode(rendered)

  it('renders', () => {
    expect(renderedNode).toBeDefined()
  })
})

describe('renders with progress text codes', function() {
  const renderByCode = STATUS => {
    for (var key in STATUS) {
      let rendered = ProgressText({
        code: STATUS[key],
        file: { size: 1e5 }
      })
      //console.log(rendered.props.children[0].props.children)

      if (STATUS[key] < STATUS.PARSING) {
        expect(rendered.props.children[0].props.children[0]).toBe(
          'Uploading...'
        )
      }

      if (STATUS[key] === STATUS.PARSED_WITH_ERRORS) {
        expect(rendered.props.children[0].props.children[0]).toBe(
          'File contains formatting errors.'
        )
      }

      if (STATUS[key] === STATUS.PARSED) {
        expect(rendered.props.children[0].props.children[0]).toBe(
          'Analyzing file format...'
        )
      }

      if (STATUS[key] === STATUS.VALIDATING) {
        expect(rendered.props.children[0].props.children[0]).toBe(
          'Validating edits...'
        )
      }

      if (STATUS[key] > STATUS.VALIDATING) {
        expect(rendered.props.children[0].props.children[0]).toBe(
          'Edit validation complete.'
        )
      }
    }
  }

  renderByCode(STATUS)
})

describe('renders progress text with upload error', function() {
  let rendered = ProgressText({
    code: STATUS.VALIDATED_WITH_ERRORS,
    file: { size: 1e5 },
    errorUpload: { test: 'test' }
  })

  expect(rendered.props.children[0].props.children[0]).toBe(
    'There was an error uploading your file. Please try again.'
  )
})

describe('renders progress text with application error', function() {
  let rendered = ProgressText({
    code: STATUS.VALIDATED_WITH_ERRORS,
    file: { size: 1e5 },
    errorApp: { test: 'test' }
  })

  expect(rendered.props.children[0].props.children[0]).toBe(
    'There was an error checking your validation progress. Please refresh the page.'
  )
})

describe('renders extra message with large file', function() {
  let rendered = ProgressText({
    code: STATUS.UPLOADED,
    file: { size: 1e6 }
  })
  expect(rendered.props.children[1].props.children.props.children).toBe(
    'Please do not close your browser until the file upload has completed.'
  )

  rendered = ProgressText({
    code: STATUS.PARSING,
    file: { size: 1e6 }
  })

  expect(rendered.props.children[1].props.children.props.children).toBe(
    'Your file has been successfully uploaded and is being analyzed and validated. You may close your browser and log back in later.'
  )

  rendered = ProgressText({
    code: STATUS.VALIDATED_WITH_ERRORS,
    file: { size: 1e6 }
  })

  expect(rendered.props.children[1].props.children.props.children).toBe(
    'Edits found, review required.'
  )
})
