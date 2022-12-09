import { unity } from './common'
import { stringifyRow } from './row'

export const formatFileName = ts => {
  if (
    ts['Calendar Year'] &&
    ts['Calendar Quarter'] &&
    ts['Legal Entity Identifier (LEI)']
  ){
    return `${ts['Calendar Year']}-${ts['Calendar Quarter']}-${ts['Legal Entity Identifier (LEI)']}`
  }

  return 'LarFile'
}

export function downloadFile(filename, text) {
  var element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export const createFileContent = (ts, lars) =>
  ts
    .concat(lars)
    .map(stringifyRow)
    .filter(unity)
    .map(s => s.trim())
    .join('\n')