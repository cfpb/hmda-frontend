import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react'
import Markdown from 'markdown-to-jsx'
import LoadingIcon from '../common/LoadingIcon.jsx'
import NotFound from '../common/NotFound.jsx'
import { Link as LinkRR } from 'react-router-dom'
import { getMarkdownUrl, slugify } from './markdownUtils'
import './index.css'
import TableOfContents from '../common/TableOfContents.jsx'

const DynamicRenderer = props => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [idToScrollTo, setIdToScrollTo] = useState()
  const [TOCSideBarDisplay, setTOCSideBarDisplay] = useState(false)
  const { year, slug, showBackLink = true } = props

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
        .catch(e => {
          setError(e)
        })
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

    headingLinks
      .filter(x => x.href.match(/self$/)) // Find all <a> that need a self-link generated
      .forEach(a => {
        // Generate self-link
        a.href = a.href.replace('self', '#' + slugify(a.innerText))

        // Clean up the parent ID of the <h3> so TOC linking works
        const parentId = a.parentElement.id
        a.parentElement.id = parentId.replace('self', '')
      })

    // Trigger scrollTo now that elements have the appropriate IDs assigned
    const { hash } = window.location
    if (hash) {
      setTimeout(() => {
        const stripped = hash.replace(/[#_/]/g, '').toLowerCase()
        scrollToElement(stripped)
      }, 0)
    }
  })

  useEffect(() => {
    if (!data) return
    const { hash } = window.location
    if (hash) {
      setTimeout(() => {
        const stripped = hash.replace(/[#_/]/g, '').toLowerCase()
        if (idToScrollTo?.includes(stripped)) return // Already has the adjusted ID
        const id = stripped + stripped
        scrollToElement(id)
      }, 0)
    }
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
        {/* Show `documentation` link if TOC sidebar doesn't show up on that page */}
        {TOCSideBarDisplay === false ? (
          <LinkRR className='BackLink' to={`/documentation/${year}`}>
            {'\u2b05'} {year} DOCUMENTATION
          </LinkRR>
        ) : (
          ''
        )}
        {data ? <Markdown>{data}</Markdown> : <LoadingIcon />}
      </div>
    </div>
  )
}

export default DynamicRenderer
