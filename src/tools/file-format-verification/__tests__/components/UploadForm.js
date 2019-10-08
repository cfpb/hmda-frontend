jest.unmock('../../src/js/components/UploadForm.jsx')

import UploadForm, {
  renderErrors
} from '../../src/js/components/UploadForm.jsx'
import Wrapper from '../Wrapper.js'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

describe('submitform', function(){
  const handleSubmit = jest.fn()
  const setFile = jest.fn()

  // use ReactDOM.render instead to be able to test componentDidUpdate
  const node = document.createElement('div')
  const form = ReactDOM.render(
      <Wrapper>
        <UploadForm
          handleSubmit={handleSubmit}
          setFile={setFile}
          uploading={true}
          file={{size:108}}
          code={5}
          filingPeriod={2017}
          errors={['this is an error', 'and another']}
        />
      </Wrapper>, node)
  const formNode = ReactDOM.findDOMNode(form)

  it('renders the form', function(){
    expect(formNode).toBeDefined()
  })

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0]
    expect(input.value).toEqual('')
  })

  it('submits the form', function(){
    TestUtils.Simulate.submit(
      TestUtils.findRenderedDOMComponentWithTag(form, 'form')
    )

    expect(handleSubmit).toBeCalled()
  })

  const form2 = ReactDOM.render(
      <Wrapper>
        <UploadForm
          handleSubmit={handleSubmit}
          setFile={setFile}
          uploading={true}
          file={{size:200}}
        />
      </Wrapper>, node)
  const form2Node = ReactDOM.findDOMNode(form2)

  it('expects the file input to be empty', () => {
    const input = TestUtils.scryRenderedDOMComponentsWithTag(form2, 'input')[0]
    expect(input.value).toEqual('')
  })
})

describe('renderErrors', () => {
  const getClass = component =>
    component.props.className

  it('renders errors', () => {
    const rendered = renderErrors(['this is an error'])
    expect(!!getClass(rendered).match('usa-alert usa-alert-error')).toBe(true)
  })

  it('doesn\'t renders errors', () => {
    expect(renderErrors([])).toBe(null)
  })
})
