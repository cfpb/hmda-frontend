import React, { useState } from 'react'
import LoadingIcon from '../common/LoadingIcon'
import warningIcon from './images/warning.png'

const STATUSES = {
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
}

const getIndicator = (status) => {
  let content

  if (!status || status === STATUSES.SUCCESS) return
  if (status === STATUSES.LOADING)
    content = <LoadingIcon className='LoadingInline' />
  if (status === STATUSES.ERROR) content = <img src={warningIcon} />

  return <div className='status'>{content}</div>
}

export const useStatusIndicator = (init) => {
  const [status, setStatus] = useState(init)

  const methods = {
    setLoading: () => setStatus(STATUSES.LOADING),
    setSuccess: () => setStatus(STATUSES.SUCCESS),
    setError: () => setStatus(STATUSES.ERROR),
  }

  return [getIndicator(status), methods]
}

export default useStatusIndicator
