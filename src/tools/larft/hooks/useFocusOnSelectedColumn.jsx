import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectCol } from '../data-store/store'

/**
 * Bring the focused column into view
 *
 * @param {String} columnID
 */
export const useFocusOnSelectedColumn = (columnID) => {
  const dispatch = useDispatch()

  // Bring the focused column into view
  useEffect(() => {
    const el = document.getElementById(`${columnID}`)
    const grandparent = el?.parentElement?.parentElement
    if (grandparent) {
      grandparent.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'auto',
      })
      grandparent.scrollTop = 0
      grandparent.style = {}
    }
  }, [columnID])

  // Provide a function that will set focus to this column
  const focus = (target) => {
    if (columnID !== target?.fieldName) dispatch(selectCol(target.fieldName))
  }

  return focus
}
