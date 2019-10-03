import React from 'react'
import LoadingIcon from '../../common/LoadingIcon.jsx'

const LoadingButton = ({loading, disabled, onClick, children}) => {
  return (
    <>
      <button onClick={onClick} disabled={disabled} className={ disabled ? 'QueryButton disabled' : 'QueryButton'}>
        {children}
      </button>
      {loading ? <LoadingIcon className="LoadingInline" /> : null}
    </>
  )
}

export default LoadingButton
