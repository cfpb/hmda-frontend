#! /usr/bin/node

/**
 * Usage: 
 *   node./ generate_lar_file.mjs < LEI > <YEAR> <NUM_ROWS>
 **/

import { MAX_ROWS } from './constants.mjs'
import {
  getFilePath,
  makeTS,
  initializeFile,
  generateLarRows,
} from './lar_helpers.mjs'

const _checkRequiredParam = (label, value) => {
  if (value) return
  console.error(`Missing required arg: <${label}>`)
  process.exit(1)
}

// Parse command-line params
let [lei, yearQuarter, rows, ...others] = process.argv.slice(2)

// Verify required params
_checkRequiredParam('lei', lei)
_checkRequiredParam('yearQuarter', yearQuarter)

// Parse params + Set reasonable defaults
lei = lei.toUpperCase()
let [year, quarter] = yearQuarter.replace(/Q/gi, '').split('-').map(parseInt)
year = year || parseInt(new Date().getFullYear()) - 1
quarter = quarter > 0 && quarter < 4 ? quarter : 4
rows = parseInt(rows) || 10
if (rows > MAX_ROWS) rows = MAX_ROWS

const filePath = getFilePath(lei, year, rows)

// Generate file
try {
  initializeFile({ filePath, ts: makeTS({ year, rows, lei }) })
  generateLarRows({ lei, rows, year, filePath })
} catch (err) {
  console.log('[Error] Unable to create LAR file!')
  console.error(err)
}
