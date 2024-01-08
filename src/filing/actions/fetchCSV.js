import fileSaver from 'file-saver'
import receiveError from './receiveError.js'
import hasHttpError from './hasHttpError.js'
import requestCSV from './requestCSV.js'
import { getCSV } from '../api/api.js'
import { error } from '../utils/log.js'

// downloading the csv edit reports, no reducer required
export default function fetchCSV(lei, filing, submissionId) {
  return (dispatch) => {
    dispatch(requestCSV())
    return getCSV({
      lei: lei,
      filing: filing,
      submission: submissionId,
    })
      .then((csv) => {
        return hasHttpError(csv).then((hasError) => {
          if (hasError) {
            dispatch(receiveError(csv))
            throw new Error(csv && `${csv.status}: ${csv.statusText}`)
          }
          return fileSaver.saveAs(
            new Blob([csv], { type: 'text/csv;charset=utf-16' }),
            `${lei}-${submissionId}-full-edit-report.csv`,
          )
        })
      })
      .catch((err) => {
        error(err)
      })
  }
}
