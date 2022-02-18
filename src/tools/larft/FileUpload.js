import React from 'react';

/**
 * Read user-selected file contents. 
 * https://gist.github.com/ilonacodes/5159f439c801004ff6505179756fac9f#file-index-jsx
 * @param {function} onContentReady Callback the gets the file content when ready
 * @param {boolean} isHidden Hide the default UI
 * @param {String} inputId ID of the input field
 * @returns 
 */
export const FileUpload = ({
  onContentReady,
  isHidden = true,
  inputId='file-upload'
}) => {
  let fileReader

  const handleFileRead = e => {
    const content = fileReader.result
    onContentReady(content)
  }

  const handleFileChosen = file => {
    if (!file) return
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <div className='file-upload-hidden'>
      <input
        id={inputId}
        hidden={isHidden}
        type='file'
        className='input-file'
        accept='.txt'
        onChange={e => handleFileChosen(e.target.files[0])}
        onClick={e => e.target.value = ''}
      />
    </div>
  )
}