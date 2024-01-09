const shortcodeToFips =
  '{"AL":"01","AK":"02","AS":"60","AZ":"04","AR":"05","BI":"81","CA":"06","CO":"08","CT":"09","DE":"10","DC":"11","FL":"12","FM":"64","GA":"13","GU":"66","HI":"15","ID":"16","IL":"17","IN":"18","IA":"19","JI":"86","JA":"67","KS":"20","KY":"21","KR":"89","LA":"22","ME":"23","MH":"68","MD":"24","MA":"25","MI":"26","MN":"27","MS":"28","MO":"29","MT":"30","NI":"76","NE":"31","NV":"32","NH":"33","NJ":"34","NM":"35","NY":"36","NC":"37","ND":"38","MP":"69","OH":"39","OK":"40","OR":"41","PW":"70","PA":"42","PR":"72","RI":"44","SC":"45","SD":"46","TN":"47","TX":"48","UM":"74","UT":"49","VT":"50","VA":"51","VI":"78","WA":"53","WV":"54","WI":"55","WY":"56","NA":"00"}'
const shortObj = JSON.parse(shortcodeToFips)

export const fipsToShortcode = Object.keys(shortObj).reduce((memo, key) => {
  memo[shortObj[key]] = key
  return memo
}, {}) // ex. {"01": "AL"}

export default shortObj
