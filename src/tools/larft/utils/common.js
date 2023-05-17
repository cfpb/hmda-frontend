export const cloneObject = item => JSON.parse(JSON.stringify(item))
export const cloneObjectArray = array => array.map(cloneObject)

export const unity = x => x

export const isString = x => typeof x === "string"

export const log = (...data) =>
  process.env.NODE_ENV !== "production" ? console.log(...data) : null

export const scrollToID = id =>
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
  
export const scrollToFileActions = () => scrollToID("file-actions")

export const highlightText = text => (
  <span className='highlight'> {text || '-'}</span>
)