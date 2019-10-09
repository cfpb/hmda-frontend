function getMsaUrl(institutionId, year) {
  if(!year) return
  if(year === '2017') return `https://ffiec-api.cfpb.gov/public/filers/2017/${institutionId}/msaMds`
  return `https://ffiec.cfpb.gov/v2/reporting/filers/${year}/${institutionId}/msaMds`
}

export default function(institutionId, year) {
  return fetch(getMsaUrl(institutionId, year)).then(res => {
    if(res.status > 399) throw res
    return res.json()
  })
}
