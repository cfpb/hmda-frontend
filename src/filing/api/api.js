import { fetch } from './fetch.js'

export function getInstitution(lei, filing) {
  return fetch({ pathname: `/institutions/${lei}/year/${filing}` })
}

export function createSubmission(lei, filing) {
  return fetch({
    pathname: `/institutions/${lei}/filings/${filing}/submissions`,
    method: 'POST'
  })
}

export function getFiling(lei, filing) {
  return fetch({ pathname: `/institutions/${lei}/filings/${filing}` })
}

export function createFiling(lei, filing) {
  return fetch({
    pathname: `/institutions/${lei}/filings/${filing}`,
    method: 'POST'
  })
}

export function getLatestSubmission() {
  return fetch({ submission: 'latest', noCache: 1 })
}

export function getEdits() {
  return fetch({ suffix: '/edits' })
}

export function getEdit(pathObj) {
  return fetch({ suffix: `/edits/${pathObj.edit}` })
}

export function getCSV(pathObj) {
  pathObj.suffix = pathObj.suffix ? pathObj.suffix : '/edits/csv'
  pathObj.params = { format: 'csv' }
  return fetch(pathObj)
}

export function postVerify(type, verified) {
  return fetch({
    suffix: `/edits/${type}`,
    method: 'POST',
    body: { verified: verified }
  })
}

export function getSummary() {
  return fetch({ suffix: '/summary' })
}

export function getSignature() {
  return fetch({ suffix: '/sign' })
}

export function getParseErrors() {
  return fetch({ suffix: '/parseErrors' })
}

export function postUpload(body) {
  return fetch({
    method: 'POST',
    body: body
  })
}

export function postSignature(signed) {
  return fetch({
    suffix: '/sign',
    method: 'POST',
    body: { signed: signed }
  })
}
