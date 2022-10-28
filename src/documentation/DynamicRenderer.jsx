import React, { useState, useEffect, useLayoutEffect } from "react"
import Markdown from "markdown-to-jsx"
import LoadingIcon from "../common/LoadingIcon.jsx"
import NotFound from "../common/NotFound.jsx"
import { getMarkdownUrl, slugify } from "./markdownUtils"
import "./index.css"
import TableOfContents from "../common/TableOfContents.jsx"

const DynamicRenderer = (props) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [idToScrollTo, setIdToScrollTo] = useState()
  const { year, slug, showBackLink = true } = props

  useEffect(
    function () {
      fetch(getMarkdownUrl(year, slug))
        .then((res) => {
          if (res.status === 404) throw new Error("404")
          res.text().then(setData)
        })
        .catch((e) => {
          setError(e)
        })
    },
    [year, slug]
  )

  /**
   * Dynamically generate self-links for <h3> that link to (self)
   */
  useLayoutEffect(() => {
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
  })

  // Effect used to find '#' in the route which allows the ability to directly link to a part of the page and scroll to it.
  useEffect(function () {
    if (!data) return
    const { hash } = window.location
    if (hash) {
      setTimeout(() => {
        const stripped = hash.replace(/[#_/]/g, "").toLowerCase()
        const id = stripped + stripped
        const element = document.getElementById(id)
        setIdToScrollTo(id)
        if (element) setTimeout(() => element.scrollIntoView(), 0)
      }, 0)
    }
  })

  if (error) return <NotFound />

  return (
    <div style={{ display: "flex" }}>
      <TableOfContents
        markdown={data}
        year={year}
        id={idToScrollTo}
        props={props}
      />
      <div className="Markdown-Wrapper">
        {data ? <Markdown>{data}</Markdown> : <LoadingIcon />}
      </div>
    </div>
  )
}

export default DynamicRenderer
