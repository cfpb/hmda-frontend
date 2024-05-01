jest.unmock('./ValidationProgress.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../../test-resources/Wrapper.js'
import ValidationProgress from '../../../../src/filing/submission/upload/ValidationProgress.jsx'

const localGet = jest.fn(() => 0)
const localSet = jest.fn()

window.localStorage = {
  getItem: localGet,
  setItem: localSet,
}

describe('ValidationProgress', () => {
  const progress = TestUtils.renderIntoDocument(
    <Wrapper>
      <ValidationProgress code={9} lei='argle' />
    </Wrapper>,
  )
  const progressNode = ReactDOM.findDOMNode(progress)

  it('renders the component', () => {
    expect(progressNode).toBeDefined()
  })

  it('renders the correct amount of children', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(progress, 'span').length,
    ).toEqual(1)
  })

  it('renders a complete class when code is appropriate', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(progress, 'complete').length,
    ).toEqual(1)
  })

  it('renders a pulsing class when code is appropriate', () => {
    const progress = TestUtils.renderIntoDocument(
      <Wrapper>
        <ValidationProgress code={7} lei='argle' />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(progress, 'pulsing').length,
    ).toEqual(1)
  })

  it('renders an error class', () => {
    const progress = TestUtils.renderIntoDocument(
      <Wrapper>
        <ValidationProgress code={5} lei='argle' />
      </Wrapper>,
    )
    expect(
      TestUtils.scryRenderedDOMComponentsWithClass(progress, 'error').length,
    ).toEqual(2)
  })

  it('renders null with no lei', () => {
    const progress = TestUtils.renderIntoDocument(
      <Wrapper>
        <ValidationProgress code={5} />
      </Wrapper>,
    )
    expect(progress.props.children.key).toBe(null)
  })

  it('gets expected results from getFillWidth', () => {
    let progress = new ValidationProgress({})
    expect(progress.getFillWidth()).toBe(0)
    progress.state = { fillWidth: 20 }
    expect(progress.getFillWidth()).toBe(20)

    progress = new ValidationProgress({ code: 5 })
    expect(progress.getFillWidth()).toBe(100)

    progress = new ValidationProgress({ code: 8 })
    expect(progress.getFillWidth()).toBe(100)
  })

  /*it('gets expected results from getProgressText', () => {
    let progress = new ValidationProgress({ code: 3 })
    expect(progress.getProgressText()).toBe('Uploading...')
    progress = new ValidationProgress({ code: 4 })
    expect(progress.getProgressText()).toBe('Analyzing file format...')
    progress = new ValidationProgress({ code: 5 })
    expect(progress.getProgressText()).toBe('File contains formatting errors.')
    progress = new ValidationProgress({ code: 7 })
    expect(progress.getProgressText()).toBe('Validating edits...')
    progress = new ValidationProgress({ code: 8 })
    expect(progress.getProgressText()).toBe('Edit validation complete.')
    progress = new ValidationProgress({ code: 9 })
    expect(progress.getProgressText()).toBe('Edit validation complete.')
    progress = new ValidationProgress({ uploadError: 1, code: 9 })
    expect(progress.getProgressText()).toBe(
      'There was an error uploading your file. Please try again.'
    )
    progress = new ValidationProgress({ appError: 1, code: 9 })
    expect(progress.getProgressText()).toBe(
      'There was an error checking your validation progress. Please refresh the page.'
    )
  })

  it('gets expected results from getIndicatorClass', () => {
    let progress = new ValidationProgress({ code: 3 })
    expect(progress.getIndicatorClass()).toBe(' pulsing')
    progress = new ValidationProgress({ code: 5 })
    expect(progress.getIndicatorClass()).toBe(' error')
    progress = new ValidationProgress({ code: 8 })
    expect(progress.getIndicatorClass()).toBe(' complete')
  })

  it('gets expected results from getLargeFileMessage', () => {
    let progress = new ValidationProgress({ code: 3 })
    expect(progress.getLargeFileMessage()).toEqual(null)
    progress = new ValidationProgress({ code: 7, file: { size: 1e6 } })
    expect(progress.getLargeFileMessage()).toEqual(
      'This process may take a little while. Your upload will complete automatically, so you may leave the platform and log back in later.'
    )
  })

  it('gets expected results from getEditsFoundMessage', () => {
    let progress = new ValidationProgress({ code: 3 })
    expect(progress.getEditsFoundMessage()).toBe(null)
    progress = new ValidationProgress({ code: 8 })
    expect(progress.getEditsFoundMessage()).toEqual(
      'Edits found, review required.'
    )
  })*/

  it('sets timeouts for pseudo progress', () => {
    const timeout = jest.fn()
    window.setTimeout = timeout

    let progress = new ValidationProgress({})
    progress.getNextWidth()
    expect(timeout).toBeCalled()
  })

  it('sets the next width', () => {
    let progress = new ValidationProgress({})
    const setState = jest.fn()
    progress.setState = setState
    const timeoutFn = progress.setNextWidth()
    expect(typeof timeoutFn).toBe('function')

    timeoutFn()
    expect(setState).toBeCalled()

    const nextTimeout = progress.setNextWidth(100)
    nextTimeout()
    expect(setState.mock.calls[1][0]).toEqual({ fillWidth: 100 })
  })

  it('getsSavedWidth', () => {
    let progress = new ValidationProgress({})
    expect(progress.getSavedWidth()).toBe(0)
    expect(progress.getSavedWidth('argle')).toBe(0)
  })

  it('saves width', () => {
    let progress = new ValidationProgress({})
    progress.saveWidth()
    expect(localSet).toBeCalled()
  })

  it('saves width with error', () => {
    const localGet = jest.fn(() => 0)
    const localSet = jest.fn()

    window.localStorage = {
      getItem: localGet,
      setItem: localSet,
    }

    let progress = new ValidationProgress({ errorUpload: 1 })
    progress.saveWidth(123)
    expect(localSet).toBeCalledWith('HMDA_FILE_PROGRESS/123', 0)
  })

  it('updates when receiving new props', () => {
    let progress = new ValidationProgress({ file: { size: 123 }, lei: 'argle' })
    const setState = jest.fn()
    progress.setState = setState
    progress.componentWillReceiveProps({})

    expect(setState).toBeCalled()

    progress = new ValidationProgress({})
    const setState2 = jest.fn()
    progress.setState = setState2
    progress.componentWillReceiveProps({})

    expect(setState2).not.toBeCalled()

    progress = new ValidationProgress({ file: { size: 123 }, lei: 'argle' })
    const setState3 = jest.fn()
    progress.setState = setState3
    progress.componentWillReceiveProps({ file: { size: 123 }, lei: 'argle' })

    expect(setState3).not.toBeCalled()
    expect(progress.SCALING_FACTOR).toBe(1)

    progress.componentWillReceiveProps({ file: { size: 1e8 }, lei: 'argle' })
    expect(progress.SCALING_FACTOR).toBe(5)
  })

  it('calls expected functions on unmount with no error', () => {
    let progress = new ValidationProgress({ file: { size: 123 }, lei: 'argle' })

    delete window.clearTimeout
    const timeout = jest.fn()
    window.clearTimeout = timeout
    const save = jest.fn()
    progress.saveWidth = save

    progress.componentWillUnmount({})
    expect(timeout).toBeCalled()
    expect(save).not.toBeCalled()

    progress = new ValidationProgress({
      uploadError: '34',
      file: { size: 123 },
      lei: 'argle',
    })
  })

  it('sets the right scaling factor', () => {
    let progress = new ValidationProgress({
      lei: 'argle',
    })
    expect(progress.SCALING_FACTOR).toBe(1)

    progress = new ValidationProgress({
      file: { size: 10 },
      lei: 'argle',
    })
    expect(progress.SCALING_FACTOR).toBe(1)

    progress = new ValidationProgress({
      file: { size: 1e8 },
      lei: 'argle',
    })
    expect(progress.SCALING_FACTOR).toBe(5)
  })
})
