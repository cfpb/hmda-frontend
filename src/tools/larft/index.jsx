import React from "react"
import { useSelector } from 'react-redux'
import { Prompt } from "react-router-dom"
import { Editing } from "./Editing"
import { FileActions } from "./FileActions"
import { MESSAGES } from './MESSAGES.js'
import PageHeader from "./PageHeader"
import { SavedRows } from "./SavedRows"
import { Unparsable } from "./Unparsable"
import { useRestyledButtonLinks } from "./useRestyledButtonLinks"
import { useWarningWhenLeaving } from './useWarningWhenLeaving'
import "./index.css"

export const LARFT = () => {
  useRestyledButtonLinks()
  useWarningWhenLeaving()
  
  const hasNewChanges = useSelector(({ larft }) => larft.hasNewChanges)

  return (
    <div className='online-larft'>
      <Prompt when={hasNewChanges} message={MESSAGES.loseUnsaved} />
      <PageHeader />
      <FileActions />
      <Unparsable />
      <SavedRows />
      <Editing />
    </div>
  )
}
