import { grabRawArea } from './Piped'
import { parseRow } from './utils'

export const pastePiped = (setRow) => {
  return () => {
    if (navigator?.clipboard?.readText) {
      navigator.clipboard
        .readText()
        .then(clipText => setRow(parseRow(clipText)))
    } else {
      document.getElementById('paste-button-input')
      el.select()
      document.execCommand('paste')
      var event = new Event('change')
      el.dispatchEvent(event)
    }
  }
}

/**
 * Copy pipe-delimited row to user's clipboard
 */
 export const copyPiped = () => {
  const el = grabRawArea()
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(el?.value).then(
      _success => console.log('Success'),
      _failed => console.error('Failed')
    )
  } else {
    el.select()
    document.execCommand('copy')
  }
}