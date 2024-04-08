import React from 'react'
import LoadingIcon from '../../common/LoadingIcon.jsx'

function makeClassname(opts = {}) {
  let cname = 'QueryButton'
  if (opts.disabled) cname += ' disabled'
  if (opts.secondary) cname += ' secondary'

  return cname
}

const LoadingButton = ({
  loading,
  disabled,
  onClick,
  children,
  secondary,
  dataUrl,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        className={makeClassname({ disabled, secondary })}
        data-url={dataUrl}
      >
        {children}
      </button>
      {loading ? <LoadingIcon className='LoadingInline' /> : null}
    </>
  )
}

export default LoadingButton
