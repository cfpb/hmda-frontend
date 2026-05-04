import { sanitizeLei } from '../inputValidation'

describe('sanitizeLei', () => {
  it('accepts a valid LEI (20 chars, alphanumeric)', () => {
    expect(sanitizeLei('FRONTENDTESTBANK9999')).toBe('FRONTENDTESTBANK9999')
  })

  it('transforms lowercase to uppercase', () => {
    expect(sanitizeLei('frontendtestbank9999')).toBe('FRONTENDTESTBANK9999')
  })

  it('trims surrounding whitespace before validating', () => {
    expect(sanitizeLei('  FRONTENDTESTBANK9999  ')).toBe('FRONTENDTESTBANK9999')
  })

  it('rejects too short LEI', () => {
    expect(sanitizeLei('SHORTGARBAGELEI')).toBeNull()
  })

  it('rejects too long LEI', () => {
    expect(sanitizeLei('THISLEIISTOOLONGFORANYCHRISTOREAD1234')).toBeNull()
  })

  it('rejects LEI with special characters (but still 20 characters)', () => {
    expect(sanitizeLei('FRONTENDTESTBANK-999')).toBeNull()
    expect(sanitizeLei('<script>UGH</script>')).toBeNull()
  })

  it('rejects any weird stuff: empty, null, objects, etc', () => {
    expect(sanitizeLei('')).toBeNull()
    expect(sanitizeLei(null)).toBeNull()
    expect(sanitizeLei(undefined)).toBeNull()
    expect(sanitizeLei(12345)).toBeNull()
    expect(sanitizeLei({ party: 'time' })).toBeNull()
  })
})
