export const isBeta = (host) => host.indexOf('beta') > -1

export const isProd = (host) => host.indexOf('ffiec') > -1

export function withFormData(method, url, formData, done) {
  const xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.onload = function() {
    done(xhr)
  }
  xhr.onerror = function() {
    done(xhr)
  }
  xhr.send(formData)
}

export function urlExists(url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(url, xhr.status < 400 ? 'Valid' : 'Invalid')
    }
  }
  xhr.open("HEAD", url)
  xhr.send()
}

