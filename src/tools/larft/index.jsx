import React from "react"
import PageHeader from "./PageHeader"
import { Prompt } from "react-router-dom"
import { FileActions } from "./FileActions"
import { Editing } from "./Editing"
import { SavedRows } from "./SavedRows"
import { useRestyledButtonLinks } from "./useRestyledButtonLinks"
import { Unparsable } from "./Unparsable"
import { MESSAGES } from './MESSAGES.js'
import { useSelector } from 'react-redux'
import "./index.css"

export const LARFT = () => {
  useRestyledButtonLinks()
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
