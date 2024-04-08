import React from 'react'
import NotesDetails from './NoteDetails'
import { formatHistoryDate } from './utils'

export const NoteItem = ({ item, isOpen, setOpen }) => {
  const handleOpen = () => (isOpen ? setOpen(null) : setOpen(item.id))

  let detailsClass = 'details'
  let itemClass = 'item'

  if (isOpen) {
    detailsClass += ' open'
    itemClass += ' open'
  }

  return (
    <li className={itemClass}>
      <button type='button' onClick={handleOpen}>
        <span className='icon'>{isOpen ? '-' : '+'}</span>
        <span className='text'>{item.notes || '<Empty Note Title>'}</span>
        <span className='date'>{formatHistoryDate(item.historyID)}</span>
      </button>
      <NotesDetails
        id={item.id + 'details'}
        className={detailsClass}
        diff={item.diff}
        isOpen={isOpen}
      />
    </li>
  )
}

export default NoteItem
