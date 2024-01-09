export const toInt = (str) => parseInt(str, 10)

// Add the thousands separator
export function formatNumber(x = 0) {
  if (!isNumber(x)) return x
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Alias of formatNumber
export function asNum(x) {
  return formatNumber(x)
}

// Format a decimal as a percent string
export function decToPctStr(x) {
  if (!isNumber(x)) return x
  return `${Math.round(x * 100)}%`
}

// Type check
export function isNumber(x) {
  return typeof x === 'number'
}

/*
 * Format numbers for charts, max three digits
 * 1110 => 1.11K  | 1111100 => 1.11M
 * 11100 => 11.1K | 11111100 => 11.1M
 * 111111 => 111K | 111111100 => 111M
 */
export function abbrevNum(x) {
  if (isNaN(x) || !isNumber(x)) return x
  if (x < 1_000) return x
  if (x < 10_000) return Math.round(Math.floor(x / 10)) / 100 + 'K'
  if (x < 100_000) return Math.round(Math.floor(x / 100)) / 10 + 'K'
  if (x < 1_000_000) return Math.round(Math.floor(x / 1000)) + 'K'
  if (x < 10_000_000) return Math.round(Math.floor(x / 10000)) / 100 + 'M'
  if (x < 100_000_000) return Math.round(Math.floor(x / 100000)) / 10 + 'M'
  if (x < 1_000_000_000) return Math.round(Math.floor(x / 1000000)) + 'M'
}

// Calculate percentage
export const calcPct = (numer, denom, precision = 2) => {
  if (!numer || !denom) return 0
  return (Math.round((numer / denom) * 10000) / 100).toFixed(precision)
}

// Human readable file sizes from bytes
export function humanFileSize(size) {
  if (!size) return '0B'
  var i = Math.floor(Math.log(size) / Math.log(1024))
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  )
}

export const isBigFile = (size) => {
  if (size.includes('GB') || size.includes('TB')) return true
  if (size.includes('MB') && parseFloat(size.split(' ')[0]) > 450) return true
}
