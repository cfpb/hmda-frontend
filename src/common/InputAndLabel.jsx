import React from 'react'
import './InputAndLabel.css'

const InputAndLabel = ({
  labelName,
  value,
  onChange,
  type,
  disabled,
  emailSubtext,
  setUserIsEditingForm,
}) => {
  const error = value.length === 0 ? `${labelName} is required` : ''
  const handleChange = (event) => {
    onChange(event)
    // Enables the button in form
    setUserIsEditingForm(true)
  }

  return (
    <div className='container'>
      {type === 'email' ? (
        <>
          <label className='email_label'>{labelName}</label>
          {emailSubtext && <p>{emailSubtext}</p>}
          <input type='email' value={value} disabled={disabled} />
        </>
      ) : (
        <>
          {error ? (
            <p className='error'>{error}</p>
          ) : (
            <label>{labelName}</label>
          )}
          <input value={value} onChange={handleChange} />
        </>
      )}
    </div>
  )
}

export default InputAndLabel
