export default function createQueryString(params) {
  const { length } = Object.keys(params)
  let count = 0
  let qs = '?'
  for (const key of Object.keys(params)) {
    qs = `${qs}${key}=${params[key]}`
    count++
    if (count < length) qs = `${qs}&`
  }
  return qs
}
