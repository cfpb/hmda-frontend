import React from "react"
import "./InputAndLabel.css"

const InputAndLabel = ({
  labelName,
  value,
  onChange,
  type,
  disabled,
  emailSubtext,
}) => {
  return (
    <div className='container'>
      {type === "email" ? (
        <>
          <label className='email_label'>{labelName}</label>
          {emailSubtext && <p>{emailSubtext}</p>}
          <input
            type='email'
            value={value}
            disabled={disabled}
          />
        </>
      ) : (
        <>
          <label>{labelName}</label>
          <input value={value} onChange={onChange} />
        </>
      )}
    </div>
  )
}

export default InputAndLabel
