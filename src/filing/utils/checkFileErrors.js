export default function checkFileErrors(file, cb, app = 'filing') {
  const fileSlice = file.slice(0, 5)
  const reader = new window.FileReader()

  reader.addEventListener('load', () => {
    const firstBytes = reader.result

    const notAFile = isNotAFile(file)
    if (notAFile) return cb([notAFile])

    const errors = [
      fileIsEmpty(file),
      extensionIsNotTxt(file),
      missingTransmittalSheet(file, app, firstBytes),
    ].filter((x) => x)

    return cb(errors)
  })

  reader.readAsText(fileSlice)
}

/**
 * Error checking functions return error string, if any
 * @returns String || undefined
 */

function isNotAFile(file) {
  if (file && file.size !== undefined && file.name !== undefined) return
  return 'Your file was not uploaded. Please try again.'
}

function fileIsEmpty(file) {
  if (file?.size === 0)
    return 'The file you uploaded does not contain any data. Please check your file and re-upload.'
}

const extensionIsTxt = (file) => {
  const extension = file?.name?.split('.').slice(-1)[0]?.toLowerCase()
  return extension === 'txt'
}

function extensionIsNotTxt(file) {
  if (!extensionIsTxt(file))
    return 'The file you uploaded is not a text file (.txt). Please check your file and re-upload.'
}

function missingTransmittalSheet(file, app, sample) {
  const invalidContentText =
    'Your file appears to be a text file (.txt) but has invalid content. '
  const detailText =
    'Please ensure you are uploading a pipe-delimited text file and that your transmittal sheet begins with 1. Verify that your file is UTF-8 encoded.'

  // In the FFVT we want to allow users to see multiple errors,
  // so always provide some message when we don't recognize the Transmittal Sheet.
  if (app === 'ffvt' && !sample.match(/^1\|/)) {
    if (extensionIsTxt(file)) return invalidContentText + detailText
    return detailText
  }

  // In the Filing app we want users to focus on one error at a time,
  // so only show missing TS or incorrect file encoding errors when file extension is txt.
  if (extensionIsTxt(file) && !sample.match(/^1\|/))
    return invalidContentText + detailText
}
