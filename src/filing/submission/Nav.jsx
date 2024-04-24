import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  PARSED_WITH_ERRORS,
  VALIDATING,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  SYNTACTICAL_VALIDITY_EDITS,
  NO_QUALITY_EDITS,
  NO_MACRO_EDITS,
  MACRO_EDITS,
  VALIDATED,
  SIGNED,
} from '../constants/statusCodes.js'

import './Nav.css'

export default class EditsNav extends Component {
  constructor(props) {
    super(props)
    this.navMap = {
      upload: {
        isReachable: () => true,
        isErrored: () => this.props.code === PARSED_WITH_ERRORS,
        isCompleted: () => this.props.code > VALIDATING,
        errorClass: 'error',
        errorText: 'uploaded with formatting errors',
        completedText: 'uploaded',
        link: 'upload',
      },
      'syntactical & validity edits': {
        isReachable: () =>
          (this.props.editsFetched && this.navMap.upload.isCompleted()) ||
          this.props.code >= NO_SYNTACTICAL_VALIDITY_EDITS,
        isErrored: () => this.props.code === SYNTACTICAL_VALIDITY_EDITS,
        isCompleted: () =>
          (this.navMap['syntactical & validity edits'].isReachable() &&
            this.props.code > SYNTACTICAL_VALIDITY_EDITS) ||
          this.props.code === NO_SYNTACTICAL_VALIDITY_EDITS,
        errorClass: 'warning-exclamation',
        errorText: 'syntactical & validity edits found',
        completedText: 'no syntactical & validity edits',
        link: 'syntacticalvalidity',
      },
      'quality edits': {
        isReachable: () =>
          this.props.editsFetched &&
          this.navMap['syntactical & validity edits'].isCompleted() &&
          this.props.code !== 8,
        isErrored: () =>
          this.props.qualityExists && !this.props.qualityVerified,
        isCompleted: () =>
          this.navMap['quality edits'].isReachable() &&
          this.props.code >= NO_QUALITY_EDITS &&
          (this.props.qualityVerified || !this.props.qualityExists),
        errorClass: 'warning-question',
        errorText: 'quality edits found',
        completedText: 'quality edits verified',
        link: 'quality',
      },
      'macro quality edits': {
        isReachable: () =>
          this.props.editsFetched &&
          this.navMap['quality edits'].isCompleted() &&
          this.props.code !== 12,
        isErrored: () => this.props.macroExists && !this.props.macroVerified,
        isCompleted: () =>
          this.navMap['macro quality edits'].isReachable() &&
          (this.props.code > MACRO_EDITS ||
            this.props.code === NO_MACRO_EDITS) &&
          (!this.props.macroExists || this.props.macroVerified),
        errorClass: 'warning-question',
        errorText: 'macro quality edits found',
        completedText: 'macro quality edits verified',
        link: 'macro',
      },
      submission: {
        isReachable: () =>
          this.props.code >= VALIDATED || this.props.code === NO_MACRO_EDITS,
        isErrored: () => false,
        isCompleted: () => this.props.code === SIGNED,
        completedText: 'submitted',
        link: 'submission',
      },
    }
  }

  renderNavItem(name, i) {
    const { page, base, code } = this.props
    const navItem = this.navMap[name]
    let step = i + 1

    if (navItem.isReachable() || code >= VALIDATED) {
      const completed =
        navItem.isCompleted() || (name !== 'submission' && code >= VALIDATED)
      const errored = navItem.isErrored()
      const renderedName = errored
        ? navItem.errorText
        : completed
          ? navItem.completedText
          : name

      let navClass = errored
        ? navItem.errorClass
        : completed
          ? 'complete'
          : 'active'

      if (navClass !== 'active') step = null
      if (navClass === 'warning-exclamation') step = '!'
      if (navClass === 'warning-question') step = '?'
      if (navItem.link === page) navClass = `${navClass} current`

      return (
        <li className={navClass} key={i}>
          <Link className='nav-link' to={`${base}/${navItem.link}`}>
            <div className='step'>{step}</div>
            {renderedName}
          </Link>
        </li>
      )
    } else {
      return (
        <li key={i}>
          <div className='step'>{step}</div>
          {name}
        </li>
      )
    }
  }

  render() {
    return (
      <section style={{ height: 'auto' }}>
        <nav className={`EditsNav`} id='editsNav'>
          <ul className='nav-primary'>
            {Object.keys(this.navMap).map((name, i) => {
              return this.renderNavItem(name, i)
            })}
          </ul>
          <hr className='nav-bg' />
        </nav>
      </section>
    )
  }
}

EditsNav.propTypes = {
  page: PropTypes.string.isRequired,
  base: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  editsFetched: PropTypes.bool.isRequired,
  qualityExists: PropTypes.bool.isRequired,
  qualityVerified: PropTypes.bool.isRequired,
  macroExists: PropTypes.bool.isRequired,
  macroVerified: PropTypes.bool.isRequired,
}
