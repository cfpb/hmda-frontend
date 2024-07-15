jest.unmock('../../src/js/components/UploadForm.jsx')

import UploadForm, {
  renderErrors,
} from '../../src/js/components/UploadForm.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('submitform', function () {
  const handleSubmit = jest.fn()
  const setFile = jest.fn()
  let formRef

  // use ReactDOM.render instead to be able to test componentDidUpdate
  const node = document.createElement('div')
  ReactDOM.render(
    <Wrapper>
      <UploadForm
        ref={(ref) => (formRef = ref)}
        handleSubmit={handleSubmit}
        setFile={setFile}
        uploading={true}
        file={{ size: 108 }}
        code={5}
        filingPeriod={2018}
        errors={['this is an error', 'and another']}
      />
    </Wrapper>,
    node,
  )

  it('renders the form', function () {
    expect(formRef).toBeDefined()
  })

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(
      formRef,
      'input',
    )[0]
    expect(input.value).toEqual('')
  })

  it('submits the form', function () {
    TestUtils.Simulate.submit(
      TestUtils.findRenderedDOMComponentWithTag(formRef, 'form'),
    )

    expect(handleSubmit).toBeCalled()
  })

  let form2Ref
  ReactDOM.render(
    <Wrapper>
      <UploadForm
        ref={(ref) => (form2Ref = ref)}
        handleSubmit={handleSubmit}
        setFile={setFile}
        uploading={true}
        file={{ size: 200 }}
      />
    </Wrapper>,
    node,
  )

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(
      form2Ref,
      'input',
    )[0]
    expect(input.value).toEqual('')
  })
})

describe('renderErrors', () => {
  const getClass = (component) => component.props.className

  it('renders errors', () => {
    const rendered = renderErrors(['this is an error'])
    expect(!!getClass(rendered).match('usa-alert usa-alert-error')).toBe(true)
  })

  it("doesn't renders errors", () => {
    expect(renderErrors([])).toBe(null)
  })
})
