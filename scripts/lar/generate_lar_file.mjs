#! /usr/bin/node
import { MAX_ROWS } from './constants.mjs'
import {
  getFilePath,
  makeRowTS,
  initializeFile,
  generateLarRows,
} from './lar_helpers.mjs'

/**
 * Usage:
 *   node ./generate_lar_file.mjs <LEI> <YEAR> <NUM_ROWS>
 *
 *  Generate load test file
 *   yarn make-lar frontendtestbank9999 2020 MAX
 **/

const _logError = (msg) => console.error(`\n[Error] ${msg}\n`)

const _checkRequiredArg = (label, value) => {
  if (value) return
  _logError(`Missing required arg: <${label}>\n`)
  process.exit(1)
}

// Parse command-line params
let [lei, yearQuarter, rows, ...others] = process.argv.slice(2)

// Verify required params are provided
_checkRequiredArg('lei', lei)
_checkRequiredArg('yearQuarter', yearQuarter)

// Parse params + Set reasonable defaults
lei = lei.toUpperCase()
let [year, quarter] = yearQuarter
  .replace(/Q/gi, '')
  .split('-')
  .map((val) => parseInt(val))

year = year || parseInt(new Date().getFullYear()) - 1
quarter = quarter > 0 && quarter < 4 ? quarter : 4

if (['MAX', 'max'].includes(rows)) rows = MAX_ROWS
else rows = parseInt(rows) || 10

const filePath = getFilePath({ lei, rows, yearQuarter })

// Generate file
try {
  initializeFile({ filePath, ts: makeRowTS({ year, rows, lei, quarter }) })
  generateLarRows({ lei, rows, year, quarter, filePath })
} catch (err) {
  _logError('Unable to create LAR file!')
  console.error(err)
}
