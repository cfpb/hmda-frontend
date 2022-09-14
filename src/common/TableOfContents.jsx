import React, { useState, useEffect } from "react"
import { Link as LinkRR } from "react-router-dom"
import { Link } from "react-scroll"
import "./TableOfContents.css"

/**
 * Reusable table of contents component that takes markdown data, gets parsed and displays
 * a table of contents with two layers. Headers and sub-headers will be displayed. Componnet
 * leverages react-scroll to enable smooth scrolling.
 *
 * @param {markdown} String Markdown data
 * @param {year} String Tells the backlink what year the documentation comes from
 * @param {id} String id comes from DynamicRenderer and is specifically used on developer documentation. It is a continuation of direct linking to a specific developer Field.
 */

const TableOfContents = ({ markdown, year, id }) => {
  const [markdownHeaders, setMarkdownHeaders] = useState()
  const [activeContent, setActiveContent] = useState()

  useEffect(() => {
    if (id) {
      setActiveContent(id)
    }

    if (markdown && markdown.includes("##")) {
      const headersRegex = markdown.match(/#{2}.+(?=\n)/g) // Finds all the headers with 2 or 3 #'s and generates an array.
      let removeTwoHashes = headersRegex.map((h) =>
        h.includes("##") ? h.replace("##", "").trim() : ""
      )

      // Remove and replace last # from sub-header markdown
      const removeHashAndReplace = (id) => {
        let removeHash = id.replace("#", "").trim()
        let removeSpecialChars = removeHash.replace(/[/\'">(),.?]/g, "")
        let finalString = removeSpecialChars.replaceAll(" ", "-").toLowerCase()
        return finalString
      }

      // Generating a new objects list which is calculating the depth of the headers and sub-headers
      const parsedHeadings = removeTwoHashes.map((heading) => {
        return {
          title: heading.includes("#")
            ? heading.replace("#", "").trim()
            : heading.trim(),
          depth: !heading.includes("#") ? 1 : 2,
          id: removeHashAndReplace(heading),
        }
      })

      setMarkdownHeaders(parsedHeadings)
    }
  }, [markdown, id])

  return (
    <div>
      {markdownHeaders && year == 2023 ? (
        <div className="toc-container">
          <LinkRR className="BackLink" to={`/documentation/${year}`}>
            {"\u2b05"} {year} DOCUMENTATION
          </LinkRR>
          <div className="initial-header">
            {markdownHeaders &&
              markdownHeaders.map((header, index) => (
                <li
                  className={header.depth > 1 ? "subheader" : "header"}
                  key={index}
                  onClick={() => setActiveContent(header.id)}
                >
                  <a
                    href={`#${header.id}`}
                    onClick={() => setActiveContent(header.id)}
                  >
                    {activeContent == header.id ? (
                      <div className="highlight">{header.title}</div>
                    ) : (
                      header.title
                    )}
                  </a>
                </li>
              ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default TableOfContents
