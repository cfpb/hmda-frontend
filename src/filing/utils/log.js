export default function (...data) {
  if (import.meta.env.NODE_ENV !== 'production') console.log(...data)
}

export function error(...data) {
  console.error(...data)
}
