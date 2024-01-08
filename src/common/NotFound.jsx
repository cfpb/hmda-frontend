import React from 'react'
import { Link } from 'react-router-dom'
import Heading from './Heading.jsx'

import './NotFound.css'

const NotFound = () => {
  return (
    <div className='NotFound' id='main-content'>
      <Heading
        type={1}
        headingText='Sorry, something went wrong.'
        paragraphText="We can't seem to find the page you are looking for."
      >
        <Link to='/'>Return to the HMDA home page.</Link>
      </Heading>
    </div>
  )
}

export default NotFound
