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
 */

const TableOfContents = ({ markdown, year }) => {
  const [markdownHeaders, setMarkdownHeaders] = useState()

  useEffect(() => {
    if (markdown && markdown.includes("###")) {
      const headersRegex = markdown.match(/#{3}.+(?=\n)/g) // Finds all the headers with 3 or 4 #'s and generates an array.
      let removeThreeHashes = headersRegex.map((h) =>
        h.includes("###") ? h.replace("###", "").trim() : ""
      )

      // Remove and replace last # from sub-header markdown
      const removeHashAndReplace = (id) => {
        let removeHash = id.replace("#", "").trim()
        let removeSpecialCharts = removeHash.replace(/[/\'">(),.?]/g, "")
        return removeSpecialCharts.replaceAll(" ", "-").toLowerCase()
      }

      // Generating a new objects list which is calculating the depth of the headers and sub-headers
      const parsedHeadings = removeThreeHashes.map((heading) => {
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
  }, [markdown])

  return (
    <div>
      {markdownHeaders ? (
        <div className="toc-container">
          <LinkRR className="BackLink" to={`/documentation/${year}`}>
            {"\u2b05"} {year} DOCUMENTATION
          </LinkRR>
          <p className="initial-header">
            {markdownHeaders &&
              markdownHeaders.map((header, index) => (
                <li
                  className={header.depth > 1 ? "subheader" : "header"}
                  key={index}
                >
                  <Link to={`${header.id}`} spy={true} smooth={true}>
                    {header.title}
                  </Link>
                </li>
              ))}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default TableOfContents
