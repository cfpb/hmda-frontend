import axios from 'axios'
import fs from 'fs'
import { ACTION_TAKEN_MMDD, COUNTY, MAX_ROWS, TRACTS } from './constants.mjs'

export const buildCensusTract = (year) => {
  const tract = year > 2021 ? TRACTS['2022+'] : TRACTS.default
  return `${COUNTY}${tract}`
}

export const getFilePath = ({ lei, rows, yearQuarter }) => {
  const rowCount = parseInt(rows) == MAX_ROWS ? 'MAX' : rows
  return `${process.cwd()}/cypress/fixtures/${yearQuarter}-${lei}-${rowCount}.txt`
}

export const makeRowTS = ({ year, rows, lei, quarter }) =>
  `1|HMDA Test Institution|${year}|${quarter}|Mr. Smug Pockets|555-555-5555|pockets@ficus.com|1234 Hocus Potato Way|Tatertown|UT|84096|9|${rows}|53-1111111|${lei}\n`

export const makeRowLAR = ({ uli, year, lei, quarter, county = COUNTY }) => {
  const censusTract = buildCensusTract(year)
  const actionTakenDate = `${year}${ACTION_TAKEN_MMDD[quarter]}`

  return `2|${lei}|${uli}|${year}0113|3|2|2|2|3|218910|5|${actionTakenDate}|1234 Hocus Potato Way|Washington|DC|14755|${county}|${censusTract}|1|13||11||KE0NW|1||||||2|2|7||||||||27|24|41|43|2||||3|2|2|2|1|1|75|44|85|0|NA|3|2|8888|8888|9||9||10|||||NA|NA|NA|NA|NA|NA|NA|NA|NA|256|29|2|2|2|2|NA|1|2|4|NA|2|2|NA|3|1|5|1||DOREBESQSW1QT58SD2OZTHQUGXLSKCAJYZ63NJE2MUIAFQL4KW6PU26YSU786GT0IMCWWKCN25Y7KU0VLU0PPKWR8G6DKWI9BANPIE9I2ZZ5XDUX0TBAY4XFRFQZF087WS9ESTAKIV5V9HSZ2VXW7J5JMGPP4CGYA51BK68T57NN4KTKJVXIQMFXBTN5E3LGKKX3LITQ4C7OPFJ|8|6|5|5|||2|2|1\n`
}

export const initializeFile = ({ filePath, ts }) => {
  console.log('\n\nInitializing output file... ')
  fs.writeFileSync(filePath, ts, { flag: 'w+' })
  console.log('  - Output file created. ')
  console.log('  - Transmittal row created. ')
}

export const generateLarRows = async ({
  lei,
  rows,
  year,
  filePath,
  quarter,
}) => {
  console.log('Generating LAR... ')
  for (let i = 0; i < rows; i++) {
    const body = { loanId: `${lei}${i.toString().padStart(23, 0)}` }
    const response = await getCheckDigit(body)
    const uli = response.data.uli

    const larRow = makeRowLAR({ uli, year, lei, quarter })
    fs.appendFileSync(filePath, larRow) // Save row to file
  }
  console.log(`  - ${rows} rows generated. \n`)
}

const getCheckDigit = async (reqBody) => {
  return await axios.post('http://localhost:9091/uli/checkDigit', reqBody)
}
