jest.unmock('./index.jsx')
jest.unmock('./ValidationProgress.jsx')
jest.unmock('../../common/Alert.jsx')

import UploadForm from '../../../../src/filing/submission/upload/index.jsx'
import ValidationProgress from '../../../../src/filing/submission/upload/ValidationProgress.jsx'
import Alert from '../../common/Alert.jsx'
import Wrapper from '../../../test-resources/Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

const localGet = jest.fn(() => 0)
const localSet = jest.fn()

window.localStorage = {
  getItem: localGet,
  setItem: localSet,
}

describe('submitform', function () {
  const setFile = jest.fn()
  const pollSubmission = jest.fn()
  const poll2 = jest.fn()

  // use ReactDOM.render instead to be able to test componentDidUpdate
  const node = document.createElement('div')
  const form = ReactDOM.render(
    <Wrapper>
      <UploadForm
        pollSubmission={pollSubmission}
        setFile={setFile}
        uploading={true}
        file={{ size: 108 }}
        code={5}
        filingPeriod='2017'
        errors={['this is an error', 'and another']}
      />
    </Wrapper>,
    node,
  )
  const formNode = ReactDOM.findDOMNode(form)

  it('renders the form', function () {
    expect(formNode).toBeDefined()
  })

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0]
    expect(input.value).toEqual('')
  })

  it('does not call the poll when code is PARSED WITH ERRORS', () => {
    expect(pollSubmission).not.toBeCalled()
  })

  const n2 = document.createElement('div')
  const form2 = ReactDOM.render(
    <Wrapper>
      <UploadForm
        pollSubmission={poll2}
        code={1}
        setFile={setFile}
        uploading={true}
        file={{ size: 200 }}
        errors={[]}
      />
    </Wrapper>,
    n2,
  )
  const form2Node = ReactDOM.findDOMNode(form2)

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form2, 'input')[0]
    expect(input.value).toEqual('')
  })

  it('does not call the poll', () => {
    expect(poll2).not.toBeCalled()
  })

  it('renders the alert with errors', () => {
    const rendered = TestUtils.renderIntoDocument(
      <Wrapper>
        <UploadForm
          pollSubmission={poll2}
          code={1}
          setFile={setFile}
          uploading={true}
          file={{ size: 200 }}
          errors={['error']}
        />
      </Wrapper>,
    )

    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'usa-alert')
        .length,
    ).toBe(1)
  })
})

/*describe('renderErrors', () => {
  const getClass = component => component.props.className

  it('renders errors', () => {
    const rendered = renderErrors(['this is an error'])
    expect(!!getClass(rendered).match('usa-alert usa-alert-error')).toBe(true)
  })

  it("doesn't renders errors", () => {
    expect(renderErrors([])).toBe(null)
  })
})

describe('getDropZoneText', () => {
  const props = {
    code: 0,
    errors: [],
    filename: ''
  }

  it('renders initially', () => {
    const rendered = getDropzoneText({
      code: 0,
      errors: [],
      filename: ''
    })
    //console.log(rendered.props.children.props.children)
    expect(rendered.props.children.props.children).toBe(
      'To begin uploading a file, drag it into this box or click here.'
    )
  })

  it('renders while uploading', () => {
    const rendered = getDropzoneText({
      code: 1,
      errors: [],
      filename: ''
    })
    expect(rendered.props.children.props.children).toBe(
      'To begin uploading a new file, drag it into this box or click here.'
    )
  })

  it('renders after uploaded', () => {
    const rendered = getDropzoneText({
      code: 2,
      errors: [],
      filename: 'filename.txt'
    })
    expect(rendered.props.children.props.children.length).toBe(2)
    expect(rendered.props.children.props.children[1].props.children[4]).toBe(
      'is currently in progress.'
    )
  })

  it('renders with formatting errors', () => {
    const rendered = getDropzoneText({
      code: 5,
      errors: [],
      filename: 'filename.txt'
    })
    expect(rendered.props.children.props.children.length).toBe(2)
    expect(rendered.props.children.props.children[1].props.children[4]).toBe(
      'has formatting errors.'
    )
  })

  it('renders with validation errors', () => {
    const rendered = getDropzoneText({
      code: 8,
      errors: [],
      filename: 'filename.txt'
    })
    expect(rendered.props.children.props.children.length).toBe(2)
    expect(rendered.props.children.props.children[1].props.children[4]).toBe(
      'is ready for review.'
    )
  })

  it('renders validated', () => {
    const rendered = getDropzoneText({
      code: 9,
      errors: [],
      filename: 'filename.txt'
    })
    expect(rendered.props.children.props.children.length).toBe(2)
    expect(rendered.props.children.props.children[1].props.children[4]).toBe(
      'is ready for submission.'
    )
  })

  it('renders signed', () => {
    const rendered = getDropzoneText({
      code: 10,
      errors: [],
      filename: 'filename.txt'
    })
    expect(rendered.props.children.props.children.length).toBe(2)
    expect(rendered.props.children.props.children[1].props.children[4]).toBe(
      'is complete.'
    )
  })

  it('renders signed WITHOUT a filename', () => {
    const rendered = getDropzoneText({
      code: 10,
      errors: [],
      filename: ''
    })
    expect(rendered.props.children).toBe(
      'To begin uploading a new file, drag it into this box or click here.'
    )
  })

  it('renders errors', () => {
    const rendered = getDropzoneText({
      code: 10,
      errors: ['an error'],
      filename: 'filename.txt',
      errorFile: 'afile'
    })
    expect(rendered.props.children.props.children.length).toBe(2)
    expect(rendered.props.children.props.children[1].props.children[4]).toBe(
      'cannot be uploaded.'
    )
  })
})

describe('renderValidationProgress', () => {
  it('renders validation progress', () => {
    const rendered = renderValidationProgress({ code: 2 })
    expect(TestUtils.isElement(rendered)).toBe(true)
  })

  it("doesn't renders validation progress", () => {
    expect(renderValidationProgress({ code: 1 })).toBe(null)
  })
})*/
