import React from 'react'
import Message from './Message'
import LoadingIcon from '../Loading'

export const RegenerateButton = ({ onClick, error, message, waiting, disabled }) => {
  let cname = 'inputSubmit'
  if(waiting || disabled) cname += ' disabled'

  return (
    <div className="regenerate-container">
      <span
        onClick={onClick}
        className={cname}
        style={{ margin: '0 auto' }}
      >
        Regenerate
      </span>
      {waiting && <LoadingIcon className="LoadingInline" />}
      <Message isError={error} message={message} />
    </div>
  )
}
