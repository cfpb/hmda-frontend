jest.unmock('./Header.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../../test-resources/Wrapper.js'
import EditsHeaderDescription, { getText } from './Header.jsx'

describe('EditsHeaderDescription', function() {
  const header = TestUtils.renderIntoDocument(
    <Wrapper>
      <EditsHeaderDescription type="syntacticalvalidity" count={1} />
    </Wrapper>
  )
  const headerNode = ReactDOM.findDOMNode(header)

  it('renders the header', function() {
    expect(headerNode).toBeDefined()
  })

  it('sets the prop appropriately', function() {
    expect(header.props.children.props.type).toEqual('syntacticalvalidity')
    expect(header.props.children.props.count).toEqual(1)
  })

  it('renders a loading icon if not fetched', () => {
    expect(
      EditsHeaderDescription({ type: 'quality', count: 4, fetched: false })
        .props.children[0].props.children[2].type.name
    ).toBe('LoadingIcon')
  })

  it('renders no loading icon if fetched', () => {
    expect(
      EditsHeaderDescription({ type: 'quality', count: 4, fetched: true }).props
        .children[0].props.children[2]
    ).toBe(null)
  })

  it('suppresses count', () => {
    expect(
      EditsHeaderDescription({
        type: 'quality',
        count: 4,
        fetched: false,
        suppressCount: true
      }).props.children[0].props.children[1]
    ).toBe('')
  })
})

const syntacticalValidity = {
  id: 'syntacticalvalidity',
  title: 'Syntactical and validity edits',
  desc:
    'Syntactical edits check whether the LAR is formatted correctly and the data is from the correct filing year. Validity edits check whether there are valid values in each data field. Your LAR cannot be submitted until syntactical and validity edits are corrected in your file and the corrected file is uploaded.'
}

const quality = {
  id: 'quality',
  title: 'Quality edits',
  desc:
    'Quality edits check if data fields do not conform to expected values. Your LAR cannot be submitted until you either confirm the accuracy of all the values flagged by the quality edits in the HMDA Platform, or correct the flagged values and upload the updated LAR to the HMDA Platform.'
}

const macro = {
  id: 'macro',
  title: 'Macro edits',
  desc:
    'Macro quality edits check whether the submitted LAR as a whole conforms to expected values. Your LAR cannot be submitted until you either confirm the accuracy of all the values flagged by the macro quality edits in the HMDA Platform, or correct the flagged values and upload the updated LAR to the HMDA Platform.'
}

describe('getText', () => {
  it('throws error if bad type', () => {
    try {
      getText('thisIsNotAType')
    } catch (err) {
      expect(err.message).toEqual(
        'Unexpected edit type. Unable to create edit description.'
      )
    }
  })

  it('throws error if missing type', () => {
    try {
      getText('')
    } catch (err) {
      expect(err.message).toEqual(
        'Missing edit type. Unable to create edit description.'
      )
    }
  })

  it('returns syntacticalValidity', () => {
    const returned = getText('syntacticalvalidity')
    expect(returned).toEqual(syntacticalValidity)
  })

  it('returns quality', () => {
    const returned = getText('quality')
    expect(returned).toEqual(quality)
  })

  it('returns macro', () => {
    const returned = getText('macro')
    expect(returned).toEqual(macro)
  })
})
