export default function(...data) {
  if (process.env.NODE_ENV !== 'production') console.log(...data)
}

export function error(...data) {
  console.error(...data)
}
