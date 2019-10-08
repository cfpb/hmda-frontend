import reader from 'filereader-stream'
import split from 'split2'

import { parseTS, parseLar } from './parser.js'

export const concatErrors = (errors, list) => {
  if(errors){
    for(let i=0; i<errors.length; i++){
      list.push(errors[i])
    }
  }
}

export default function (file) {

  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('Must provide file to parse.'))

    const tsErrors = []
    const larErrors = []
    let currentLine = 0

    const fileStream = reader(file)
    const lineStream = split()

    const rejectOnErr = (err) => reject(err)

    fileStream.pipe(lineStream).on('data', (data) => {
      if(++currentLine === 1){
        concatErrors(parseTS(data), tsErrors)
      }else{
        concatErrors(parseLar(data, currentLine), larErrors)
      }
    })

    lineStream.on('end', () => {
      resolve({
        transmittalSheetErrors: tsErrors,
        larErrors: larErrors
      })
    })

    fileStream.on('error', rejectOnErr)
    lineStream.on('error', rejectOnErr)

  })
}
