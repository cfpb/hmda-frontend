import { fetchData } from './fetch.js'

export function getInstitution(lei, filing) {
  return fetchData({ pathname: `/institutions/${lei}/year/${filing}` })
}

export function createSubmission(lei, filing) {
  return fetchData({
    pathname: `/institutions/${lei}/filings/${filing}/submissions`,
    method: 'POST'
  })
}

export function getFiling(lei, filing) {
  return fetchData({ pathname: `/institutions/${lei}/filings/${filing}` })
}

export function createFiling(lei, filing) {
  return fetchData({
    pathname: `/institutions/${lei}/filings/${filing}`,
    method: 'POST'
  })
}

export function getLatestSubmission() {
  return fetchData({ submission: 'latest', noCache: 1 })
}

export function getNewestSubmission(lei, filing){
  return fetchData({ pathname: `/institutions/${lei}/filings/${filing}/submissions/latest`})
}

export function getEdits() {
  return fetchData({ suffix: '/edits' })
}

export function getEdit(pathObj) {
  return fetchData({ suffix: `/edits/${pathObj.edit}` })
}

export function getCSV(pathObj) {
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/edits/csv'
  pathObj.params = { format: 'csv' }
  return fetchData(pathObj)
}

export function postVerify(type, verified) {
  return fetchData({
    suffix: `/edits/${type}`,
    method: 'POST',
    body: { verified: verified }
  })
}

export function getSummary() {
  return fetchData({ suffix: '/summary' })
}

export function getSignature() {
  return fetchData({ suffix: '/sign' })
}

export function getParseErrors() {
  return fetchData({ suffix: '/parseErrors' })
}

export function postUpload(body) {
  return fetchData({
    method: 'POST',
    body: body
  })
}

export function postSignature(signed) {
  return fetchData({
    suffix: '/sign',
    method: 'POST',
    body: { signed: signed }
  })
}
