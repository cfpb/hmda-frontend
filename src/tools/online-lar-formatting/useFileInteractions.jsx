import { collapseAll } from './Accordion'
import {
  parseRow,
  cloneObject,
  cloneObjectArray,
  createID,
  isTS,
  isLAR,
  log
} from './utils'


export function useFileInteractions({ setSelected, selected, setLARs }) {
  let newRow, saveRow, deleteRow, saveUpload
  useEffect(() => {
    newRow = () => {
      const nextRow = parseRow(ts.length ? '2|' : '1|')
      nextRow.id = createID()

      setCurrCol(null)
      collapseAll()
      setSelected(nextRow)
    }

    deleteRow = () => {
      const confirm = window.confirm(
        'Are you sure you want to delete this row?'
      )
      if (!confirm)
        return
      log('[Delete] Deleting row...', selected)
      if (isTS(selected))
        setTS([])
      else {
        let cloned = cloneObjectArray(lars).filter(r => r.id !== selected.id)
        setLARs(cloned)
      }
      newRow()
    }

    saveUpload = content => {
      log(`[Upload] Parsing...: \n${content}`)

      if (!content)
        return
      const up_rows = content.split('\n')
      if (!up_rows.length)
        return
      log('[Uploaded] Parsed rows: ', up_rows)

      let _ts = [], _lar = [], _unknown = {}

      up_rows.forEach(r => {
        const parsed = parseRow(r)
        parsed.id = createID()
        if (isTS(parsed))
          return _ts.push(parsed)
        if (isLAR(parsed))
          return _lar.push(parsed)
        _unknown[parsed.id] = r
      })

      setTS(_ts)
      setLARs(_lar)
      newRow()
      Object.keys(_unknown).length &&
        log(
          '[Upload] The following rows were excluded due to unrecognized formatting: ',
          Object.keys(_unknown)
            .map(k => `  Row #${k}: ${_unknown[k]}`)
            .join('\n')
        )
    }

    saveRow = () => {
      if (!selected)
        return

      let vals
      let updateFn

      if (isTS(selected)) {
        log('[Save] Processing a TS row...', selected)

        vals = ts
        updateFn = setTS
      } else if (isLAR(selected)) {
        log('[Save] Processing a LAR row...', selected)

        vals = lars
        updateFn = setLARs
      }

      // Only allow single TS row
      if (vals === ts) {
        log('[Save] Saving TS row...')

        const nextTS = cloneObject(selected)
        nextTS.id = createID()
        updateFn([nextTS])
        newRow() // Clear Pipe-delimited area
      } else {
        log('[Save] Saving LAR row...')
        const cloned = cloneObjectArray(vals)

        // Update existing item
        if (!!selected?.id) {
          const updateIndex = cloned.findIndex(el => el?.id === selected.id)
          if (updateIndex > -1) {
            log('[Save]Updating index: ', updateIndex)
            log('[Save]-- previous Row at index: ', cloned[updateIndex])
            log('[Save]-- Updated Row: ', selected)
            cloned[updateIndex] = cloneObject(selected)
            updateFn(cloned) // Save rows
            newRow() // Clear Pipe-delimited area
            return
          }
        }

        // Append new item
        log('[Save] Adding new item.')
        const obj = cloneObject(selected)
        obj.id = createID()
        cloned.push(obj)
        updateFn(cloned) // Save rows
        newRow() // Clear Pipe-delimited area
      }
    }
  }, [selected, setSelected])

  return [newRow, saveRow, deleteRow, saveUpload]
}
