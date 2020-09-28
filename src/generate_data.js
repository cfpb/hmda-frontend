/*
 * Invocation:
 * node <path_to_script> <geography> <data_csv> <output_dir>
 *
 * This command is run with node against the unfiltered, nationwide
 * dataset from the data-browser, as downloaded for a given year.
 * Output: a directory of json files with the following structure:
 *   {geography}-{variable}-{value}.json with non-alphanumeric
 *   characters replaced by '-'
 * Once this output file is generated it can be copied to an S3 bucket
 * with the aws-cli as follows:
 * aws s3 cp <output_dir> <s3://bucket/path/to/dir> --recursive
 * The current prefix per year is /prod/data-browser/filter-data/<year>/
 */

const variables = JSON.parse('{"loanProduct":{"index":7,"values":["Conventional:First Lien","FHA:First Lien","VA:First Lien","FSA/RHS:First Lien","Conventional:Subordinate Lien","FHA:Subordinate Lien","VA:Subordinate Lien","FSA/RHS:Subordinate Lien"]},"dwellingCategory":{"index":8,"values":["Single Family (1-4 Units):Site-Built","Multifamily:Site-Built","Single Family (1-4 Units):Manufactured","Multifamily:Manufactured"]},"ethnicity":{"index":9,"values":["Hispanic or Latino","Not Hispanic or Latino","Joint","Ethnicity Not Available","Free Form Text Only"]},"race":{"index":10,"values":["American Indian or Alaska Native","Asian","Black or African American","Native Hawaiian or Other Pacific Islander","White","2 or more minority races","Joint","Free Form Text Only","Race Not Available"]},"sex":{"index":11,"values":["Male","Female","Joint","Sex Not Available"]},"actionTaken":{"index":12,"values":["1","2","3","4","5","6","7","8"]},"loanType":{"index":15,"values":["1","2","3","4"]},"loanPurpose":{"index":16,"values":["1","2","31","32","4","5"]},"lienStatus":{"index":17,"values":["1","2"]},"constructionMethod":{"index":39,"values":["1","2"]},"totalUnits":{"index":43,"values":["1","2","3","4","5-24","25-49","50-99","100-149",">149"]},"age":{"index":77,"values":["<25","25-34","35-44","45-54","55-64","65-74",">74"]}}')

if(process.argv.length !== 5) {
  console.error(`
    Wrong number of arguments. Invoke this command as follows:
    First argument: "state" or "county"
    Second argument: Path to unfiltered, nationwide csv from the data-browser
    Third argument: Output directory where generated json files will be written
  `)
  process.exit(1)
}

let [GEOGRAPHY, DATA_FILE, OUTPUT_DIR] = process.argv.slice(2)
GEOGRAPHY = GEOGRAPHY.toLowerCase()
const outputs = {}
const varKeys = Object.keys(variables)

function getKey(v, val) {
  return v + '-' + val.replace(/[^a-z0-9]/ig, '-').toLowerCase()
}

varKeys.forEach(v => {
  variables[v].values.forEach(val => {
    outputs[getKey(v, val)] = {}
  })
})

const fs = require('fs')
const path = require('path')
const split = require('split2')

let firstLine = 1
let geoIndex


if(GEOGRAPHY === 'county'){
  geoIndex = 4
}else if(GEOGRAPHY === 'state'){
  geoIndex = 3
}else{
  console.error('Provide state or county as the first argument')
  process.exit(1)
}

function addField(curr, name, fields, index) {
  const field = fields[index]

  let dataList = curr[name]
  if(!dataList) dataList = curr[name] = {}

  if(!dataList[field]) dataList[field] = 0
  dataList[field]++
}

function processLine(line) {
  if(firstLine) {
    firstLine = 0
    return
  }

  const fields = line.split(',')
  const geo = fields[geoIndex]

  varKeys.forEach(v => {
    const {values, index} = variables[v]
    values.forEach(val => {
      if(fields[index] === val){
        const obj = outputs[getKey(v, val)]

        let curr = obj[geo]
        if(!curr) curr = obj[geo] = {}
        varKeys.forEach(innerV => {
          if(innerV !== v) {
            addField(curr, innerV, fields, variables[innerV].index)
          }
        })
      }
    })
  })
}


fs.createReadStream(DATA_FILE)
  .pipe(split())
  .on('data', processLine)
  .on('end', function(){
    Object.keys(outputs).forEach(key => {
      const f = path.join(
        (OUTPUT_DIR),
        GEOGRAPHY + '-' + key + '.json'
      )

      fs.writeFile(f, JSON.stringify(outputs[key]), e => e && console.error(e))
    })
  })
