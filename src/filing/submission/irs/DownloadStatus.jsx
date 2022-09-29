import React from 'react'
import { BsCheckCircle, BsExclamationTriangleFill } from 'react-icons/bs'

/**
 * Display a message after attempting to download an IRS
 * @param {Object} props
 * @param {boolean|null} props.success
 * @returns
 */
export const DownloadStatus = ({ success }) => {
  if (success === null) return success

  if (success)
    return (
      <span className='flex-inline status success '>
        <BsCheckCircle />
        IRS downloaded!
      </span>
    )

  return (
    <span className='flex-inline status'>
      <BsExclamationTriangleFill />
      IRS not found
    </span>
  )
}
