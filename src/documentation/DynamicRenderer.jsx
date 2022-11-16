import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import Markdown from 'markdown-to-jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import NotFound from '../common/NotFound.jsx'
import { updateSelfLinks, getMarkdownUrl } from './markdownUtils'
import TableOfContents from '../common/TableOfContents.jsx'
import { BackLink } from './BackLink'
import './index.css'

const cleanHash = hash => hash.replace(/[#_/]/g, '').toLowerCase()

const DynamicRenderer = props => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [idToScrollTo, setIdToScrollTo] = useState()
  const [TOCSideBarDisplay, setTOCSideBarDisplay] = useState(false)
  const { year, slug, displayTOCBackLink } = props

  const scrollToElement = useCallback(
    id => {
      const element = document.getElementById(id)
      setIdToScrollTo(id)
      if (element) setTimeout(() => element.scrollIntoView(), 0)
    },
    [setIdToScrollTo]
  )

  useEffect(
    function () {
      fetch(getMarkdownUrl(year, slug))
        .then(res => {
          if (res.status === 404) throw new Error('404')
          res.text().then(setData)
        })
        .catch(e => setError(e))
    },
    [year, slug]
  )

  /**
   * Dynamically generate self-links for <h3> that link to (self)
   */
  useLayoutEffect(() => {
    if (!data) return

    // Gather the DOM elements
    const headingLinks = Array.from(document.querySelectorAll('h3 > a'))

    // Update, in place, all <a> that need a self-link generated
    headingLinks.filter(x => x.href.match(/self$/)).forEach(updateSelfLinks)

    // Trigger scrollTo now that elements have the appropriate IDs assigned
    const { hash } = window.location
    if (hash) scrollToElement(cleanHash(hash))
  })

  useEffect(() => {
    const { hash } = window.location
    if (!data || !hash) return

    const stripped = cleanHash(hash)
    if (idToScrollTo?.includes(stripped)) return // Already has the adjusted ID
    const id = stripped + stripped
    scrollToElement(id)
  })

  if (error) return <NotFound />

  return (
    <div className='dynamic-renderer'>
      <TableOfContents
        markdown={data}
        year={year}
        id={idToScrollTo}
        props={props}
        setTOCSideBarDisplay={setTOCSideBarDisplay}
        displayTOCBackLink={displayTOCBackLink}
      />
      <div className='Markdown-Wrapper'>
        <BackLink year={year} hide={TOCSideBarDisplay} />
        {data ? <Markdown>{data}</Markdown> : <LoadingIcon />}
      </div>
    </div>
  )
}

export default DynamicRenderer
