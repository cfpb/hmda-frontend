import React from 'react'
import { useDispatch } from 'react-redux'
import { fileUpload } from '../data-store/store'

/**
 * Read user-selected file contents.
 * https://gist.github.com/ilonacodes/5159f439c801004ff6505179756fac9f#file-index-jsx
 * @param {String} inputId ID of the input field
 * @param {boolean} isHidden Hide the default UI
 * @returns
 */
export const FileUpload = ({ inputId = 'file-upload', isHidden = true }) => {
  const dispatch = useDispatch()
  let fileReader

  const handleFileRead = (e) => {
    const content = fileReader.result
    dispatch(fileUpload(content))
  }

  const handleFileChosen = (file) => {
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
        onChange={(e) => handleFileChosen(e.target.files[0])}
        onClick={(e) => (e.target.value = '')}
      />
    </div>
  )
}
