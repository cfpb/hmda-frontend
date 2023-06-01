import React, { useState, useEffect } from 'react'
import { BackLink } from '../documentation/BackLink'
import {
  slugify,
  removeTwoHashes,
  parseDeveloperHeader,
  parseStandardHeader,
} from '../documentation/markdownUtils'
import './TableOfContents.css'

const REGEX_HEADING_LINK = /\[(.*?)\]/ // Captures headers that include brackets and parenthesis
const REGEX_H2s_H3s = /#{2}.+(?=\n)/g

/**
 * Reusable table of contents component that takes markdown data, gets parsed and displays
 * a table of contents with two layers. Headers and sub-headers will be displayed.
 *
 * @param {markdown} String Markdown data
 * @param {year} String Tells the backlink what year the documentation comes from
 * @param {id} String id comes from DynamicRenderer and is specifically used on developer documentation. It is a continuation of direct linking to a specific developer Field.
 * @param {props} Object Required to get access to location.hash string
 * @param {setTOCSideBarDisplay} Boolean Helps hide `back to documentation` link that appears when there is no table of contents sidebar to display
 * @param {displayTOCBackLink} Boolean Shows/Hides backlink that is at the top of the TOC sidebar
 */

const TableOfContents = ({
  markdown,
  year,
  id,
  props,
  setTOCSideBarDisplay,
  displayTOCBackLink,
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
        if (heading.match(REGEX_HEADING_LINK)) {
          return parseDeveloperHeader(
            heading.match(REGEX_HEADING_LINK)[1],
            heading
          )
        }

        return parseStandardHeader(heading)
      })

      setMarkdownHeaders(parsedHeadings)
      setTOCSideBarDisplay(true)
    }
  }, [markdown, id])

  if (!markdownHeaders) return null

  return (
    <div>
      <div className='toc-container'>
        <BackLink year={year} hide={!displayTOCBackLink} />
        <ul>
          {markdownHeaders.map((header, index) => (
            <TOCHeader
              {...{ header, index, active: activeContent }}
              key={header.title + '-' + index}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

const TOCHeader = ({ header, index, active }) => {
  const liClass = header.depth > 1 ? 'subheader' : 'header'

  let content = header.title
  if (active == header.id)
    content = <div className='highlight'>{header.title}</div>
  
  return (
    <li className={liClass}>
      <a href={`#${header.id}`}>{content}</a>
    </li>
  )
}

export default TableOfContents
