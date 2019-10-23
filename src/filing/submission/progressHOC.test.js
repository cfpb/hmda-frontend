jest.unmock('./progressHOC.jsx')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import submissionProgressHOC, { mapStateToProps } from './progressHOC.jsx'
import Wrapper from '../../test-resources/Wrapper.js'

const defaultState = {
  routing: {
    locationBeforeTransitions: {
      pathname: 'a/b/c'
    }
  },
  app: {
    edits: {
      fetched: false,
      types: {
        syntactical: { edits: [] },
        validity: { edits: [] },
        quality: { edits: [], verified: false },
        macro: { edits: [], verified: false }
      }
    },
    submission: {
      status: {
        code: 0
      }
    }
  }
}

describe('submissionProgressHOC', () => {
  it('produces a wrapped component', () => {
    const base = () => <div>hm</div>
    const wrapped = submissionProgressHOC(base)
    expect(wrapped).toBeDefined()
    expect(wrapped.displayName).toBe('Connect(base)')

    const component = <wrapped />
    expect(component).toBeDefined()
  })

  it('maps state to props with proper default state', () => {
    const mapped = mapStateToProps(defaultState)

    expect(Object.keys(mapped)).toEqual([
      'page',
      'base',
      'code',
      'editsFetched',
      'syntacticalValidityEditsExist',
      'qualityVerified',
      'macroVerified'
    ])

    expect(mapped.page).toBe('c')
    expect(mapped.base).toBe('a/b')
    expect(mapped.code).toBe(0)
    expect(mapped.syntacticalValidityEditsExist).toBe(false)
    expect(mapped.qualityVerified).toBe(true)
    expect(mapped.macroVerified).toBe(true)
    expect(mapped.editsFetched).toBe(false)
  })

  it('defaults quality verification to true if no edits exist', () => {
    defaultState.app.edits.types.quality = { edits: [], verified: false }
    const qualityMapped = mapStateToProps(defaultState)
    expect(qualityMapped.qualityVerified).toBe(true)
  })

  it('passes synval on fetched', () => {
    defaultState.app.edits.fetched = true
    const fetchMapped = mapStateToProps(defaultState)
    expect(fetchMapped.syntacticalValidityEditsExist).toBe(false)
  })

  it('shortcircuits on bad state', () => {
    const emptyMapped = mapStateToProps({})
    expect(emptyMapped).toBe(undefined)

    const noRoutingMapped = mapStateToProps({ app: {} })
    expect(noRoutingMapped).toBe(undefined)

    const noAppMapped = mapStateToProps({ routing: {} })
    expect(noAppMapped).toBe(undefined)
  })
})
