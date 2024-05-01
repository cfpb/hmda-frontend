jest.mock('../api/api')
jest.unmock('./pollForProgress.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import pollForProgress, { makeDurationGetter } from '../../../src/filing/actions/pollForProgress.js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getLatestSubmission, getEdits } from '../../../src/filing/api/api.js'
import fs from 'fs'
import { VALIDATING } from '../../../src/filing/constants/statusCodes.js'

const filingsObj = JSON.parse(
  fs.readFileSync('./test-resources/json/filings.json'),
)
getLatestSubmission.mockImplementation(() =>
  Promise.resolve(filingsObj.submissions[2]),
)
getEdits.mockImplementation((id) => Promise.resolve({ fakeEdits: 1 }))
const mockStore = configureMockStore([thunk])

describe('pollForProgress', () => {
  it('does not poll on pages other than upload', () => {
    const store = mockStore({ submission: {} })
    store.dispatch(pollForProgress()).then(() => {
      expect(store.getActions()).toEqual([])
    })
  })

  it('creates a thunk that will poll for updated status codes in the latest submission', (done) => {
    const store = mockStore({ submission: {} })
    const submission = filingsObj.submissions[2]

    delete global.location
    global.location = { pathname: '/upload' }

    store
      .dispatch(pollForProgress())
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.RECEIVE_SUBMISSION,
            id: submission.id,
            status: submission.status,
            start: submission.start,
            end: submission.end,
          },
          {
            type: 'REQUEST_EDITS',
          },
          {
            edits: {
              fakeEdits: 1,
            },
            type: 'RECEIVE_EDITS',
          },
        ])

        done()
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })

  it('creates a thunk that will poll for updated status codes in the latest submission, but will not get errors', (done) => {
    const store = mockStore({ submission: {} })
    const submission = filingsObj.submissions[1]

    delete global.location
    global.location = { pathname: '/upload' }

    getLatestSubmission.mockImplementation(() =>
      Promise.resolve(filingsObj.submissions[1]),
    )
    store
      .dispatch(pollForProgress())
      .then(() => {
        expect(store.getActions()).toEqual([
          {
            type: types.RECEIVE_SUBMISSION,
            id: submission.id,
            status: submission.status,
            start: submission.start,
            end: submission.end,
          },
        ])

        done()
      })
      .catch((err) => {
        console.log(err)
        done.fail()
      })
  })
  it('makes a duration getter properly', () => {
    const dg = makeDurationGetter()
    expect(dg).toBeDefined()
    expect(dg()).toBe(1000)
    expect(dg()).toBe(1200)
    for (let i = -1; i < 30; i++) {
      dg()
    }
    expect(dg()).toBe(20000)
  })

  it('sets a timeout when polling should continue', () => {
    const store = mockStore({ submission: {} })
    const submission = filingsObj.submissions[2]
    submission.status = { code: VALIDATING }
    getLatestSubmission.mockImplementation(() => Promise.resolve(submission))

    delete window.setTimeout
    const timeout = jest.fn()
    window.setTimeout = timeout

    store.dispatch(pollForProgress()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.RECEIVE_SUBMISSION,
          id: submission.id,
          status: submission.status,
          start: submission.start,
          end: submission.end,
        },
      ])
      expect(timeout).toBeCalled()
      expect(typeof timeout.mock.calls[0][0]).toBe('function')
      expect(timeout.mock.calls[0][0](store.dispatch)).resolves.toBe(undefined)
    })
  })

  it('handles errors when introduced', (done) => {
    delete window.setTimeout
    const timeout = jest.fn()
    window.setTimeout = timeout

    console.error = jest.fn()
    getLatestSubmission.mockImplementation(() =>
      Promise.resolve({ status: 404, statusText: 'argle' }),
    )
    const poller = pollForProgress()
    poller().then((json) => {
      expect(json).toBe(undefined)
      expect(timeout).toBeCalled()
      expect(console.error).not.toBeCalled()
      poller().then((json) => {
        expect(json).toBe(undefined)
        expect(console.error).not.toBeCalled()
        poller(jest.fn()).then((json) => {
          expect(json).toBe(undefined)
          expect(console.error).toBeCalled()
          done()
        })
      })
    })
  })

  it('does not process old polls', (done) => {
    delete global.location
    global.location = { pathname: '/upload' }

    console.error = jest.fn()

    const submission = filingsObj.submissions[2]
    submission.status = { code: VALIDATING }
    getLatestSubmission.mockImplementation(() => Promise.resolve(submission))

    const p1 = pollForProgress()
    pollForProgress()
    p1(jest.fn((fn) => Promise.resolve('defined'))).then((json) => {
      expect(json).toBe(null)
      expect(console.error).not.toBeCalled()
      done()
    })
  })
})
