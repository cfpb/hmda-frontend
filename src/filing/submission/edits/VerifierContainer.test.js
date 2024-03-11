jest.unmock('./VerifierContainer.jsx')

import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Wrapper from '../../../test-resources/Wrapper.js'
import Connected, {
  VerifierContainer,
  mapStateToProps,
  mapDispatchToProps,
} from './VerifierContainer.jsx'

const defaultQuality = {
  app: {
    edits: {
      types: {
        quality: {
          verified: true,
          edits: [],
        },
      },
    },
    submission: {
      status: {
        code: 1,
      },
    },
  },
}
const defaultMacro = {
  app: {
    edits: {
      types: {
        macro: {
          verified: true,
          edits: [],
        },
      },
    },
    submission: {
      status: {
        code: 1,
      },
    },
  },
}

describe('Verifier Container', () => {
  it('renders the unwrapped component', () => {
    const err = console.error
    console.error = jest.fn()
    const rendered = TestUtils.renderIntoDocument(
      <VerifierContainer
        type='quality'
        verified={true}
        onVerify={jest.fn()}
        noEditsExist={true}
        isFetching={false}
      />,
    )

    expect(rendered).toBeDefined()
    expect(console.error).not.toBeCalled()

    const renderedWithErr = TestUtils.renderIntoDocument(<VerifierContainer />)

    expect(rendered).toBeDefined()
    expect(console.error).toHaveBeenCalledTimes(9)
    console.error = err
  })

  it('maps state to props with proper defaults for quality', () => {
    expect(mapStateToProps(defaultQuality, { type: 'quality' })).toEqual({
      noEditsExist: true,
      type: 'quality',
      verified: true,
      code: 1,
      isFetching: false,
    })
  })

  it('maps state to props with proper defaults for macro', () => {
    expect(mapStateToProps(defaultMacro, { type: 'macro' })).toEqual({
      noEditsExist: true,
      type: 'macro',
      verified: true,
      code: 1,
      isFetching: false,
    })
  })

  it('sets noEditsExist to false if edits exist', () => {
    expect(
      mapStateToProps(
        {
          app: {
            edits: { types: { macro: { edits: ['a'] } } },
            submission: { status: {} },
          },
        },
        { type: 'macro' },
      ),
    ).toEqual({
      noEditsExist: false,
      type: 'macro',
      verified: false,
      code: undefined,
      isFetching: false,
    })
  })

  it('maps dispatch appropriately', () => {
    const dispatch = jest.fn()
    const mapped = mapDispatchToProps(dispatch, { type: 'quality' })

    expect(Object.keys(mapped)).toEqual(['onVerify'])
    mapped.onVerify(true)
    expect(dispatch).toBeCalled()
  })

  it('throws on bad state', () => {
    expect(() => {
      mapStateToProps()
    }).toThrow()
  })

  it('renders the connected component for quality', () => {
    const err = console.error
    console.error = jest.fn()
    const qualityVerifier = TestUtils.renderIntoDocument(
      <Wrapper store={defaultQuality}>
        <Connected type='quality' />
      </Wrapper>,
    )

    expect(qualityVerifier).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })

  it('renders the connected component for macro', () => {
    const err = console.error
    console.error = jest.fn()
    const macroVerifier = TestUtils.renderIntoDocument(
      <Wrapper store={defaultMacro}>
        <Connected type='macro' />
      </Wrapper>,
    )

    expect(macroVerifier).toBeDefined()
    expect(console.error).not.toBeCalled()
    console.error = err
  })
})
