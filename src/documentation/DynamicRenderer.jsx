import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import Markdown from 'markdown-to-jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import NotFound from '../common/NotFound.jsx'
import { Link } from 'react-router-dom'
import { generateSelfLink, getMarkdownUrl, slugify } from './markdownUtils'
import TableOfContents from '../common/TableOfContents.jsx'
import './index.css'

const cleanHash = hash => hash.replace(/[#_/]/g, '').toLowerCase()

const DynamicRenderer = props => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [idToScrollTo, setIdToScrollTo] = useState()
  const [TOCSideBarDisplay, setTOCSideBarDisplay] = useState(false)
  const { year, slug } = props

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
    headingLinks.filter(x => x.href.match(/self$/)).forEach(generateSelfLink)

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
    <div style={{ display: 'flex' }}>
      <TableOfContents
        markdown={data}
        year={year}
        id={idToScrollTo}
        props={props}
        setTOCSideBarDisplay={setTOCSideBarDisplay}
      />
      <div className='Markdown-Wrapper'>
        <BackLink year={year} hide={TOCSideBarDisplay} />
        {data ? <Markdown>{data}</Markdown> : <LoadingIcon />}
      </div>
    </div>
  )
}

// Show `documentation` link if TOC sidebar doesn't show up on that page 
const BackLink = ({ year, hide }) => {
  if (hide) return null

  return (
    <Link className='BackLink' to={`/documentation/${year}`}>
      {'\u2b05'} {year} DOCUMENTATION
    </Link>
  )
}


export default DynamicRenderer
