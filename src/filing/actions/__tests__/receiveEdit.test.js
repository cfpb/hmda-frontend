import { describe, expect, it } from 'vitest'
import { PATTERN_888_8888, PATTERN_999_9999, highlightEditFields } from '../receiveEdit.jsx'

describe('highlightEditFields', () => {
  describe('Q656 and Q657 edits', () => {
    it('should highlight fields matching 1111 pattern when no pattern is provided', () => {
      const fields = [
        { value: '1111' },
        { value: '1111.0' },
        { value: '1111.00' },
        { value: '1111.000' },
      ]

      const editFields = highlightEditFields([{fields}])
      editFields[0].fields.forEach(field => expect(field.value.props?.className).toBe('highlight'))
    })

    it('should not highlight fields that do not match 1111 pattern', () => {
      const fields = [
        { value: '1112' },
        { value: '1111.1' },
        { value: '11111' },
      ]

      const editFields = highlightEditFields([{fields}])
      editFields[0].fields.forEach(field => expect(field.value.props?.className).not.toBe('highlight'))
    })
  })

  describe('Q659-1 edit', () => {
    it('should highlight fields matching 888 pattern variations', () => {
      const fields = [
        { value: '888' },
        { value: '888.0' },
        { value: '888.00' },
        { value: '888.000' },
      ]

      const editFields = highlightEditFields([{fields}], PATTERN_888_8888)
      editFields[0].fields.forEach(field => expect(field.value.props?.className).toBe('highlight'))
    })

    it('should highlight fields matching 88888 pattern variations', () => {
      const fields = [
        { value: '88888' },
        { value: '88888.0' },
        { value: '88888.00' },
        { value: '88888.000' },
      ]

      const editFields = highlightEditFields([{fields}], PATTERN_888_8888)
      editFields[0].fields.forEach(field => expect(field.value.props?.className).toBe('highlight'))
    })

    it('should not highlight fields that do not match 888/88888 pattern', () => {
      const fields = [
        { value: '887' },
        { value: '889' },
        { value: '888.1' },
        { value: '88888.1' },
        { value: '8888' },
        { value: '888888' },
      ]

      const editFields = highlightEditFields([{fields}], PATTERN_888_8888)
      editFields[0].fields.forEach(field => expect(field.value.props?.className).not.toBe('highlight'))
    })
  })

  describe('Q659-2', () => {
    it('should highlight fields matching 999 pattern variations', () => {
      const fields = [
        { value: '999' },
        { value: '999.0' },
        { value: '999.00' },
        { value: '999.000' },
      ]

      const editFields = highlightEditFields([{fields}], PATTERN_999_9999)
      editFields[0].fields.forEach(field => expect(field.value.props?.className).toBe('highlight'))
    })

    it('should highlight fields matching 99999 pattern variations', () => {
      const fields = [
        { value: '99999' },
        { value: '99999.0' },
        { value: '99999.00' },
        { value: '99999.000' },
      ]

      const editFields = highlightEditFields([{fields}], PATTERN_999_9999)
      editFields[0].fields.forEach(field => expect(field.value.props?.className).toBe('highlight'))
    })

    it('should not highlight fields that do not match 999/99999 pattern', () => {
      const fields = [
        { value: '997' },
        { value: '999.1' },
        { value: '99999.1' },
        { value: '9999' },
        { value: '999999' },
      ]

      const editFields = highlightEditFields([{fields}], PATTERN_999_9999)
      editFields[0].fields.forEach(field => expect(field.value.props?.className).not.toBe('highlight'))
    })
  })
})
