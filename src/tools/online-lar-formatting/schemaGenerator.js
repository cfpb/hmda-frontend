const fs = require('fs')

const readFile = (name) => fs.readFileSync(name, 'utf8')
// const dir = dirname(__FILE__)

let TS_SCHEMA_RAW = readFile(`${__dirname}/schema_ts.psv`)
let LAR_SCHEMA_RAW = readFile(`${__dirname}/schema_lar.psv`)




const unity = x => x
const prettyJSON = json => JSON.stringify(JSON.parse(json), null, 2)

const cleanupFieldName = str =>
  str
    ?.split('->')[0]
    .replace(/\\|#|\[",/g, '')
    .replace(/"/g, '')
    .replace(/{hyphen}/g, '-')
    .trim()

const cleanString = str =>{
  const cleaned = str
    ?.replace(/\\|#|\[",/g, '')
    .replace(/"/g, '')
    .replace(/{hyphen}/g, '-')
    .replace(/{comma}/g, ',')
    .trim()
  
  return cleaned?.length ? cleaned : null
}

const convertType = type =>
  type.includes('yyyyddmm')
    ? 'date'
    : type.includes('.toString')
    ? 'enum'
    : 'string'

const parse = (raw, name) => {
  const isTs = !!name.toLowerCase().includes('ts')

  return raw
    .split('\n')
    .slice(2)
    .filter(s => s && !s.match(/^"All data fields in the LAR/))
    .map((line, idx) => {
      const [
        field_name,
        _field_type,
        _enumerations,
        _examples,
        _descriptions,
        data_point,
      ] = line.split('|').map(s => s.trim())

      const fieldName = cleanupFieldName(field_name)

      const examples = _examples?.split(',').map(cleanString).filter(unity)
      const descriptions = [_descriptions].map(cleanString).filter(unity)
      const enumerations = _enumerations
        ?.split(',')
        .map(cleanString)
        .map(opt => {
          const [val, desc] = opt
            ?.split('-')
            .filter(x => x)
            .map(x => {
              x = x.replace(/{hyphen}/g, '-')
              x = x.replace(/{comma}/g, ',')
              return x.trim()
            }) || []

          if (!val) return
          return { value: val, description: desc || val }
        })
        .filter(unity)
      

      // const fieldLength = maxLength?.split('_')[1] || 255
      // const fieldType = convertType(_field_type)

      const obj = {
        fieldIndex: idx,
        fieldName,
        // fieldLength,
        // fieldType,
        examples,
        enumerations,
        descriptions,
      }

      // Include Data Point for LAR
      if (!isTs) {
        let dataPoint
        if (!data_point || data_point === 'self') dataPoint = fieldName
        else dataPoint = data_point
        obj.dataPoint = dataPoint.trim().replace(/{hyphen}/g, '-')
      }

      return JSON.stringify(obj)
    })
    .join(',')
}

const makeJsonSchema = (raw, name) =>
  prettyJSON(`{ "name": "${name}", "schema": [${parse(raw, name)} ] }`)

const saveFile = (fileName, fileContent) => {
  try {
    fs.writeFileSync(`${__dirname}/${fileName}.json`, fileContent, {
      flag: 'w+',
    })
  } catch (err) {
    console.error(err)
  }
}

saveFile('SchemaTs', makeJsonSchema(TS_SCHEMA_RAW, 'TS Schema'))
saveFile('SchemaLar', makeJsonSchema(LAR_SCHEMA_RAW, 'LAR Schema'))
