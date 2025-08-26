import React from 'react'
import { PropTypes } from 'prop-types'
import InputTextArea from './InputTextArea'
import { notesInput } from './constants/inputs'

function Notes(props) {
  const { hide, notes, onBlur, onChange, prevNotes, required } = props

  if (hide) return null

  if (required)
    return (
      <InputTextArea
        key={notesInput.id}
        value={notes || ''}
        {...notesInput}
        onChange={onChange}
        onBlur={onBlur}
        placeholder='e.g. Case #123 - Updated Tax ID due to acquisition.'
      />
    )

  return (
    <InputTextArea
      key={notesInput.id}
      {...notesInput}
      disabled
      value={prevNotes || ''}
    />
  )
}

Notes.propTypes = {
  notes: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  prevNotes: PropTypes.string,
  required: PropTypes.bool,
}

export default Notes
