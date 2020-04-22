export const isBeta = (host) => host.indexOf('beta') > -1

export const isProd = (host) => host.indexOf('ffiec') > -1

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
      if (xhr.readyState === 4) resolve({ url, status: xhr.status === 200 })
    }

    xhr.open('HEAD', url)
    xhr.send()
  })
}
