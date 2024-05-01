jest.unmock('./container.jsx')

import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../test-resources/Wrapper.js'
import Connected, {
  PaginationContainer,
  mapStateToProps,
  mapDispatchToProps,
  makePathname,
} from '../../../src/filing/pagination/container.jsx'

const defaultPagination = {
  parseErrors: null,
}

const pageObj = {
  total: 45,
  count: 10,
  _links: {
    self: '?page=1',
    prev: '?page=1',
    last: '?page=5',
    next: '?page=2',
    first: '?page=1',
    href: '/thehref{rel}',
  },
}

describe('Pagination Container', () => {
  it('makes a pathname from pagination object', () => {
    expect(makePathname(pageObj, '?argle')).toEqual('/thehref?argle')
  })

  it('returns undefined without a pagination object', () => {
    expect(makePathname()).toBeUndefined()
  })

  it('renders the unwrapped component', () => {
    const targetDiv = TestUtils.renderIntoDocument(<div id='testDiv' />)
    const rendered = TestUtils.renderIntoDocument(
      <PaginationContainer
        pagination={null}
        getPage={jest.fn()}
        getPreviousPage={jest.fn()}
        getNextPage={jest.fn()}
        target='testDiv'
      />,
    )

    expect(rendered).toBeDefined()
  })

  it('maps state to props with proper defaults', () => {
    expect(
      mapStateToProps(
        {
          app: {
            pagination: defaultPagination,
            parseErrors: { isFetching: false },
          },
        },
        { target: 'parseErrors' },
      ),
    ).toEqual({ pagination: null })
  })

  it('maps state properly when given a pagination object is present', () => {
    expect(
      mapStateToProps(
        {
          app: {
            pagination: { parseErrors: pageObj },
            parseErrors: { isFetching: false },
          },
        },
        { target: 'parseErrors' },
      ),
    ).toEqual({ pagination: pageObj })
  })

  it('maps state to undefined when given an invalid target', () => {
    expect(
      mapStateToProps(
        {
          app: {
            pagination: { parseErrors: pageObj },
            parseErrors: { isFetching: false },
            edits: { rows: { argle: '123' } },
          },
        },
        { target: 'fake' },
      ),
    ).toEqual({ pagination: undefined })
  })

  it('maps dispatch appropriately', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch, {})

    expect(Object.keys(mapped)).toEqual([
      'getPage',
      'getNextPage',
      'getPreviousPage',
    ])
    expect(dispatch).not.toBeCalled()
  })

  it('makes proper paging fns', () => {
    const dispatch = jest.fn()
    document.getElementById = jest.fn(() => {
      return { offsetTop: 12 }
    })
    const mapped = mapDispatchToProps(dispatch, {})

    mapped.getPage()
    mapped.getPage(pageObj)
    mapped.getPreviousPage()
    mapped.getNextPage()

    expect(dispatch).not.toBeCalled()

    mapped.getPage(pageObj, 4)
    mapped.getPreviousPage(pageObj)
    mapped.getNextPage(pageObj)

    expect(dispatch).toHaveBeenCalledTimes(6)
  })

  it('renders the connected component', () => {
    const err = console.error
    console.error = jest.fn()
    const pagination = TestUtils.renderIntoDocument(
      <Wrapper
        store={{
          app: {
            pagination: defaultPagination,
            edits: { rows: { argle: '123' } },
          },
        }}
      >
        <Connected target='argle' />
      </Wrapper>,
    )

    expect(pagination).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })
})
