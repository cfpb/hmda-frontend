jest.unmock('./TableContainer.jsx')
jest.mock('./Table.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import TableComponent from '../../../../src/filing/submission/edits/Table.jsx'
import Table, {
  EditsTableContainer,
  mapStateToProps,
} from '../../../../src/filing/submission/edits/TableContainer.jsx'
import Wrapper from '../../../test-resources/Wrapper.js'

console.error = jest.fn()

TableComponent.mockImplementation(() => null)

const defaultState = {
  app: {
    edits: {
      rows: {
        a: { 123: 456 },
      },
    },
    pagination: {
      a: { b: 'c' },
    },
    paginationFade: {
      a: 0,
    },
  },
}

describe('Table', () => {
  it('renders the connected component', () => {
    const wrappedConnected = TestUtils.renderIntoDocument(
      <Wrapper store={defaultState}>
        <Table edit={{ edit: 'a' }} />
      </Wrapper>,
    )

    expect(console.error).not.toBeCalled()
  })

  it('renders the unconnected component with passed in props', () => {
    const wrappedContainer = TestUtils.renderIntoDocument(
      <Wrapper>
        <EditsTableContainer
          rowObj={{}}
          pagination={{}}
          paginationFade={0}
          edit={{ edit: 'a' }}
        />
      </Wrapper>,
    )
    expect(console.error).not.toBeCalled()
  })

  it('maps state to props', () => {
    const mapped = mapStateToProps(defaultState, { edit: { edit: 'a' } })

    expect(Object.keys(mapped)).toEqual([
      'rowObj',
      'pagination',
      'paginationFade',
    ])
    expect(mapped.rowObj).toEqual({ 123: 456 })
    expect(mapped.pagination).toEqual({ b: 'c' })
    expect(mapped.paginationFade).toBe(0)

    const badMap = mapStateToProps(defaultState, {})
    expect(badMap.rowObj).toEqual(undefined)
    expect(badMap.pagination).toEqual(undefined)
    expect(badMap.paginationFade).toBe(undefined)
  })

  it('updates component appropriately', () => {
    const table = new EditsTableContainer({
      edit: { edit: 'a' },
      rowObj: {},
      pagination: {},
      paginationFade: 0,
    })

    expect(table.shouldComponentUpdate({ paginationFade: 1 })).toBe(true)
    expect(table.shouldComponentUpdate({ paginationFade: 0 })).toBe(true)

    const t2 = new EditsTableContainer({
      edit: { edit: 'a' },
      rowObj: {},
      pagination: {},
      paginationFade: 1,
    })

    expect(t2.shouldComponentUpdate({ paginationFade: 1 })).toBe(false)
    expect(t2.shouldComponentUpdate({ paginationFade: 0 })).toBe(true)
  })
})
