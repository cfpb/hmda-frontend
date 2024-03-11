import React, { useState } from 'react'
import NotesItem from './NoteItem'

const NoteList = ({ items, isMenuOpen }) => {
  const [openItem, setOpenItem] = useState(null)

  let classname = 'note-list'

  if (!items) return null
  if (isMenuOpen) classname += ' open'

  return (
    <ul className={classname}>
      {items.map((item) => (
        <NotesItem
          item={item}
          key={item.id}
          isOpen={openItem === item.id}
          setOpen={setOpenItem}
        />
      ))}
    </ul>
  )
}

export default NoteList
