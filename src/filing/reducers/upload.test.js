jest.unmock('./upload.js')
import * as types from '../constants'
import excludeTypes from './excludeTypes.js'
import upload from './upload.js'

const defaultUpload = {
  uploading: false,
  file: null,
  newFile: null,
  errors: [],
  errorFile: null,
  errorUpload: null
}

const defaultUploads = {
  __DEFAULT_UPLOAD__: defaultUpload
}

describe('upload reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(upload(undefined, {})).toEqual(defaultUploads)
  })

  it('handles SELECT_FILE', () => {
    expect(
      upload(defaultUploads, {
        type: types.SELECT_FILE,
        file: { name: 'afile' },
        errors: [],
        lei: '123'
      })
    ).toEqual({
      123: { ...defaultUpload, file: { name: 'afile' } },
      __DEFAULT_UPLOAD__: defaultUpload
    })
  })

  it('handles REFRESH_STATE', () => {
    expect(
      upload(
        { ...defaultUploads, 123: 42 },
        { type: types.REFRESH_STATE, lei: '123' }
      )
    ).toEqual({ 123: defaultUpload, __DEFAULT_UPLOAD__: defaultUpload })
  })

  it('handles RECEIVE_UPLOAD_ERROR', () => {
    expect(
      upload(
        { 123: 42 },
        { type: types.RECEIVE_UPLOAD_ERROR, error: 'argle', lei: '123' }
      )
    ).toEqual({ 123: { errorUpload: 'argle' } })
  })

  it('handles RECEIVE_FILE_ERRORS', () => {
    expect(
      upload(
        { 123: 42 },
        {
          type: types.RECEIVE_FILE_ERRORS,
          lei: '123',
          file: 'yo',
          errors: ['err']
        }
      )
    ).toEqual({ 123: { errors: ['err'], errorFile: 'yo' } })
  })

  it('handles REQUEST_UPLOAD', () => {
    expect(
      upload(defaultUploads, { type: types.REQUEST_UPLOAD, lei: '123' })
    ).toEqual({
      ...defaultUploads,
      123: { ...defaultUpload, uploading: true }
    })
  })

  it('handles SELECT_NEW_FILE', () => {
    expect(
      upload(defaultUploads, {
        type: types.SELECT_NEW_FILE,
        lei: '123',
        file: { a: 2 }
      })
    ).toEqual({
      ...defaultUploads,
      123: { ...defaultUpload, newFile: { a: 2 } }
    })
  })

  it('handles RECEIVE_UPLOAD', () => {
    expect(
      upload(defaultUploads, { type: types.RECEIVE_UPLOAD, lei: '123' })
    ).toEqual({
      ...defaultUploads,
      123: { ...defaultUpload, uploading: false }
    })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(
      types.SELECT_FILE,
      types.SELECT_NEW_FILE,
      types.REFRESH_STATE,
      types.REQUEST_UPLOAD,
      types.RECEIVE_UPLOAD,
      types.RECEIVE_FILE_ERRORS,
      types.RECEIVE_UPLOAD_ERROR
    ).forEach(v => expect(upload({}, v)).toEqual({}))
  })
})
