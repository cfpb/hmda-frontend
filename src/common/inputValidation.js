// Veracode approved input validations

import validator from 'validator'

/**
 * Sanitizes values (hopefully strings) to conform to LEI standards
 * Ensures validity and prevents potential XSS attacks as per veracode scans
 *
 * @param {*} value any raw input value (hopefully an LEI string)
 * @returns {string | null} sanitized LEI string (uppercase, 20 chars, alphanumeric) or null if invalid
 */

export function sanitizeLei(value) {
  if (typeof value !== 'string') return null
  if (value.length === 0) return null

  const trimmedString = validator.trim(value)
  if (trimmedString.length === 0) return null

  const standardLeiString = validator.whitelist(
    trimmedString.toUpperCase(),
    'A-Z0-9',
  )

  if (!validator.isLength(standardLeiString, { min: 20, max: 20 })) return null
  if (!validator.isAlphanumeric(normalized, 'en-US')) return null

  return standardLeiString
}
