import { describe, expect, it } from 'vitest'
import { sanitizeFileName } from '../downloadStream.js'

describe('sanitizeFileName', () => {
  it('should replace dangerous characters with dashes', () => {
    expect(sanitizeFileName('file/name\\with?bad*chars.txt'))
      .toBe('file-name-with-bad-chars.txt')
  })

  it('should remove path traversal sequences', () => {
    expect(sanitizeFileName('../../../etc/passwd'))
      .toBe('etc-passwd')
  })

  it('should remove leading dots', () => {
    expect(sanitizeFileName('...hidden-file.txt'))
      .toBe('hidden-file.txt')
  })

  it('should return default filename for empty input', () => {
    const result = sanitizeFileName('')
    expect(result).toMatch(/^hmda-download-\d+\.txt$/)
  })

  it('should return default filename for null/undefined', () => {
    expect(sanitizeFileName(null)).toMatch(/^hmda-download-\d+\.txt$/)
    expect(sanitizeFileName(undefined)).toMatch(/^hmda-download-\d+\.txt$/)
  })

  it('should trim whitespace', () => {
    expect(sanitizeFileName('  test-file.txt  '))
      .toBe('test-file.txt')
  })
})
