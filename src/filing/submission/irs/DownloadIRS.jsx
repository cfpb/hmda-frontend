import { fetchData } from '../../api/fetch.js'
import { IRS } from '../../../common/s3/fileProxy.js'
import FileSaver from 'file-saver'
import { GoCloudDownload } from 'react-icons/go'
import { IoWarningOutline } from 'react-icons/io5'

/**
 * Download an Institution's IRS file (CSV)
 * @param {String} period YearQuarter
 * @param {String} lei Institution identifier
 */
const download = (period, lei) => {
  const options = {
    url: IRS.buildURL(period, lei),
    params: {
      format: 'csv',
    },
  }

  // Endpoint requires Authentication and the fetchData method encapsulates that
  fetchData(options).then(data => {
    console.log('Response: ', data)

    if (data && typeof data !== 'object') {
      console.log('Saving file!')
      FileSaver.saveAs(
        new Blob([data], { type: 'text/csv;charset=utf-16' }),
        `${period}-${lei}-nationwide-irs.csv`
      )
    }
  })
}

const DownloadIRS = ({ period, lei, isReady, setIrsReady }) => {
  if (!isReady) return (
    <p className='download-irs' onClick={() => setIrsReady(true)}>
      <IoWarningOutline />
      <span style={{ marginLeft: '5px' }}>
        {' '}
        When ready, the IRS will be available for download here.
      </span>
    </p>
  )

  return (
    <p className='flex-inline'>
      <button
        className='download-irs ready'
        disabled={!isReady}
        onClick={() => setIrsReady(false)}
      >
        <GoCloudDownload />
      </button>
      <button
        className='download-irs ready'
        disabled={!isReady}
        onClick={() => download(period, lei)}
      >
        <span style={{ marginLeft: '5px' }}>Download your IRS here</span>
      </button>
    </p>
  )
}

export default DownloadIRS