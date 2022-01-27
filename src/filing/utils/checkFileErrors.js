import detectFileEncoding from 'detect-file-encoding-and-language'

export default function checkFileErrors(file, cb) {
  const fileSlice = file.slice(0, 2)
  const reader = new window.FileReader()

  reader.addEventListener('load', () => {
    const firstBytes = reader.result
    const errors = []
    
    if (file && file.size !== undefined && file.name !== undefined) {
      detectFileEncoding(file).then(fileInfo => {
        if (fileInfo.encoding !== 'UTF-8'){
          errors.push(
            'The file you selected is not UTF-8 encoded. Please check your file and re-upload.'
          )
          
          // Skip additional checks to avoid false-positives
          return cb(errors)
        }

        const notTxt = file.name.split('.').slice(-1)[0].toLowerCase() !== 'txt'
        if (file.size === 0) {
          errors.push(
            'The file you uploaded does not contain any data. Please check your file and re-upload.'
          )
        }
        if (notTxt) {
          errors.push(
            'The file you uploaded is not a text file (.txt). Please check your file and re-upload.'
          )
        }
        if(firstBytes !== ('1|') && !notTxt){
          errors.push('Your file appears to be a text file (.txt) but has invalid content. Please ensure you are uploading a pipe-delimited text file and that your transmittal sheet begins with 1.');
        }

        cb(errors)
      })
    } else {
      errors.push('Your file was not uploaded. Please try again.')
      cb(errors)
    }
  })

  reader.readAsText(fileSlice)
}
