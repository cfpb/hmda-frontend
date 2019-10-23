jest.unmock('./index.jsx')

import Pagination from './index.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'

describe('Pagination component', () => {
  const getPage = jest.fn()
  const getPreviousPage = jest.fn()
  const getNextPage = jest.fn()
  const pageObj = {
    total: 45,
    count: 20,
    _links: {
      self: '?page=1',
      prev: '?page=1',
      last: '?page=5',
      next: '?page=2',
      first: '?page=1',
      href: '/thehref{rel}'
    }
  }

  const nextPage = {
    total: 45,
    count: 20,
    _links: {
      self: '?page=2',
      prev: '?page=1',
      last: '?page=5',
      next: '?page=3',
      first: '?page=1',
      href: '/thehref{rel}'
    }
  }

  const paginate = (page = pageObj) => {
    return TestUtils.renderIntoDocument(
      <Pagination
        pagination={page}
        getPage={getPage}
        getPreviousPage={getPreviousPage}
        getNextPage={getNextPage}
      />
    )
  }

  const pagination = paginate()

  const paginationNode = ReactDOM.findDOMNode(pagination)

  it('renders the component', () => {
    expect(paginationNode).toBeDefined()
  })

  it('contains the buttons', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'button').length
    ).toEqual(2)
  })

  it('renders the current page', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'input')[0].value
    ).toEqual('1')
  })

  it('renders the pagenav text', () => {
    expect(
      TestUtils.scryRenderedDOMComponentsWithTag(pagination, 'div')[1]
        .textContent
    ).toEqual('Page  of 3')
  })

  it('does not call prev on change when self===1', () => {
    var previous = TestUtils.scryRenderedDOMComponentsWithTag(
      pagination,
      'button'
    )[0]

    TestUtils.Simulate.click(previous)

    expect(getPreviousPage).not.toBeCalled()
  })

  it('calls next on change', () => {
    var next = TestUtils.scryRenderedDOMComponentsWithTag(
      pagination,
      'button'
    )[1]

    TestUtils.Simulate.click(next)

    expect(getNextPage).toBeCalled()
  })

  it('updates state when receiving new props', () => {
    expect(pagination.state.value).toBe('1')
    const nextPagination = paginate(nextPage)
    expect(nextPagination.state.value).toBe('2')
  })

  it('does not render when pagination is empty', () => {
    const emptyPagination = paginate(null)
    const emptyNode = ReactDOM.findDOMNode(emptyPagination)
    expect(emptyNode).toEqual(null)
  })

  it('does NOT render when total count is < 21', () => {
    const pageObjSmall = {
      total: 15,
      count: 20,
      _links: {
        self: '?page=1',
        prev: '?page=1',
        last: '?page=5',
        next: '?page=2',
        first: '?page=1',
        href: '/thehref{rel}'
      }
    }

    const smallPagination = paginate(pageObjSmall)

    const smallPaginationNode = ReactDOM.findDOMNode(smallPagination)
    expect(smallPaginationNode).toEqual(null)
  })

  it('attemps to set from props on component will mount', () => {
    const pagination = paginate()
    const _setFromPropsMock = jest.fn()
    pagination._setFromProps = _setFromPropsMock
    pagination.componentWillMount()

    expect(_setFromPropsMock).toHaveBeenCalled()
  })

  it('attemps to set state when receiving new props', () => {
    let pagination = paginate()
    const stateMock = jest.fn()
    pagination.setState = stateMock
    pagination._getPaginationValue = jest.fn()

    pagination.componentWillReceiveProps({})
    expect(stateMock).not.toHaveBeenCalled()

    pagination.componentWillReceiveProps({ pagination: {}, isFetching: true })
    expect(stateMock).not.toHaveBeenCalled()

    pagination.componentWillReceiveProps({ pagination: {} })
    expect(stateMock).toHaveBeenCalled()
  })

  it('gets input form', () => {
    const pagination = paginate()
    const form = pagination._getInput()
    expect(form.type).toBe('form')
    expect(form.props.children[0].type).toBe('label')
    expect(form.props.children[1].type).toBe('input')
  })

  it('gets the pagination value', () => {
    const pagination = paginate()
    expect(pagination._getPaginationValue({})).toBe(null)
    expect(
      pagination._getPaginationValue({
        pagination: {
          _links: {
            self: '?page=3'
          }
        }
      })
    ).toBe('3')
  })

  it('submits the form properly', () => {
    getPage.mockReset()
    const pagination = paginate()
    const scrollMock = jest.fn()
    const _setFromPropsMock = jest.fn()
    pagination._setScrollValues = scrollMock
    pagination._setFromProps = _setFromPropsMock
    const e = { preventDefault: jest.fn() }

    pagination._change({ target: { value: 'string' } })
    pagination._submit(e)

    expect(getPage).not.toBeCalled()
    expect(_setFromPropsMock).toBeCalled()
    expect(scrollMock).toBeCalled()

    pagination._change({ target: { value: -7 } })
    pagination._submit(e)

    expect(getPage.mock.calls[0][1]).toBe('1')
    expect(_setFromPropsMock.mock.calls.length).toBe(1)

    pagination._change({ target: { value: 7 } })
    pagination._submit(e)

    expect(scrollMock).toBeCalled()
    expect(getPage.mock.calls[1][1]).toBe('5')
    expect(_setFromPropsMock.mock.calls.length).toBe(1)
  })

  it('correctly handles componentDidUpdate', () => {
    const scrollTo = jest.fn()
    window.scrollTo = scrollTo
    const pagination = paginate()
    pagination.componentDidUpdate(null, { value: '0' })

    expect(scrollTo).not.toBeCalled()
  })
})
