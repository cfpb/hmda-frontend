import React from 'react'
import { useSelector } from 'react-redux'
import { Prompt } from 'react-router-dom'
import { FileActions } from './components/FileActions'
import { PageHeader } from './components/PageHeader'
import { Editing } from './components/row-editor/Editing'
import { SavedRows } from './components/saved-rows'
import { UnparsableRows } from './components/UnparsableRows'
import { WARN_LOST_UNSAVED } from './config/messages.js'
import { useRestyledButtonLinks } from './hooks/useRestyledButtonLinks'
import { useWarningWhenLeaving } from './hooks/useWarningWhenLeaving'
import './index.css'

export const LARFT = () => {
  useRestyledButtonLinks()
  useWarningWhenLeaving()

  const hasNewChanges = useSelector(({ larft }) => larft.hasNewChanges)

  return (
    <div className='online-larft'>
      <Prompt when={hasNewChanges} message={WARN_LOST_UNSAVED} />
      <PageHeader />
      <FileActions />
      <UnparsableRows />
      <SavedRows />
      <Editing />
    </div>
  )
}
