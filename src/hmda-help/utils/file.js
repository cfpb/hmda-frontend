const XHR_DONE = 4

/**
 * Check if a file exists
 * @param {String} url Target URL
 */
export function fileExists(url) {
  return new Promise((resolve, reject) => {
    var xhttp = new XMLHttpRequest()

    /* Check the status code of the request */
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === XHR_DONE) {
        if ([0, 404].indexOf(xhttp.status) > -1) reject(xhttp.status)
        resolve(xhttp.status)
      }
    }

    /* Open and send the request */
    xhttp.open('HEAD', url)
    xhttp.send()
  })
}