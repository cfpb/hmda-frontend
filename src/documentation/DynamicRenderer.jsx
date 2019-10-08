import React, { useState, useEffect } from 'react'
import Markdown from 'markdown-to-jsx'
import { Link } from 'react-router-dom'
import LoadingIcon from '../common/LoadingIcon.jsx'
import NotFound from '../common/NotFound.jsx'
import { getMarkdownUrl, isBadSlug } from './markdownUtils'

const DynamicRenderer = props => {
  const [data, setData] = useState(null)
  const { year, slug } = props
  const badSlug = isBadSlug(year, slug)


  useEffect(function (){
    if(badSlug) return
    fetch(getMarkdownUrl(year, slug)).then(res => {
      res.text().then(setData)
    })
  }, [year, slug, badSlug])

  useEffect(function (){
    if(!data || badSlug) return
    const { hash } = window.location
    if(hash) {
      setTimeout(() => {
        const stripped = hash.replace(/[#_]/g, '')
        const id = stripped + stripped
        const element = document.getElementById(id)
        if (element) setTimeout(()=>element.scrollIntoView(), 0)
      }, 0)
    }
  })

  if(badSlug) return <NotFound/>

  return (
    <div className="Markdown-Wrapper">
    <Link className="BackLink" to={`/documentation/${year}`}>{'\u2b05'} {year} DOCUMENTATION</Link>
    {data
      ? <Markdown>{data}</Markdown>
      : <LoadingIcon/>
    }
    </div>
  )
}

export default DynamicRenderer
