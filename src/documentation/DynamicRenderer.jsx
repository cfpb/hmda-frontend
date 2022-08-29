import React, { useState, useEffect } from "react"
import Markdown from "markdown-to-jsx"
import { Link } from "react-router-dom"
import LoadingIcon from "../common/LoadingIcon.jsx"
import NotFound from "../common/NotFound.jsx"
import { getMarkdownUrl } from "./markdownUtils"
import "./index.css"

const DynamicRenderer = (props) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [TOCHeaders, setTOCHeaders] = useState()
  const { year, slug } = props

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

  useEffect(() => {
    if (data) {
      const headersRegex = data.match(/#{3}.+(?=\n)/g) // Finds all the headers with 3 or 4 #'s and generates an array.
      // let result = headersRegex.filter((h) => h.substring(0, 3) === "###")
      let removeThreeHashes = headersRegex.map((h) =>
        h.includes("###") ? h.replace("###", "").trim() : ""
      )

      const removeHashAndReplace = (id) => {
        let removeHash = id.replace("#", "").trim()
        let removeSpecialCharts = removeHash.replace(/[/\'">(),.?]/g, "")
        return removeSpecialCharts.replaceAll(" ", "-").toLowerCase()
      }

      const parsedHeadings = removeThreeHashes.map((heading) => {
        let id = () => heading.includes("#")

        return {
          title: heading.includes("#")
            ? heading.replace("#", "").trim()
            : heading.trim(),
          depth: !heading.includes("#") ? 1 : 2,
          id: removeHashAndReplace(heading),
        }
      })

      console.log(parsedHeadings)

      setTOCHeaders(parsedHeadings)
      // console.log(data, "markdown")
    }
  }, [data])

  useEffect(function () {
    if (!data) return
    const { hash } = window.location
    if (hash) {
      setTimeout(() => {
        const stripped = hash.replace(/[#_]/g, "")
        const id = stripped + stripped
        const element = document.getElementById(id)
        if (element) setTimeout(() => element.scrollIntoView(), 0)
      }, 0)
    }
  })

  if (error) return <NotFound />

  let markdownHeaders = []

  return (
    <div style={{ display: "flex" }}>
      {/* Table of Contents component */}
      <div className="FAQ-Nav">
        <p className="initial-header">
          {TOCHeaders &&
            TOCHeaders.map((header, index) => (
              <li
                className={header.depth > 1 ? "subheader" : "header"}
                key={index}
              >
                <a href={`#${header.id}`}>{header.title}</a>
              </li>
            ))}
        </p>
      </div>
      <div className="Markdown-Wrapper">
        <Link className="BackLink" to={`/documentation/${year}`}>
          {"\u2b05"} {year} DOCUMENTATION
        </Link>
        {data ? <Markdown>{data}</Markdown> : <LoadingIcon />}
      </div>
    </div>
  )
}

export default DynamicRenderer
