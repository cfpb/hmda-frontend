export const formatDateString = str => {
  if (!str) return ''
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6)}`
}
