import React from 'react'
import * as types from '../constants'

const PATTERN_1111 = /1111/

/**
 *  Restrict the displayed fields to those whose value matches a pattern 
 */
const filterEditFields = (rows = [], pattern = PATTERN_1111) => {
  let fieldMatches = {}

  // Identify field values that match this pattern
  rows.forEach((r) => {
    if (!r.fields) return
    r.fields.forEach((f) => {
      if (!f.value.match(pattern)) return
      fieldMatches[f.name] = true
    })
  })

  // Retain only those fields
  rows.forEach((r) => {
    if (!r.fields) return
    r.fields = r.fields.filter((f) => {
      if (!fieldMatches[f.name]) return null
      if (f.value.match(pattern)) {
        // Highlight the offending field
        f.value = <span className='highlight'>{f.value}</span>
      }
      return f
    })
  })
}

/**
 * Configure transformations per Edit
 */
const TRANSFORMERS = {
  Q656: {
    type: 'regex',
    filter: filterEditFields,
    pattern: PATTERN_1111,
  },
  Q657: {
    type: 'regex',
    filter: filterEditFields,
    pattern: PATTERN_1111,
  },
}

export default function receiveEdit(data) {
  const useSpecial = TRANSFORMERS[data.edit]
  if (useSpecial && useSpecial.type === 'regex')
    useSpecial.filter(data.rows, useSpecial.pattern)

  return {
    type: types.RECEIVE_EDIT,
    edit: data.edit,
    rows: data.rows,
    pagination: {
      count: data.count,
      total: data.total,
      _links: data._links,
    },
  }
}
