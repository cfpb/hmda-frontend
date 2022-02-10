const fs = require('fs')
const TS_SCHEMA_RAW = require('./SchemaTsRaw').default
const LAR_SCHEMA_RAW = require('./SchemaLarRaw').default

const prettyJSON = json => JSON.stringify(JSON.parse(json), null, 2)

const parse = (raw, name) => {
  const isTs = !!name.toLowerCase().includes('ts')

  return raw
    .split('\n')
    .filter(s => s && !s.match(/^"All data fields in the LAR/))
    .map((line, idx) => {
      const [fname, ftype, fvalues, fDataPoint, maxLength] = line
        .split('|')
        .map(s => s.trim())

      const fieldName = fname
        .split('->')[0]
        .replace(/\\|#|\[",/g, '')
        .replace(/"/g, '')
        .replace(/{hyphen}/g, '-')
        .trim()

      const examples = []
      const values = []

      fvalues.split(',').forEach(opt => {
        // Example
        if (opt.match(/^Numeric/))
          return examples.push(opt.split('-')[1].trim())
        
        if (
          opt.toLowerCase().includes('example') ||
          opt.toLowerCase().includes('(or)')
        ) {
          let _opt = opt.replace(/{hyphen}/g, '-')
          _opt = _opt.replace(/{comma}/g, ',')
          return examples.push(_opt.trim())
        }
        
        const [val, desc] = opt
          .split('-')
          .filter(x => x)
          .map(x => {
            x = x.replace(/{hyphen}/g, '-')
            x = x.replace(/{comma}/g, ',')
            return x.trim()
          })

        if (!val) return
        if (!desc) return examples.push(val)

        // Values
        return values.push({ value: val, description: desc || val })
      })

      const fieldLength = maxLength?.split('_')[1] || 255

      const obj = {
        fieldIndex: idx,
        fieldName,
        fieldLength,
        fieldType: 'Alphanumeric',
        examples,
        values,
      }

      // Include Data Point for LAR
      if (!isTs) {
        let dataPoint
        if (!fDataPoint || fDataPoint === 'self') dataPoint = fieldName
        else dataPoint = fDataPoint
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
