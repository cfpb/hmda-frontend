jest.unmock('../../src/js/reducers')

import * as types from '../../src/js/constants'
import { upload, status } from '../../src/js/reducers'

const typesArr = Object.keys(types)
  .filter((v) => v !== '__esModule')
  .map((v) => {
    return { type: v }
  })

const excludeTypes = (...args) => {
  return typesArr.filter((v) => {
    return args.indexOf(v.type) === -1
  })
}

const defaultUpload = {
  uploading: false,
  file: null,
  errors: [],
}

const defaultStatus = {
  code: null,
  message: '',
}

describe('status reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(status(undefined, {})).toEqual(defaultStatus)
  })

  it('handles UPDATE_STATUS', () => {
    expect(
      status(
        {},
        { type: types.UPDATE_STATUS, status: { code: 3, message: '' } },
      ),
    ).toEqual({ code: 3, message: '' })
  })
})

describe('upload reducer', () => {
  it('should return the initial state on empty action', () => {
    expect(upload(undefined, {})).toEqual(defaultUpload)
  })

  it('handles SELECT_FILE', () => {
    expect(
      upload(
        { file: {} },
        { type: types.SELECT_FILE, file: { name: 'afile' } },
      ),
    ).toEqual({ file: { name: 'afile' } })
  })

  it("shouldn't modify state on an unknown action type", () => {
    excludeTypes(types.SELECT_FILE, types.UPLOAD_PROGRESS).forEach((v) =>
      expect(upload({}, v)).toEqual({}),
    )
  })
})
