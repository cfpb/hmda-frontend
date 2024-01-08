import streamSaver from 'streamsaver'

/* Configure StreamSaver */
streamSaver.mitm = `${window.origin}/filesaver.html`

const defaultFileName = () => `hmda-download-${Date.now()}.txt`

export default (source, { fileName, onError, onSuccess }) => {
  if (!source.pipeTo) {
    const msg = 'Invalid stream source'
    console.error(`[Stream Download] ${msg}!`)
    return onError(msg)
  }

  const destination = streamSaver.createWriteStream(
    `${fileName || defaultFileName()}`,
  )

  return source.pipeTo(destination).then(() => {
    if (onSuccess) onSuccess()
    console.log('[Stream Download] File transfer complete')
  })
}
