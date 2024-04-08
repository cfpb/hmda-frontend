/**
 * Script to generate JSON versions of LAR and TS schema from the Platform's
 * pipe-separated (PSV) definitions. This script is mostly to provide a quick
 * starting point for Frontend integration of LAR/TS schemas.
 *
 * Note: Not all fields in the JSON are automatically derived from the PSV version.
 * Beware of any deletions which result from running this script.
 *
 * To run:
 * - cd hmda-frontend/src/tools/larft/schema
 * - node schemaGenerator.js
 */

const fs = require('fs')

const readFile = (name) => fs.readFileSync(name, 'utf8')

// PSV schema files from the HMDA Platform
let TS_SCHEMA_RAW = readFile(`${__dirname}/schema_ts.psv`)
let LAR_SCHEMA_RAW = readFile(`${__dirname}/schema_lar.psv`)

const unity = (x) => x
const prettyJSON = (json) => JSON.stringify(JSON.parse(json), null, 2)

const cleanupFieldName = (str) =>
  str
    ?.split('->')[0]
    .replace(/\\|#|\[",/g, '')
    .replace(/"/g, '')
    .replace(/{hyphen}/g, '-')
    .replace(/{comma}/g, ',')
    .trim()

const cleanString = (str) => {
  const cleaned = str
    ?.replace(/\\|#|\[",/g, '')
    .replace(/"/g, '')
    .replace(/{comma}/g, ',')
    .trim()

  return cleaned?.length ? cleaned : null
}

const convertType = (type) =>
  type.includes('yyyyddmm')
    ? 'date'
    : type.includes('.toString')
      ? 'enum'
      : 'string'

const parse = (raw, name) => {
  const isTs = !!name.toLowerCase().includes('ts')

  return raw
    .split('\n')
    .slice(1)
    .filter((s) => s && !s.match(/^"All data fields in the LAR/))
    .map((line, idx) => {
      const [
        field_name,
        _field_type,
        _enumerations,
        _examples,
        _descriptions,
        data_point,
      ] = line.split('|').map((s) => s.trim())

      const fieldName = cleanupFieldName(field_name)

      const examples = _examples?.split(',').map(cleanupFieldName).filter(unity)
      const descriptions = _descriptions
        ?.split(',')
        .map(cleanupFieldName)
        .filter(unity)
      const enumerations = _enumerations
        ?.split(',')
        .map(cleanString)
        .map((opt) => {
          const [val, desc] =
            opt
              ?.split('-')
              .filter((x) => x)
              .map((x) => cleanupFieldName(x)) || []

          if (!val) return
          
          // Special case: Intentionally empty string value
          const finalVal = val == '{empty}' ? "" : val
          return { value: finalVal, description: desc || val }
        })
        .filter(unity)

      const obj = {
        fieldIndex: idx,
        fieldName,
        examples,
        enumerations,
        descriptions,
      }

      // Only the OLARFT determines if this is a TS or LAR row
      if (fieldName == "Record Identifier")
        obj.disable = true 

      if (fieldName == "Total Number of Entries Contained in Submission") {
        obj.disable = true 
        obj.tooltip = "Field is automatically populated with the count of LAR Rows"
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
