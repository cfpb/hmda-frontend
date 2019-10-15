jest.unmock('./submission.js')
import * as types from '../constants'
import excludeTypes from './excludeTypes.js'
import submission from './submission.js'

const defaultSubmission = {
  id: null,
  filename: '',
  status: {
    code: 0,
    message: ''
  },
  isFetching: false
}

describe('submission reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(submission({ ...defaultSubmission }, {})).toEqual(defaultSubmission)
  })

  it('handles RECEIVE_SUBMISSION', () => {
    const submissionAction = {
      type: 'RECEIVE_SUBMISSION',
      id: 1,
      fileName: 'argle',
      status: {
        code: 1,
        message: ''
      }
    }
    expect(
      submission(
        { ...defaultSubmission, status: { code: 1 }, isFetching: true },
        submissionAction
      )
    ).toEqual({
      isFetching: false,
      id: 1,
      filename: 'argle',
      status: {
        code: 1,
        message: ''
      }
    })

    expect(
      submission(
        { ...defaultSubmission, status: { code: 1 } },
        submissionAction
      )
    ).toEqual({ ...defaultSubmission, status: { code: 1 } })
  })

  it('handles REFRESH_STATE', () => {
    expect(submission({}, { type: 'REFRESH_STATE' })).toEqual(defaultSubmission)
  })

  it('handles REQUEST_SUBMISSION', () => {
    expect(submission({ a: 2 }, { type: 'REQUEST_SUBMISSION' })).toEqual({
      a: 2,
      isFetching: true
    })
  })

  it('handles SELECT_FILE', () => {
    expect(
      submission({}, { type: 'SELECT_FILE', file: { name: 'bargle' } })
    ).toEqual({ filename: 'bargle' })
  })

  it('handles UPDATE_STATUS', () => {
    expect(
      submission(undefined, {
        type: 'UPDATE_STATUS',
        status: { code: 0 }
      })
    ).toEqual(defaultSubmission)
    expect(
      submission(defaultSubmission, {
        type: 'UPDATE_STATUS',
        status: { code: 7 }
      })
    ).toEqual({ ...defaultSubmission, status: { code: 7 } })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.SELECT_FILE,
      types.RECEIVE_SUBMISSION,
      types.UPDATE_STATUS,
      types.REFRESH_STATE,
      types.REQUEST_SUBMISSION
    ).forEach(v => expect(submission({}, v)).toEqual({}))
  })
})
