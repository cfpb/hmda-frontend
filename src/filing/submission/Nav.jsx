import PropTypes from 'prop-types'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  MACRO_EDITS,
  NO_MACRO_EDITS,
  NO_QUALITY_EDITS,
  NO_SYNTACTICAL_VALIDITY_EDITS,
  PARSED_WITH_ERRORS,
  SIGNED,
  SYNTACTICAL_VALIDITY_EDITS,
  VALIDATED,
  VALIDATING,
} from '../constants/statusCodes.js'

import './Nav.scss'

export default class EditsNav extends Component {
  constructor(props) {
    super(props)
    this.navMap = {
      'Upload LAR': {
        isReachable: () => true,
        isErrored: () => this.props.code === PARSED_WITH_ERRORS,
        isCompleted: () => this.props.code > VALIDATING,
        errorClass: 'error',
        errorText: 'Upload LAR',
        completedText: 'Upload LAR',
        link: 'upload',
      },
      'Syntactical & validity edits': {
        isReachable: () =>
          (this.props.editsFetched &&
            this.navMap['Upload LAR'].isCompleted()) ||
          this.props.code >= NO_SYNTACTICAL_VALIDITY_EDITS,
        isErrored: () => this.props.code === SYNTACTICAL_VALIDITY_EDITS,
        isCompleted: () =>
          (this.navMap['Syntactical & validity edits'].isReachable() &&
            this.props.code > SYNTACTICAL_VALIDITY_EDITS) ||
          this.props.code === NO_SYNTACTICAL_VALIDITY_EDITS,
        errorClass: 'warning-exclamation',
        errorText: 'Syntactical & validity edits',
        completedText: 'Syntactical & validity edits',
        link: 'syntacticalvalidity',
      },
      'Quality edits': {
        isReachable: () =>
          this.props.editsFetched &&
          this.navMap['Syntactical & validity edits'].isCompleted() &&
          this.props.code !== 8,
        isErrored: () =>
          this.props.qualityExists && !this.props.qualityVerified,
        isCompleted: () =>
          this.navMap['Quality edits'].isReachable() &&
          this.props.code >= NO_QUALITY_EDITS &&
          (this.props.qualityVerified || !this.props.qualityExists),
        errorClass: 'warning-question',
        errorText: 'Quality edits',
        completedText: 'Quality edits',
        link: 'quality',
      },
      'Macro quality edits': {
        isReachable: () =>
          this.props.editsFetched &&
          this.navMap['Quality edits'].isCompleted() &&
          this.props.code !== 12,
        isErrored: () => this.props.macroExists && !this.props.macroVerified,
        isCompleted: () =>
          this.navMap['Macro quality edits'].isReachable() &&
          (this.props.code > MACRO_EDITS ||
            this.props.code === NO_MACRO_EDITS) &&
          (!this.props.macroExists || this.props.macroVerified),
        errorClass: 'warning-question',
        errorText: 'Macro quality edits',
        completedText: 'Macro quality edits',
        link: 'macro',
      },
      'Review & submit': {
        isReachable: () =>
          this.props.code >= VALIDATED || this.props.code === NO_MACRO_EDITS,
        isErrored: () => false,
        isCompleted: () => this.props.code === SIGNED,
        completedText: 'Review & submit',
        link: 'submission',
      },
    }
  }

  renderNavItem(name, i) {
    const { page, base, code } = this.props
    const navItem = this.navMap[name]

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

      const isCurrent = navItem.link === page
      if (isCurrent) navClass = `${navClass} current`

      return (
        <li
          className={this.toUsaClass(navClass)}
          key={i}
          aria-current={
            navClass.includes('active') || navClass.includes('current')
              ? 'true'
              : undefined
          }
        >
          <Link
            className='usa-step-indicator__segment-overlay'
            to={`${base}/${navItem.link}`}
            tabIndex={-1}
            aria-hidden='true'
          />
          <Link
            className='usa-step-indicator__segment-label'
            to={`${base}/${navItem.link}`}
          >
            <span>{renderedName}</span>
            {completed ? <span className='usa-sr-only'>completed</span> : null}
            {!completed && <span className='usa-sr-only'>not completed</span>}
          </Link>
        </li>
      )
    }
    return (
      <li className='usa-step-indicator__segment' key={i}>
        <span className='usa-step-indicator__segment-label'>
          {name}
          <span className='usa-sr-only'>not completed</span>
        </span>
      </li>
    )
  }

  toUsaClass(navClass) {
    const parts = navClass.split(' ')
    let base = 'usa-step-indicator__segment'
    for (const p of parts) {
      if (p === 'active') base += ' usa-step-indicator__segment--current'
      else if (
        p === 'warning-exclamation' ||
        p === 'warning-question' ||
        p === 'error' ||
        p === 'complete'
      )
        base += ' usa-step-indicator__segment--complete'
      else base += ` ${p}`
    }
    return base
  }

  render() {
    const keys = Object.keys(this.navMap)

    return (
      <div
        className={`usa-step-indicator usa-step-indicator--counters${
          this.props.code !== SIGNED ? ' editable' : ''
        }`}
        aria-label='progress'
      >
        <ol className='usa-step-indicator__segments'>
          {keys.map((name, i) => this.renderNavItem(name, i))}
        </ol>
      </div>
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
