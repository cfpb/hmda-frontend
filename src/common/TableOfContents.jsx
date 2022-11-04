import React, { useState, useEffect } from 'react'
import { Link as LinkRR } from 'react-router-dom'
import {
  slugify,
  removeTwoHashes,
  updateDeveloperHeader,
  standardHeader,
} from '../documentation/markdownUtils'
import './TableOfContents.css'

const HEADING_WITH_LINK = /\[(.*?)\]/ // Captures headers that include brackets and parenthesis
const REGEX_H2s_H3s = /#{2}.+(?=\n)/g

/**
 * Reusable table of contents component that takes markdown data, gets parsed and displays
 * a table of contents with two layers. Headers and sub-headers will be displayed.
 *
 * @param {markdown} String Markdown data
 * @param {year} String Tells the backlink what year the documentation comes from
 * @param {id} String id comes from DynamicRenderer and is specifically used on developer documentation. It is a continuation of direct linking to a specific developer Field.
 * @param {props} Object Required to get access to location.hash string
 * @param {setTOCSideBarDisplay} Boolean Helps trigger `back to documentation` link appear if table of contents sidebar isn't present
 */

const TableOfContents = ({
  markdown,
  year,
  id,
  props,
  setTOCSideBarDisplay,
}) => {
  const [markdownHeaders, setMarkdownHeaders] = useState()
  const [activeContent, setActiveContent] = useState()

  let idFromURL = props.props.location.hash

  useEffect(() => {
    const nextContent = idFromURL.replace(/[#_]/g, '').toLowerCase()
    setActiveContent(slugify(nextContent))
  }, [idFromURL])

  useEffect(() => {
    if (markdown && markdown.includes('##')) {
      // Array is made up of h2s and h3s from markdown
      const headingsForTOC = removeTwoHashes(markdown.match(REGEX_H2s_H3s))

      // Generating a new array of objects which contains title, depth and id
      const parsedHeadings = headingsForTOC.map(heading => {
        // Regex used on developer headers
        if (heading.match(HEADING_WITH_LINK)) {
          return updateDeveloperHeader(
            heading.match(HEADING_WITH_LINK)[1],
            heading
          )
        } else {
          return standardHeader(heading)
        }
      })

      setMarkdownHeaders(parsedHeadings)
      setTOCSideBarDisplay(true)
    }
  }, [markdown, id])

  if (!markdownHeaders) return null

  return (
    <div>
      <div className='toc-container'>
        <LinkRR className='BackLink' to={`/documentation/${year}`}>
          {'\u2b05'} {year} DOCUMENTATION
        </LinkRR>
        <ul>
          {markdownHeaders.map((header, index) => (
            <li
              className={header.depth > 1 ? 'subheader' : 'header'}
              key={index}
            >
              <a href={`#${header.id}`}>
                {activeContent == header.id ? (
                  <div className='highlight'>{header.title}</div>
                ) : (
                  header.title
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TableOfContents
