jest.unmock('./checkFileErrors.js')
jest.unmock('../constants')
import * as types from '../../../src/filing/constants'
import checkFileErrors from '../../../src/filing/utils/checkFileErrors.js'

describe('checkFileErrors', () => {
  it('checks for file upload errors', () => {
    expect(checkFileErrors()).toEqual([
      'Your file was not uploaded. Please try again.',
    ])
    expect(checkFileErrors({ size: 123 })).toEqual([
      'Your file was not uploaded. Please try again.',
    ])
    expect(checkFileErrors({ name: 'arg.txt' })).toEqual([
      'Your file was not uploaded. Please try again.',
    ])
    expect(checkFileErrors({ name: 'arg.txt', size: 0 })).toEqual([
      'The file you uploaded does not contain any data. Please check your file and re-upload.',
    ])
    expect(checkFileErrors({ size: 123, name: 'bad' })).toEqual([
      'The file you uploaded is not a text file (.txt). Please check your file and re-upload.',
    ])
    expect(checkFileErrors({ size: 0, name: 'bad' })).toEqual([
      'The file you uploaded does not contain any data. Please check your file and re-upload.',
      'The file you uploaded is not a text file (.txt). Please check your file and re-upload.',
    ])
  })
})
