#! /usr/bin/node
const fs = require('fs')
const axios = require('axios')

// Parse command-line params
let [lei, year, rows, ...others] = process.argv.slice(2)
lei = lei || 'FRONTENDTESTBANK9999'
year = (parseInt(year) && year) || parseInt(new Date().getFullYear()) - 1
rows = rows || 10

/* 
  Due to Node filesize limits, we max out around 500K records (512MB)
  https://stackoverflow.com/questions/68230031/cannot-create-a-string-longer-than-0x1fffffe8-characters-in-json-parse
*/
let max
if (rows >= 494100) {
  max = 'MAX'
  rows = 494100
}

const OUTPUT_FILE = `${process.cwd()}/cypress/fixtures/${year}-${lei}-${max||rows}.txt`

const CONTENT = {
  // Transmittal Sheet
  TS: `1|${lei}|${year}|4|Mr. Smug Pockets|555-555-5555|pockets@ficus.com|1234 Hocus Potato Way|Tatertown|UT|84096|9|${rows}|53-1111111|${lei}\n`,
  // LAR row generator
  makeLar: uli =>
  `2|FRONTENDTESTBANK9999|${uli}|${year}0613|3|2|2|2|3|218910|5|${year}1013|1234 Hocus Potato Way|Tatertown|NM|14755|35003|35003976400|1|13||11||KE0NW|1|||||NA2IJJ7VBBQ15DTFRNK1PVWOPOXL3NH1PHUMN7S2J4|2|2|7|||||E120FYAU7BTSC3P51IL87C97W3N9VT791BMJI57RLJQSHOFDTUD7PQSPGHQ69D7I2P8JBDCBUIGRLX2BUS7SJR|DOOOI8UXY9PZDSRVFKP91CUQG95E88Y22KDR1AI3|1K1JINAYSIHCWBGJW3KOHU5D5TSK1Z61SUT5M9WQVWOHX|27|24|41|43|2|MS1LKLX7XZRKL23TV01I49RADZGUN0QY5AG9H4BJCVFTA4ZQ1EJUS1376QJXD87ZZDN5EFZIUWB8SK5EU34RVGOVTE|Y083OZN1VFT6B2XGL397ABL0Z4EV4CD45I7ZJ7FRSXXL4BRMKVPR5UCVV0K6IDLP7WLCBZAQ5KXT69PNE9PWQKCPKJB|UV0FTHG00G8WM65I7591IJYP9TEMXMDCVGZYRJTBUBBKEZI65HGL9ML|3|2|2|2|1|1|75|44|85|0|NA|3|2|8888|8888|9||9||10|||||NA|NA|NA|NA|NA|NA|NA|NA|NA|256|29|2|2|2|2|NA|1|2|4|NA|2|2|NA|3|1|5|1||DOREBESQSW1QT58SD2OZTHQUGXLSKCAJYZ63NJE2MUIAFQL4KW6PU26YSU786GT0IMCWWKCN25Y7KU0VLU0PPKWR8G6DKWI9BANPIE9I2ZZ5XDUX0TBAY4XFRFQZF087WS9ESTAKIV5V9HSZ2VXW7J5JMGPP4CGYA51BK68T57NN4KTKJVXIQMFXBTN5E3LGKKX3LITQ4C7OPFJ|8|6|5|5|||2|2|1\n`,
}

console.log('\n\nInitializing output file... ')
try {
  fs.writeFileSync(OUTPUT_FILE, CONTENT.TS, { flag: 'w+' })
  console.log('  - Transmittal row created. ')
  console.log('  - Output file created. ')
} catch (err) {
  console.log('Error! ')
  console.error(err)
}

const generateLarRows = async () => {
  console.log('Generating LAR... ')
  for (let i = 0; i < rows; i++) {
    let loanId = `FRONTENDTESTBANK9999${i.toString().padStart(23, 0)}`

    const body = { loanId }
    const response = await axios.post(
      'http://localhost:9091/uli/checkDigit',
      body
    )
    fs.appendFileSync(OUTPUT_FILE, CONTENT.makeLar(response.data.uli))
  }
  console.log(`  - ${rows} rows generated. \n`)
}

generateLarRows()