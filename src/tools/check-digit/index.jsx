import React, { Component } from 'react'
import AppIntro from './AppIntro.jsx'
import InputError from './InputError.jsx'
import Form from './Form.jsx'
import Answer from './Answer.jsx'
import CSVUpload from './CSVUpload.jsx'
import { isUliValid, isLoanIdValid } from './utils/index.js'
import { AppContext } from '../../common/appContextHOC.jsx'
import Alert from '../../common/Alert.jsx'
import { getToolAnnouncement } from '../../common/getToolAnnouncement.js'

const defaultState = {
  inputValue: '',
  checkDigit: null,
  uli: null,
  isValidUli: null,
  errors: [],
  fetchError: null,
  isSubmitted: false,
  whichApp: 'get',
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
        behavior: 'smooth',
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
        whichApp: app,
      },
      () => {
        if (this.state.inputValue !== '') {
          this.validateInput(this.state.inputValue)
        }
      },
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
      whichApp: this.state.whichApp, // keep this around
    })
  }

  handleSubmit() {
    /*
    setState callback used
    to make sure isSubmitted is true
    before doing anything else
    */
    this.setState({ isSubmitted: true }, () => {
      const errors = this.validateInput(this.state.inputValue)
      if (!errors.length) {
        this.getResponse(this.state.inputValue)
      }
    })
  }

  getResponse(loanId) {
    let endpoint = 'checkDigit'
    let body = {
      loanId: this.state.inputValue,
    }
    if (this.state.whichApp === 'validate') {
      endpoint = 'validate'
      body = {
        uli: this.state.inputValue,
      }
    }

    const API_URL = '/v2/public/uli/'

    if (this.state.isSubmitted) {
      this.setState({ fetchError: null })

      fetch(API_URL + endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.status > 399) return response.text()
          return response.json()
        })
        .then((json) => {
          if (typeof json === 'string') {
            this.setState({ fetchError: json })
          } else {
            if (endpoint === 'checkDigit') {
              this.setState({ uli: json.uli, checkDigit: json.checkDigit })
            } else {
              this.setState({ isValidUli: json.isValid })
            }
          }
        })
        .catch((err) => {
          this.setState({ fetchError: err })
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
    }
    return errors
  }

  render() {
    const {
      inputValue,
      whichApp,
      uli,
      isValidUli,
      checkDigit,
      errors,
      fetchError,
      isSubmitted,
    } = this.state

    const toolAnnouncement = getToolAnnouncement(
      'check digit',
      this.context.config,
    )
    let marginTop = toolAnnouncement ? '0px' : ''

    return (
      <div className='grid' id='main-content'>
        <AppIntro />

        {toolAnnouncement && (
          <Alert
            heading={toolAnnouncement.heading}
            type={toolAnnouncement.type}
          >
            <p>{toolAnnouncement.message}</p>
          </Alert>
        )}

        <div className='grid'>
          <div className='item' style={{ marginTop }}>
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
              fetchError={fetchError}
            />
            <div ref={this.refScrollTo}>
              <Answer
                uli={uli}
                isValidUli={isValidUli}
                fetchError={fetchError}
                checkDigit={checkDigit}
                isSubmitted={isSubmitted}
                errors={errors}
              />
            </div>
          </div>
          <div className='item' style={{ marginTop }}>
            <CSVUpload />
          </div>
        </div>
      </div>
    )
  }
}

App.contextType = AppContext
