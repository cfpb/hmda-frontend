import React, { useState, useEffect } from "react"
import { Link as LinkRR } from "react-router-dom"
import "./TableOfContents.css"

/**
 * Reusable table of contents component that takes markdown data, gets parsed and displays
 * a table of contents with two layers. Headers and sub-headers will be displayed. Componnet
 * leverages react-scroll to enable smooth scrolling.
 *
 * @param {markdown} String Markdown data
 * @param {year} String Tells the backlink what year the documentation comes from
 * @param {id} String id comes from DynamicRenderer and is specifically used on developer documentation. It is a continuation of direct linking to a specific developer Field.
 * @param {props} Object Required to get access to location.hash string
 */

const TableOfContents = ({ markdown, year, id, props }) => {
  const [markdownHeaders, setMarkdownHeaders] = useState()
  const [activeContent, setActiveContent] = useState()

  let idFromURL = props.props.location.hash

  useEffect(() => {
    setActiveContent(idFromURL.replace("#", ""))
  }, [idFromURL])

  useEffect(() => {
    if (markdown && markdown.includes("##")) {
      const headersRegex = markdown.match(/#{2}.+(?=\n)/g) // Finds all the headers with 2 or 3 #'s and generates an array.
      let removeTwoHashes = headersRegex.map((h) =>
        h.includes("##") ? h.replace("##", "").trim() : ""
      )

      // Replace last # from sub-header, remove certain special characters and replace spaces with dashes
      const removeHashAndReplace = (id) => {
        let parsedString = id
          .replace(/[#\/'’">(),.?]/g, "")
          .trim()
          .replace(/[\s]/g, "-")
          .toLowerCase()
        return parsedString
      }

      // Generating a new array of objects which contains title, depth and id
      const parsedHeadings = removeTwoHashes.map((heading) => {
        // Regex used on developer markdown headers to correctly parse out the right content
        if (heading.match(/\[(.*?)\]/)) {
          let devHeader = heading.match(/\[(.*?)\]/)[1]

          let devHeaderAdjusted
          if (devHeader.includes("\\")) {
            devHeaderAdjusted = devHeader.replace(/\\/g, "") // removes backslash
          }
          // devHeader is used when the `heading` contains one word or `/`
          // devHeaderAdjusted is used when `heading` contains backslashes
          return {
            title:
              devHeaderAdjusted != undefined ? devHeaderAdjusted : devHeader,
            depth: !heading.includes("#") ? 1 : 2,
            id: devHeaderAdjusted != undefined ? devHeaderAdjusted : devHeader,
          }
        } else {
          return {
            title: heading.includes("#")
              ? heading.replace("#", "").trim()
              : heading.trim(),
            depth: !heading.includes("#") ? 1 : 2,
            id: removeHashAndReplace(heading),
          }
        }
      })

      setMarkdownHeaders(parsedHeadings)
    }
  }, [markdown, id])

  return (
    <div>
      {markdownHeaders ? (
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
                >
                  <a href={`#${header.id}`}>
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
