import FileSaver from 'file-saver'
import React, { useState } from 'react'
import { IRS } from '../../../common/s3/fileProxy.js'
import { fetchData } from '../../api/fetch.js'
import { useCallback } from 'react'
import { error } from '../../utils/log.js'
import { DownloadStatus } from './DownloadStatus'

const noOp = () => null

/**
 * Download an Institution's IRS file (CSV)
 * @param {String} period YearQuarter
 * @param {String} lei Institution identifier
 * @param {Object} opts Additional options
 */
const download = (period, lei, opts) => {
  const onResult = opts.onResult || noOp

  onResult(null) // Reset status on each download request

  const fetchOptions = {
    url: IRS.buildURL(period, lei),
    params: {
      format: 'csv',
    },
  }

  // IRS proxy endpoint requires Authentication and the fetchData method encapsulates that
  fetchData(fetchOptions)
    .then((data) => {
      // Successful will be a string with content
      if (typeof data !== 'string' || !data.length) {
        onResult(false)
        return
      }

      FileSaver.saveAs(
        new Blob([data], { type: 'text/csv;charset=utf-16' }),
        `${period}-${lei}-nationwide-irs.csv`,
      )

      onResult(true)
    })
    .catch((_) => {
      error(`Error fetching ${period} IRS for ${lei}`)
      onResult(false)
    })
}

/**
 * Encapsulates IRS downloading
 * @param {Object} props
 * @param {String} props.period YearQuarter
 * @param {String} props.lei Institution ID
 */
export const DownloadIRS = ({ period, lei }) => {
  const [irsReady, setIrsReady] = useState(null)

  const clickHandler = useCallback(() => {
    download(period, lei, { onResult: setIrsReady })
  }, [period, lei, setIrsReady])

  return (
    <p className='flex-inline'>
      When ready, the IRS will be available for{' '}
      <button className='download-irs' onClick={clickHandler}>
        download here
      </button>
      .
      <DownloadStatus success={irsReady} />
    </p>
  )
}

export default DownloadIRS
