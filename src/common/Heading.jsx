import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Heading.css'

const makeHeadingLink = (headingText, headingLink) => {
  return <Link to={headingLink}>{headingText}</Link>
}

const renderHeading = (type, heading) => {
  if (type === 1) return <h1>{heading}</h1>
  if (type === 2) return <h2>{heading}</h2>
  if (type === 3) return <h3>{heading}</h3>
  if (type === 4) return <h4>{heading}</h4>
}

const renderParagraph = (type, paragraphText) => {
  if (type === 1) return <p className='font-lead'>{paragraphText}</p>
  return <p>{paragraphText}</p>
}

function Heading(props) {
  let style = { marginBottom: '1em' }
  if (props.type === 1) style = { marginBottom: '2em' }

  if (props.style) style = { ...style, ...props.style }

  let headingClass = 'heading'
  if (props.disabled) {
    headingClass += ' disabled'
  }

  let heading = props.headingText
  if (props.headingLink)
    heading = makeHeadingLink(props.headingText, props.headingLink)

  let paragraphText = null
  if (props.paragraphText)
    paragraphText = renderParagraph(props.type, props.paragraphText)

  return (
    <header className={headingClass} style={style}>
      {renderHeading(props.type, heading)}
      {paragraphText}
      {props.children}
    </header>
  )
}

Heading.propTypes = {
  type: PropTypes.oneOf([1, 2, 3, 4]),
  headingText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  paragraphText: PropTypes.string,
  headingLink: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Heading
