import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReleaseVersion from '../common/ReleaseVersion'

const Header = (props) => {
  return (
    <header className='grid'>
      <h1 className='App-title'>
        HMDA Help
        <ReleaseVersion />
      </h1>
      <nav>
        <Link to='/'>Search</Link>
        <Link
          to={{
            pathname: '/add',
            state: {
              institution: {
                lei: '',
                taxId: '',
                respondentName: '',
              },
              wasAddition: false,
            },
          }}
        >
          Add a new institution
        </Link>
        <button onClick={() => props.logout()}>Logout</button>
      </nav>
    </header>
  )
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default Header
