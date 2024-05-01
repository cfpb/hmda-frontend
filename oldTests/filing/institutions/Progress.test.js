jest.unmock('./Progress.jsx')

import InstitutionsEditsNav from '../../../src/filing/institutions/Progress.jsx'
import Wrapper from '../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('InstitutionsEditsNav', () => {
  it('renders without an upload', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 1 }} />
      </Wrapper>,
    )
    const renderedNode = ReactDOM.findDOMNode(rendered)
    expect(renderedNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
  })

  it('renders while uploading', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 2 }} />
      </Wrapper>,
    )
    const renderedNode = ReactDOM.findDOMNode(rendered)
    expect(renderedNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(0)
  })

  it('renders when uploaded', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 3 }} />
      </Wrapper>,
    )
    const renderedNode = ReactDOM.findDOMNode(rendered)
    expect(renderedNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(0)
  })

  it('renders while checking format', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 4 }} />
      </Wrapper>,
    )
    const renderedNode = ReactDOM.findDOMNode(rendered)
    expect(renderedNode).toBeDefined()
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(0)
  })

  it('renders when parsed with errors', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 5 }} />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(0)
  })

  it('renders when data is formatted correctly', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 6 }} />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(1)
  })

  it('renders when being analyzed for edits', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 7 }} />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(1)
  })

  it('renders when it has edits', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 8 }} />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(3)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(1)
  })

  it('renders when it has NO edits', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 9 }} />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(1)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(4)
  })

  it('renders when it is signed', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <InstitutionsEditsNav status={{ code: 10 }} />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li').length,
    ).toBe(5)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'error').length,
    ).toBe(0)
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'complete').length,
    ).toBe(5)
  })
})
