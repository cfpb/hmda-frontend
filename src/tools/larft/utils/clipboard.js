import { log } from './common'
import { parseRow } from './row'
import { grabRawArea } from './textArea'

/**
 * Paste clipboard content into EditPiped textbox
 *
 * @param {Function} setFn Handler to update the currently edited row
 */
export const pastePiped = (setFn) => {
  return () => {
    if (navigator?.clipboard?.readText) {
      navigator.clipboard
        .readText()
        .then((clipText) => setFn(parseRow(clipText)))
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
      (_success) => log('[Piped] Copied to clipboard!'),
      (_failed) => log('[Piped] Error - Failed to copy!'),
    )
  } else {
    el.select()
    document.execCommand('copy')
  }
}
