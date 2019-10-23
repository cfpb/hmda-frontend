export default function createQueryString(params) {
  const length = Object.keys(params).length
  let count = 0
  let qs = '?'
  for (let key of Object.keys(params)) {
    qs = `${qs}${key}=${params[key]}`
    count++
    if (count < length) qs = `${qs}&`
  }
  return qs
}
