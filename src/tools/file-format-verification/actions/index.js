import * as types from '../constants'

export function updateStatus(status) {
  return {
    type: types.UPDATE_STATUS,
    status: status,
  }
}

export function setFilingPeriod(filingPeriod) {
  return {
    type: types.SET_FILING_PERIOD,
    filingPeriod: filingPeriod,
  }
}

export function selectFile(file, previousErrors = []) {
  return {
    type: types.SELECT_FILE,
    file,
    errors: previousErrors,
  }
}

export function uploadError(error) {
  return {
    type: types.UPLOAD_ERROR,
    errors: error,
  }
}

export function beginParse() {
  return {
    type: types.BEGIN_PARSE,
  }
}

export function endParse(data) {
  return {
    type: types.END_PARSE,
    transmittalSheetErrors: data.transmittalSheetErrors,
    larErrors: data.larErrors,
  }
}

export function triggerParse(file) {
  return (dispatch) => {
    dispatch(beginParse())
    var formData = new FormData()
    formData.append('file', file)

    fetch('/v2/public/hmda/parse', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then((response) => {
        if (response.status >= 400) {
          dispatch(
            uploadError([
              'Sorry, something went wrong with the upload. Please try again.',
            ]),
          )
          throw new Error('Bad response from server.')
        }
        return response.json()
      })
      .then((success) => {
        let data = { transmittalSheetErrors: [], larErrors: [] }
        success.forEach((error) => {
          if (error.rowNumber === 1) {
            data.transmittalSheetErrors.push(...error.errorMessages)
          } else {
            const messages = error.errorMessages.map((emsg) => ({
              ...emsg,
              uli: error.estimatedULI,
              row: error.rowNumber,
            }))

            data.larErrors.push(...messages)
          }
        })
        dispatch(endParse(data))
      })
      .catch((error) => console.log('ERROR', error))
  }
}

export function setPage(page) {
  return {
    type: types.SET_PAGE,
    page,
  }
}

export function paginationFadeIn() {
  return {
    type: types.PAGINATION_FADE_IN,
  }
}

export function paginationFadeOut() {
  return {
    type: types.PAGINATION_FADE_OUT,
  }
}
