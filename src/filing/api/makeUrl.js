export default function(obj) {
  let url = '/v2/filing'

  if (obj.pathname) return url + obj.pathname
  if (obj.lei) url += '/institutions/' + obj.lei
  if (obj.filing) url += '/filings/' + obj.filing
  if (obj.submission) url += '/submissions/' + obj.submission
  if (obj.suffix) url += obj.suffix
  if (obj.querystring) url += obj.querystring

  return url
}
