import React, { Component } from 'react'
import AppIntro from './AppIntro.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import CSVUpload from './CSVUpload.jsx'
import { isUliValid, isLoanIdValid } from './utils/index.js'

const defaultState = {
  inputValue: '',
  checkDigit: null,
  uli: null,
  isValidUli: null,
  errors: [],
  isSubmitted: false,
  whichApp: 'get'
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.validateInput = this.validateInput.bind(this)
    this.getResponse = this.getResponse.bind(this)

    this.refScrollTo = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checkDigit || this.state.isValidUli !== null) {
      window.scrollTo({
        top: this.refScrollTo.current.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  handleRadioChange(app) {
    /*
    when the radio button changes (the app) between get and validate
    clear everything to reset errors and answer
    but keep in the input and update the app
    */
    this.setState(
      {
        ...defaultState,
        inputValue: this.state.inputValue, // keep this around
        whichApp: app
      },
      () => {
        if (this.state.inputValue !== '') {
          this.validateInput(this.state.inputValue)
        }
      }
    )
  }

  handleInputChange(inputValue) {
    /*
    when input changes
    clear everything to reset errors and answer
    but keep the app and update the input
    */
    this.setState({
      ...defaultState,
      inputValue: inputValue,
      whichApp: this.state.whichApp // keep this around
    })
  }

  handleSubmit() {
    /* 
    setState callback used
    to make sure isSubmitted is true
    before doing anything else
    */
    this.setState({ isSubmitted: true }, () => {
      this.validateInput(this.state.inputValue)
    })
  }

  getResponse(loanId) {
    let endpoint = 'checkDigit'
    let body = {
      loanId: this.state.inputValue
    }
    if (this.state.whichApp === 'validate') {
      endpoint = 'validate'
      body = {
        uli: this.state.inputValue
      }
    }

    const API_URL = '/v2/public/uli/'

    if (this.state.isSubmitted) {
      fetch(API_URL + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(json => {
          if (endpoint === 'checkDigit') {
            this.setState({ uli: json.uli, checkDigit: json.checkDigit })
          } else {
            this.setState({ isValidUli: json.isValid })
          }
        })
    }
  }

  validateInput(input) {
    let validateFunction = isLoanIdValid

    if (this.state.whichApp === 'validate') {
      validateFunction = isUliValid
    }

    const errors = validateFunction(input)

    if (errors.length > 0) {
      this.setState({ errors: errors })
    } else {
      this.getResponse(input)
    }
  }

  render() {
    const {
      inputValue,
      whichApp,
      uli,
      isValidUli,
      checkDigit,
      errors,
      isSubmitted
    } = this.state

    return (
      <div className="grid" id="main-content">
        <AppIntro />

        <div className="grid">
          <div className="item">
            <InputError errors={errors} isSubmitted={isSubmitted} />
            <Form
              inputValue={inputValue}
              onSubmit={this.handleSubmit}
              onInputChange={this.handleInputChange}
              validateInput={this.validateInput}
              errors={errors}
              onRadioChange={this.handleRadioChange}
              whichApp={whichApp}
              isSubmitted={isSubmitted}
              uli={uli}
              isValidUli={isValidUli}
            />
            <div ref={this.refScrollTo}>
              <Answer
                uli={uli}
                isValidUli={isValidUli}
                checkDigit={checkDigit}
                isSubmitted={isSubmitted}
                errors={errors}
              />
            </div>
          </div>
          <div className="item">
            <CSVUpload />
          </div>
        </div>
      </div>
    )
  }
}
