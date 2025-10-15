import streamSaver from 'streamsaver'

/* Configure StreamSaver */
streamSaver.mitm = `${window.origin}/filesaver.html`

const defaultFileName = () => `hmda-download-${Date.now()}.txt`

// Sanitize filename to prevent path traversal
const sanitizeFileName = (fileName) => {
  if (!fileName) return defaultFileName()

  return fileName
    // Replace dangerous chars with dashes
    .replace(/[/\\?%*:|"<>]/g, '-')
    // Remove path traversal sequences
    .replace(/\.\./g, '')
    // Remove leading dots 
    .replace(/^\.+/, '')
    .trim() 
}

export default (source, { fileName, onError, onSuccess }) => {
  if (!source.pipeTo) {
    const msg = 'Invalid stream source'
    console.error(`[Stream Download] ${msg}!`)
    return onError(msg)
  }

  const destination = streamSaver.createWriteStream(
    sanitizeFileName(fileName),
  )

  return source.pipeTo(destination).then(() => {
    if (onSuccess) onSuccess()
    console.log('[Stream Download] File transfer complete')
  })
}
