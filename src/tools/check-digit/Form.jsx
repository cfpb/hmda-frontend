import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Alert from '../../common/Alert.jsx'
import Heading from '../../common/Heading.jsx'
import LoadingIcon from '../../common/LoadingIcon.jsx'

import './Form.css'

class Form extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

    this.label = {
      get: (
        <label htmlFor='dataInput'>
          Enter the <abbr title='Legal Entity Identifier'>LEI</abbr> and
          Loan/Application ID
        </label>
      ),
      validate: (
        <label htmlFor='dataInput'>
          Enter the <abbr title='Universal Loan Identifier'>ULI</abbr>
        </label>
      ),
    }

    this.buttonText = {
      get: 'Generate a check digit',
      validate: 'Validate a ULI',
    }
  }

  componentDidMount() {
    this.dataInput.focus()
  }

  handleInputChange(event) {
    this.props.onInputChange(event.target.value)
    this.props.validateInput(event.target.value)
  }

  handleRadioChange(event) {
    this.props.onRadioChange(event.target.value)
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.props.inputValue)
  }

  render() {
    if (!this.props.onSubmit)
      return (
        <Alert type='error' heading='Uh oh!'>
          <p>Something went wrong. Submitting a loan ID won't work.</p>
        </Alert>
      )

    const {
      whichApp,
      errors,
      inputValue,
      isSubmitted,
      uli,
      isValidUli,
      fetchError,
    } = this.props

    let loadingIcon = null
    if (
      isSubmitted &&
      uli === null &&
      isValidUli === null &&
      fetchError === null
    ) {
      loadingIcon = (
        <div>
          <LoadingIcon className='LoadingInline' />
        </div>
      )
    }

    const label = this.label[whichApp]
    const buttonText = this.buttonText[whichApp]
    const buttonDisabled =
      errors.length === 0 && inputValue !== '' ? false : true
    const errorClass = errors.length !== 0 ? 'input-error' : ''

    return (
      <form className='Form' onSubmit={this.handleFormSubmit}>
        <Heading
          type={3}
          headingText='Enter data manually'
          paragraphText='You can manually enter a LEI and Loan/Application ID to generate a
            check digit -or- you can manually enter a ULI to validate a check
            digit.'
        />
        <ul className='unstyled-list'>
          <li>
            <input
              id='getCheckDigit'
              type='radio'
              name='whichApp'
              value='get'
              onChange={this.handleRadioChange}
              checked={whichApp === 'get'}
            />
            <label htmlFor='getCheckDigit'>Generate a check digit</label>
          </li>
          <li>
            <input
              id='validateCheckDigit'
              type='radio'
              name='whichApp'
              value='validate'
              onChange={this.handleRadioChange}
              checked={whichApp === 'validate'}
            />
            <label htmlFor='validateCheckDigit'>Validate a ULI</label>
          </li>
        </ul>
        <div className={errorClass}>
          {label}
          {errors.map((error, i) => {
            return (
              <span key={i} className='input-error-message' role='alert'>
                {error}
              </span>
            )
          })}
          <input
            id='dataInput'
            ref={(input) => {
              this.dataInput = input
            }}
            type='text'
            value={inputValue}
            onChange={this.handleInputChange}
          />
        </div>
        <input disabled={buttonDisabled} type='submit' value={buttonText} />
        {loadingIcon}
      </form>
    )
  }
}

Form.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validateInput: PropTypes.func.isRequired,
  errors: PropTypes.array,
  onRadioChange: PropTypes.func,
  whichApp: PropTypes.string,
  uli: PropTypes.string,
  isValidUli: PropTypes.bool,
  isSubmitted: PropTypes.bool,
}

export default Form
