export default function hasHttpError(json) {
  if (!json) return Promise.resolve(true)
  if (!json.status && !json.statusText) return Promise.resolve(false)
  if (json.status === 401) return new Promise(() => {})
  return Promise.resolve(json.status > 399)
}
