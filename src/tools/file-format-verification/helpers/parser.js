import hmdaFileParser from 'hmda-file-parser'

const parser = new hmdaFileParser.hmda.parser.fi.CsvParser()

export const parseTS = ts => {
  const results = parser.parseTs(ts)
  if(results.errors) return results.errors
}

export const parseLar = (lar, row) => {
  const results = parser.parseLar(lar)
  if(results.errors){
    const annotated = []
    for(let i=0; i<results.errors.length; i++){
      annotated[i] = {error:results.errors[i], row: row}
    }
    return annotated
  }
}
