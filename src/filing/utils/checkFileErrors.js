export default function checkFileErrors(file, cb) {
  const fileSlice = file.slice(0, 2)
  const reader = new window.FileReader()

  reader.addEventListener('load', () => {
    const firstBytes = reader.readAsText(fileSlice)
    console.log(firstBytes)

    const errors = []

    if (file && file.size !== undefined && file.name !== undefined) {
      if (file.size === 0) {
        errors.push(
          'The file you uploaded does not contain any data. Please check your file and re-upload.'
        )
      }
      if (
        file.name
          .split('.')
          .slice(-1)[0]
          .toLowerCase() !== 'txt' ||
        firstBytes !== ('1|')
      ) {
        errors.push(
          'The file you uploaded is not a text file (.txt). Please check your file and re-upload.'
        )
      }
    } else {
      errors.push('Your file was not uploaded. Please try again.')
    }

    cb(errors)
  })
}
