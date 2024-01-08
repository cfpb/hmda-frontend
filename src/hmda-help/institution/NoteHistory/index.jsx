import React, { useState, useEffect } from 'react'
import NotesList from './NoteList'
import warningIcon from '../../images/warning.png'
import { fetchData } from '../../utils/api'
import { sortNotes, addDiff } from './utils'
import './NoteHistory.css'

const NoteHistory = ({ lei, year, fetchHistory, setFetched }) => {
  const [notes, setNotes] = useState(null)
  const [error, setError] = useState(null)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (!lei || !year || !fetchHistory) return
    fetchNotesHistory({ lei, year, setFetched, setError, setNotes })
  }, [lei, year, fetchHistory, setFetched])

  return (
    <div id='NoteHistory' className={isOpen ? 'open' : undefined}>
      <div className='header' onClick={() => setOpen(!isOpen)}>
        <span>Note History</span>
        <ToggleOpen isOpen={isOpen} />
      </div>
      <NotesList items={notes} isMenuOpen={isOpen} />
      <NotesError error={error} isMenuOpen={isOpen} />
    </div>
  )
}

const fetchNotesHistory = ({ lei, year, setFetched, setError, setNotes }) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  return fetchData(`/v2/public/institutions/${lei}/year/${year}/history`, {
    headers,
  })
    .then((res) => {
      if (res.error) {
        if (res.status === 404) return setError('No recorded History')
        return setError(
          typeof res.error === 'object' ? res.error.message : res.message,
        )
      }
      setError(null)
      return res.response.json()
    })
    .then((json) => {
      let fetchedData =
        json && addDiff(sortNotes(json.institutionNoteHistoryItems))
      setNotes(fetchedData)
      setFetched()
    })
}

const NotesError = ({ error, isMenuOpen }) => {
  if (!isMenuOpen || !error) return null
  const message = typeof error === 'object' ? error.message : error
  return (
    <ul className='note-list open'>
      <li className='error'>
        <HistoryError text={message} />
      </li>
    </ul>
  )
}

const HistoryError = ({ text = 'No recorded History' }) => (
  <>
    <img className='icon' alt='yellow exclamation' src={warningIcon} />
    {text}
  </>
)

const ToggleOpen = ({ isOpen }) => {
  let icon = <>&#9660;</>
  let text = 'Show'

  if (isOpen) {
    icon = <>&#9650;</>
    text = 'Hide'
  }

  return (
    <span className='toggle'>
      {icon}
      <span className='text'>{text}</span>
    </span>
  )
}

export default NoteHistory
