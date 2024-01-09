let store = null

export function getStore() {
  return store
}

export function setStore(s) {
  return (store = s)
}
