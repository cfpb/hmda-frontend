export default function runFetch(url, body, isCSV) {
  return fetch(url, {
    method: 'POST',
    body: body,
    headers: isCSV
      ? {}
      : {
          'Content-Type': 'application/json',
        },
  })
    .then((response) => {
      return new Promise((resolve) => {
        if (response.status > 399) return resolve(response)
        if (isCSV) return resolve(response.text())
        resolve(response.json())
      })
    })
    .catch((err) => {
      return { status: 400 }
    })
}
