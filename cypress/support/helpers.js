export const cleanHost = host => host.replace(/^https?:\/\//, '')
export const isCI = env => env === 'CI'
export const isProd = (host) => !!cleanHost(host).match('/^ffiec/')
export const isBeta = (host) => cleanHost(host).indexOf('beta') > -1
export const isDev = (host) => !isProd(cleanHost(host))
export const isDevBeta = (host) => isDev(host) && isBeta(host)
export const isProdBeta = (host) => isProd(host) && isBeta(host)
export const isDevDefault = (host) => isDev(host) && !isBeta(host)
export const isProdDefault = (host) => isProd(host) && !isBeta(host)

export function withFormData(method, url, formData, done) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onload = function () {
    done(xhr)
  }
  xhr.onerror = function () {
    done(xhr)
  }
  xhr.send(formData)
}

export function urlExists(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4)
        resolve({ url, status: xhr.status < 400, statusCode: xhr.status })
    }

    xhr.open('HEAD', url)
    xhr.send()
  })
}

/* Data Browser Helpers */
// Open react-select drop-down if it's not loading
export const openSelector = (id) =>
  cy.get(`${id} > div > div`).first().should('not.contain', 'Loading').click()

export const dbClick2018 = () => cy.get('#root > .DataBrowser > .Geography > .YearSelector > a:nth-child(2)').click()
export const dbClick2017 = () => cy.get('#root > .DataBrowser > .Geography > .YearSelector > a:nth-child(3)').click()
export const dbURL = (host, queryStr) => `${host}/data-browser/data/${queryStr}` 

/** 
 * Extract the String value of the selected <option> of a <select> element
 * @param jqueryInitObj Cypress jQuery select object
 * @param defaultValue Value returned if no selection has been made
**/
export function getSelectedOptionValue(jqueryInitObj, defaultValue) {
  if (
    !jqueryInitObj ||
    !jqueryInitObj.get(0) ||
    !jqueryInitObj.get(0).selectedOptions ||
    !jqueryInitObj.get(0).selectedOptions.item(0)
  )
    return defaultValue
  
  return jqueryInitObj.get(0).selectedOptions.item(0).value
}