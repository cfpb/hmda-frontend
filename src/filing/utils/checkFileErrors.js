export default function checkFileErrors(file) {
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
        .toLowerCase() !== 'txt'
    ) {
      errors.push(
        'The file you uploaded is not a text file (.txt). Please check your file and re-upload.'
      )
    }
  } else {
    errors.push('Your file was not uploaded. Please try again.')
  }
  return errors
}
