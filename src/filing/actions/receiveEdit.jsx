import React from 'react'
import * as types from '../constants'

const PATTERN_1111 = /^1111(\.0)?$/
const PATTERN_888_8888 = /^888(\.0)?$|^88888(\.0)?$/

/**
 *  Highlight fields whose value matches a pattern
 */
const highlightEditFields = (rows = [], pattern = PATTERN_1111) =>
  rows.map((r) => {
    if (!r.fields) return
    let row = JSON.parse(JSON.stringify(r))

    row.fields = row.fields.map((field) => {
      if (!field.value.match(pattern)) return field
      field.value = <span className='highlight'>{field.value}</span>
      return field
    })

    return row
  })

/**
 * Configure transformations per Edit
 */
const TRANSFORMERS = {
  Q656: {
    type: 'regex',
    filter: highlightEditFields,
    pattern: PATTERN_1111,
  },
  Q657: {
    type: 'regex',
    filter: highlightEditFields,
    pattern: PATTERN_1111,
  },
  'Q659-1': {
    type: 'regex',
    filter: highlightEditFields,
    pattern: PATTERN_888_8888,
  },
}

export default function receiveEdit(data) {
  const useTransform = TRANSFORMERS[data.edit]

  const rows =
    useTransform && useTransform.type === 'regex'
      ? useTransform.filter(data.rows, useTransform.pattern)
      : data.rows

  return {
    type: types.RECEIVE_EDIT,
    edit: data.edit,
    rows,
    pagination: {
      count: data.count,
      total: data.total,
      _links: data._links,
    },
  }
}
