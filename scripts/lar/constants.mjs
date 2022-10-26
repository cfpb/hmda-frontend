export const COUNTY = '11001'

/* 
  Due to Node filesize limits, we max out around 500K records (512MB)
  https://stackoverflow.com/questions/68230031/cannot-create-a-string-longer-than-0x1fffffe8-characters-in-json-parse
*/
export const MAX_ROWS = 494100


export const TRACTS = {
  '2022+': '980000',
  default: '006202'
}