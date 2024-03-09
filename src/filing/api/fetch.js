import createQueryString from './createQueryString.js'
import makeUrl from './makeUrl.js'
import * as AccessToken from '../../common/api/AccessToken.js'
import { login } from '../utils/keycloak.js'
import { getStore } from '../utils/store.js'
import log, { error } from '../utils/log.js'

export function getFilingData() {
  const appState = getStore().getState().app
  return {
    lei: appState.lei,
    filing: appState.filingPeriod,
    submission: appState.submission.id && appState.submission.id.sequenceNumber
  }
}

export async function fetchData(options = { method: 'GET' }) {
  const accessToken = AccessToken.get()
  const pathname = options.pathname
  const filingData = pathname ? {} : getFilingData()
  const isFormData =
    options.body && options.body.toString() === '[object FormData]'

  options = Object.assign({}, filingData, options)

  if (options.params) {
    options.querystring = createQueryString(options.params)
  }

  const url = options.url || makeUrl(options)
  if (typeof options.body === 'object' && !isFormData)
    options.body = JSON.stringify(options.body)

  let headers = { Accept: 'application/json' }

  if (options.method === 'POST' && !isFormData) {
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }

  if (options.params && options.params.format === 'csv') {
    headers = {
      'Content-Type': 'text/csv',
      Accept: 'text/csv'
    }
  }

  if (accessToken) headers.Authorization = 'Bearer ' + accessToken

  if(options.noCache || options.method === 'POST') {
    headers['Cache-Control'] = 'no-cache, no-store'
  }

  var fetchOptions = {
    method: options.method || 'GET',
    body: options.body,
    headers: headers
  }
  
  // Attempt #1
  // if (options._isStream) {
  //   console.log("We've got a Streamer!")
  //   const response = await fetch(url, fetchOptions)
  //   const streamReader = response.body.getReader();
  //   const decode = value => console.log('Decoding: ', value)
    
  //   streamReader.read().then(function processData({done, value}) {
  //     if (done) {
  //       console.log('** We have read all of the data!!!')
  //       return
  //     }
  
  //     decode(value)
  
  //     return streamReader.read().then(processData)
  //   })
  // }
  
  
  // // Attempt #2
  // if (options._isStream) {
  //   console.log("We've got a Streamer!")
  //   const response = await fetch(url, fetchOptions)
  //   // console.log(response.status)
  //   // console.log(response.statusText)
  //   // return response.blob()
  //   const streamReader = response.body.getReader();
  //   let data = ""
  //   const addData = (newData) => {
  //     const decoded = new TextDecoder('utf-8').decode(newData)
  //     console.log(decoded)
  //     data += decoded
  //   }

  //   streamReader.read().then(function processData({done, value}) {
  //     if (done) {
  //       console.log('** We have read all of the data!!!')
  //       console.log('**** DATA ****')
  //       const d2 = data.split("/r")
  //       console.log(data)
  //       return data
  //     }

  //     addData(value)
  //     return streamReader.read().then(processData)
  //   })
  // }
  
  // // Attempt #3
  // if (options._isStream) {
  //   console.log("We've got a Streamer!")
  //   const response = await fetch(url, fetchOptions)
  //   // console.log(response.status)
  //   // console.log(response.statusText)
  //   // return response.blob()
  //   const streamReader = response.body.getReader();
  //   let data = ""
  //   const addData = (newData) => {
  //     const decoded = new TextDecoder('utf-8').decode(newData)
  //     // console.log(decoded)
  //     data += decoded
  //   }

  //   return streamReader.read().then(function processData({done, value}) {
  //     if (done) {
  //       console.log('** We have read all of the data!!!')
  //       console.log('**** DATA ****')
  //       const d2 = data.split("/r")
  //       // console.log(data)
  //       return data
  //     }

  //     addData(value)
  //     return streamReader.read().then(processData)
  //   })
  // }

  return fetch(url, fetchOptions)
    .then(response => {
      return new Promise(resolve => {
        log('got res', response, response.status)
        if (response.status === 401 || response.status === 403) login()
        if (response.status > 399) return resolve(response)
        if (options.params && options.params.format === 'csv') {
          return resolve(response.text())
        }
        resolve(response.json())
      })
    })
    .catch(err => {
      error(err)
    })
}

