import detectFileEncoding from 'detect-file-encoding-and-language'

export default function checkFileErrors(file, cb) {
  const fileSlice = file.slice(0, 2)
  const reader = new window.FileReader()

  reader.addEventListener('load', () => {
    const firstBytes = reader.result

    const notAFile = isNotAFile(file)
    if (notAFile) return cb([notAFile])

    detectFileEncoding(file).then(fileInfo => {
      const notUtf8 = encodingIsNotUtf8(fileInfo)
      if (notUtf8) return cb([notUtf8])

      const errors = [
        fileIsEmpty(file),
        extensionIsNotTxt(file),
        missingTransmittalSheet(file, firstBytes),
      ].filter(x => x)

      return cb(errors)
    })
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

function encodingIsNotUtf8(info) {
  if (info?.encoding !== 'UTF-8')
    return 'The file you selected is not UTF-8 encoded. Please check your file and re-upload.'
}

function fileIsEmpty(file) {
  if (file?.size === 0)
    return 'The file you uploaded does not contain any data. Please check your file and re-upload.'
}

function extensionIsNotTxt(file) {
  let extension = file?.name?.split('.').slice(-1)[0]?.toLowerCase()
  if (extension !== 'txt')
    return 'The file you uploaded is not a text file (.txt). Please check your file and re-upload.'
}

function missingTransmittalSheet(file, sample) {
  if (!extensionIsNotTxt(file) && sample !== '1|')
    return 'Your file appears to be a text file (.txt) but has invalid content. Please ensure you are uploading a pipe-delimited text file and that your transmittal sheet begins with 1.'
}
