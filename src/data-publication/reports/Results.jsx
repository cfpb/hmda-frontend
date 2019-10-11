import React from 'react'

import './Results.css'

const defaultState = {
  showAll: false
}

const DEFAULT_NUMBER_OF_INSTITUTIONS = 10

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = defaultState

    this.handleShowAllClick = this.handleShowAllClick.bind(this)
    this.renderViewAllButton = this.renderViewAllButton.bind(this)
    this.renderHeading = this.renderHeading.bind(this)
    this.makeListItem = this.makeListItem.bind(this)
  }

  handleShowAllClick() {
    this.setState({ showAll: true })
  }

  renderViewAllButton(length) {
    if (
      this.state.showAll === false &&
      length > DEFAULT_NUMBER_OF_INSTITUTIONS
    ) {
      return (
        <button onClick={this.handleShowAllClick} className="button">
          View all {length} results
        </button>
      )
    }

    return null
  }

  renderHeading(length, inputValue) {
    if (
      this.state.showAll === false &&
      length > DEFAULT_NUMBER_OF_INSTITUTIONS
    ) {
      return (
        <h4>
          Viewing {DEFAULT_NUMBER_OF_INSTITUTIONS} results of {length} found for
          "{inputValue}"
        </h4>
      )
    }

    return (
      <h4>
        Viewing all {length} results found for "{inputValue}"
      </h4>
    )
  }

  renderError(error) {
    let headerText = 'List of institutions unavailable'
    let body = (
      <p className="alert-text">
        We're unable to load the institutions. Please try refreshing your
        browser.
      </p>
    )
    if (error === 'Not a filer') {
      headerText = 'Institution not found'
      body = (
        <p className="alert-text">
          Sorry, that institution isn't in our list of filers. If you think this
          is incorrect please contact{' '}
          <a href="mailto:hmdahelp@cfpb.gov">hmdahelp@cfpb.gov</a>.
        </p>
      )
    }
    return (
      <div className="alert alert-error" role="alert">
        <div className="alert-body">
          <h3 className="alert-heading">{headerText}</h3>
          {body}
        </div>
      </div>
    )
  }

  makeListItem(institution, index) {
    const normalizedInstitution =
      this.props.year === '2017'
        ? {
            title: 'Institution ID',
            id: institution.institutionId
          }
        : { title: 'LEI', id: institution.lei }
    const href = `https://s3.amazonaws.com/cfpb-hmda-public/prod/modified-lar/${
      this.props.year
    }/${normalizedInstitution.id}.txt`
    return (
      <li key={index}>
        <h4>{institution.name}</h4>
        <p>
          {normalizedInstitution.title}: {normalizedInstitution.id}
        </p>
        <a className="font-small" href={href} download>
          Download Modified LAR
        </a>
      </li>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      this.setState(defaultState)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.inputValue !== this.props.inputValue) return true
    if (nextProps.year !== this.props.year) return true
    if (nextState.showAll !== this.state.showAll) return true
    return false
  }

  render() {
    if (this.props.error) return this.renderError(this.props.error)
    if (this.props.institutions.length === 0) return null

    let visibleInstitutions = this.props.institutions.slice(
      0,
      DEFAULT_NUMBER_OF_INSTITUTIONS
    )

    if (this.state.showAll === true) {
      visibleInstitutions = this.props.institutions
    }

    const mapper = this.props.makeListItem || this.makeListItem

    return (
      <React.Fragment>
        {this.renderHeading(
          this.props.institutions.length,
          this.props.inputValue
        )}
        <ul className="Results">{visibleInstitutions.map(mapper)}</ul>
        {this.renderViewAllButton(this.props.institutions.length)}
      </React.Fragment>
    )
  }
}

export default Results
