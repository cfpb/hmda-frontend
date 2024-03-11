export const valOrNone = (val) => {
  if ([0, false].indexOf(val) > -1) return val
  if (!val) return '--'
  return val
}

export const capitalize = (str) => {
  return str
    .split(' ')
    .map((el) => el[0].toUpperCase() + el.slice(1))
    .join(' ')
}
