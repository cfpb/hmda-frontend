export const cloneObject = obj => JSON.parse(JSON.stringify(obj))
export const isEven = num => num % 2
export const randomNumber = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
} 