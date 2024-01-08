import React from 'react'
import Loading from '../../common/LoadingIcon.jsx'

export const wrapLoading = (i = 0) => {
  return (
    <div key={i} style={{ height: '100px' }}>
      <Loading className='floatingIcon' />
    </div>
  )
}
