jest.unmock('./DropzoneContent.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import DropzoneContent from './DropzoneContent.jsx'
import * as STATUS from '../../constants/statusCodes.js'
import Wrapper from '../../../test-resources/Wrapper.js'

describe('DropzoneContent', function() {
  const rendered = TestUtils.renderIntoDocument(
    <Wrapper>
      <DropzoneContent />
    </Wrapper>
  )

  const renderedNode = ReactDOM.findDOMNode(rendered)

  it('renders', () => {
    expect(renderedNode).toBeDefined()
  })
})

describe('renders with codes', function() {
  const renderByCode = STATUS => {
    for (var key in STATUS) {
      let rendered = DropzoneContent({
        code: STATUS[key],
        filename: 'textfile.txt'
      })

      if (STATUS[key] === STATUS.CREATED) {
        expect(rendered.props.children[1].props.children[0]).toBe('')
        expect(rendered.props.children[1].props.children[4]).toBe('selected')
      }

      if (
        STATUS[key] >= STATUS.UPLOADING &&
        STATUS[key] <= STATUS.VALIDATING &&
        STATUS[key] !== STATUS.PARSED_WITH_ERRORS
      ) {
        expect(rendered.props.children[1].props.children[0]).toBe('Upload of')
        expect(rendered.props.children[1].props.children[4]).toBe(
          'is currently in progress'
        )
      }

      if (STATUS[key] === STATUS.PARSED_WITH_ERRORS) {
        expect(rendered.props.children[1].props.children[0]).toBe('Upload of')
        expect(rendered.props.children[1].props.children[4]).toBe(
          'has formatting errors'
        )
      }

      if (STATUS[key] === STATUS.VALIDATED_WITH_ERRORS) {
        expect(rendered.props.children[1].props.children[0]).toBe('Upload of')
        expect(rendered.props.children[1].props.children[4]).toBe(
          'is ready for review'
        )
      }

      if (STATUS[key] === STATUS.VALIDATED) {
        expect(rendered.props.children[1].props.children[0]).toBe('Upload of')
        expect(rendered.props.children[1].props.children[4]).toBe(
          'is ready for submission'
        )
      }

      if (STATUS[key] === STATUS.SIGNED) {
        expect(rendered.props.children[1].props.children[0]).toBe('Upload of')
        expect(rendered.props.children[1].props.children[4]).toBe('is complete')
      }
    }
  }

  renderByCode(STATUS)
})
