export const cloneObject = obj => JSON.parse(JSON.stringify(obj))

// Data filtering
export const filterByPeriods = (data, low, high) => {
  if (!data) return data

  return data.map(obj => {
    const next = { ...obj }
    next.data = obj.data.slice(low, high)
    return next
  })
}
