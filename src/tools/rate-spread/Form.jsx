import React, { Component } from 'react'
import LoadingIcon from '../../common/LoadingIcon.jsx'
import Alert from '../../common/Alert.jsx'
import { isCI } from '../../common/environmentChecks'
import Heading from '../../common/Heading.jsx'
import runFetch from './runFetch.js'

import './Form.css'

const defaultState = {
  actionTaken: '1',
  amortization: 'Fixed',
  reverse: '2',
  rateSetDate: new Date().toLocaleDateString(),
  APR: '',
  loanTerm: '',
  validationErrors: {},
  isFetching: false,
  error: false,
  errorText: '',
  rateSpread: '',
}

const startDate = new Date('01/02/2017').getTime()
const today = Date.now()

const asNumber = (val) => +val

const ensureTwoDigits = (s) => {
  if (s.length === 2) return s
  return '0' + s
}

const ensureFourDigits = (s) => {
  if (s.length === 4) return s
  return '20' + s
}

const parseDate = (date) => {
  const parts = date.split('/')
  return `${ensureFourDigits(parts[2])}-${ensureTwoDigits(
    parts[0],
  )}-${ensureTwoDigits(parts[1])}`
}

const getNumericAPR = (apr) => {
  if (apr.match(/%$/)) apr = apr.slice(0, -1)
  if (apr === '') return NaN
  return +apr
}

const validatedInput = {
  rateSetDate: {
    validate(date) {
      const parts = date.split('/')
      if (parts.length !== 3) return true
      const numericDate = new Date(date).getTime()
      if (isNaN(numericDate) || numericDate < startDate || numericDate > today)
        return true
      return false
    },
    text: "Rate set date must be in mm/dd/yyyy format and between 01/02/2017 and today's date",
  },
  APR: {
    validate(apr) {
      apr = getNumericAPR(apr)
      return isNaN(apr) || apr < 0 || apr > 99.999
    },
    text: 'APR must be a number between 0 and 99.999',
  },
  loanTerm: {
    validate(term) {
      const num = asNumber(term)
      return isNaN(num) || term > 50 || term < 1 || Math.floor(num) !== num
    },
    text: 'Loan term must be an integer between 1 and 50.',
  },
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.actionTakenHandler = this.makeChangeHandler('actionTaken')
    this.amortizationHandler = this.makeChangeHandler('amortization')
    this.reverseHandler = this.makeChangeHandler('reverse')
    this.rateSetDateHandler = this.makeChangeHandler('rateSetDate')
    this.APRHandler = this.makeChangeHandler('APR')
    this.loanTermHandler = this.makeChangeHandler('loanTerm')
    this.rateSetValidator = this.makeValidator('rateSetDate')
    this.APRValidator = this.makeValidator('APR')
    this.loanTermValidator = this.makeValidator('loanTerm')

    this.refScrollTo = React.createRef()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isFetching) {
      window.scrollTo({
        top: this.refScrollTo.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }

  onFetch() {
    this.setState({ isFetching: true, error: false, errorText: '' })
  }

  onCalculated(response) {
    if (response.status) {
      return this.setState({
        isFetching: false,
        error: true,
        errorText: response.status === 404 ? response.statusText : '',
      })
    }
    this.setState({
      isFetching: false,
      rateSpread: response.rateSpread,
    })
  }

  makeChangeHandler(target) {
    return (event) => {
      if (this.state.validationErrors[target]) {
        if (
          validatedInput[target].validate(event.target.value) !==
          this.state.validationErrors[target]
        )
          this.setValidationErrors(target, event)
      }
      this.setState({
        [target]: event.target.value,
        rateSpread: '',
        error: false,
        errorText: '',
      })
    }
  }

  setValidationErrors(target, event) {
    this.setState({
      validationErrors: {
        ...this.state.validationErrors,
        [target]: validatedInput[target].validate(event.target.value),
      },
    })
  }

  validateAllInput(cb) {
    const newState = {}
    const validated = ['rateSetDate', 'APR', 'loanTerm']
    validated.forEach((v) => {
      newState[v] = validatedInput[v].validate(this.state[v])
    })
    this.setState(
      {
        validationErrors: newState,
      },
      cb,
    )
  }

  makeValidator(target) {
    return (event) => this.setValidationErrors(target, event)
  }

  handleFormSubmit(event) {
    event.preventDefault()

    this.validateAllInput(() => {
      const errs = this.state.validationErrors
      if (errs.rateSetDate || errs.APR || errs.loanTerm) return

      this.onFetch()
      const API_URL = '/public/rateSpread'
      runFetch(API_URL, this.prepareBodyFromState()).then((res) => {
        this.onCalculated(res)
      })
    })
  }

  prepareBodyFromState() {
    return JSON.stringify({
      actionTakenType: asNumber(this.state.actionTaken),
      loanTerm: asNumber(this.state.loanTerm),
      reverseMortgage: asNumber(this.state.reverse),
      amortizationType: this.state.amortization + 'Rate',
      apr: getNumericAPR(this.state.APR),
      lockInDate: parseDate(this.state.rateSetDate),
    })
  }

  render() {
    const errs = this.state.validationErrors
    const rateSetError = errs.rateSetDate
    const APRError = errs.APR
    const loanTermError = errs.loanTerm
    const hasEmptyInputs =
      this.state.rateSetDate === '' ||
      this.state.APR === '' ||
      this.state.loanTerm === ''

    return (
      <div>
        <form className='Form' onSubmit={this.handleFormSubmit}>
          <Heading
            type={3}
            headingText='Enter data manually'
            paragraphText='You can manually enter loan data to calculate the rate spread for
              a single loan.'
          >
            <div className='info'>
              <p style={{ marginTop: '0' }}>
                You should report Rate Spread as <strong>NA</strong> if
              </p>
              <ul style={{ marginBottom: '0' }}>
                <li>
                  <strong>Action Taken Type</strong> is 3, 4, 5, 6, or 7; or if
                </li>
                <li>
                  <strong>Reverse Mortgage</strong> is 1.
                </li>
              </ul>
            </div>
          </Heading>
          <fieldset>
            <legend>Action Taken Type</legend>
            <ul className='unstyled-list'>
              <li>
                <input
                  type='radio'
                  id='actionTaken1'
                  name='actionTaken'
                  value='1'
                  onChange={this.actionTakenHandler}
                  checked={this.state.actionTaken === '1'}
                />
                <label htmlFor='actionTaken1'>1 - Originated</label>
              </li>
              <li>
                <input
                  type='radio'
                  id='actionTaken2'
                  name='actionTaken'
                  value='2'
                  onChange={this.actionTakenHandler}
                  checked={this.state.actionTaken === '2'}
                />
                <label htmlFor='actionTaken2'>
                  2 - Application approved but not accepted
                </label>
              </li>
              <li>
                <input
                  type='radio'
                  id='actionTaken8'
                  name='actionTaken'
                  value='8'
                  onChange={this.actionTakenHandler}
                  checked={this.state.actionTaken === '8'}
                />
                <label htmlFor='actionTaken8'>
                  8 - Pre-approval request approved but not accepted
                </label>
              </li>
            </ul>
          </fieldset>
          <fieldset>
            <legend>Reverse Mortgage</legend>

            <input
              type='radio'
              id='reverse2'
              name='reverse'
              value='2'
              onChange={this.reverseHandler}
              checked={this.state.reverse === '2'}
            />
            <label htmlFor='reverse2'>2 - Not a reverse mortgage</label>
          </fieldset>
          <fieldset>
            <legend>Amortization Type</legend>
            <ul className='unstyled-list'>
              <li>
                <input
                  type='radio'
                  id='amortizationFixed'
                  name='amortization'
                  value='Fixed'
                  onChange={this.amortizationHandler}
                  checked={this.state.amortization === 'Fixed'}
                />
                <label htmlFor='amortizationFixed'>Fixed</label>
              </li>
              <li>
                <input
                  type='radio'
                  id='amortizationVariable'
                  name='amortization'
                  value='Variable'
                  onChange={this.amortizationHandler}
                  checked={this.state.amortization === 'Variable'}
                />
                <label htmlFor='amortizationVariable'>Variable</label>
              </li>
            </ul>
          </fieldset>

          <div className={rateSetError ? 'input-error' : ''}>
            <label htmlFor='rateSetDate'>Rate Set Date</label>
            {rateSetError ? (
              <span className='input-error-message' role='alert'>
                {validatedInput.rateSetDate.text}
              </span>
            ) : null}
            <input
              type='text'
              value={this.state.rateSetDate}
              onChange={this.rateSetDateHandler}
              onBlur={this.rateSetValidator}
              id='rateSetDate'
              placeholder='mm/dd/yyyy'
            />
          </div>
          <div className={APRError ? 'input-error' : ''}>
            <label htmlFor='APR'>APR%</label>
            {APRError ? (
              <span className='input-error-message' role='alert'>
                {validatedInput.APR.text}
              </span>
            ) : null}
            <input
              type='text'
              value={this.state.APR}
              onChange={this.APRHandler}
              onBlur={this.APRValidator}
              id='APR'
              placeholder='0.000%'
            />
          </div>
          <div className={loanTermError ? 'input-error' : ''}>
            <label htmlFor='loanTerm'>
              {this.state.amortization === 'Fixed'
                ? 'Loan Term'
                : 'Years to First Adjustment'}
            </label>
            {loanTermError ? (
              <span className='input-error-message' role='alert'>
                {validatedInput.loanTerm.text}
              </span>
            ) : null}
            <input
              type='text'
              value={this.state.loanTerm}
              onChange={this.loanTermHandler}
              onBlur={this.loanTermValidator}
              id='loanTerm'
              placeholder='(1-50 years)'
            />
          </div>
          <input
            disabled={
              hasEmptyInputs || rateSetError || APRError || loanTermError
            }
            type='submit'
            value='Calculate rate spread'
          />
        </form>
        <div ref={this.refScrollTo}>
          {this.state.isFetching ? (
            <LoadingIcon className='LoadingInline' />
          ) : this.state.error ? (
            <Alert type='error' heading='Sorry, an error has occurred.'>
              {this.state.errorText ? (
                <p>{this.state.errorText}</p>
              ) : (
                <p>
                  Please try again later. If the problem persists, contact{' '}
                  <a href='mailto:hmdahelp@cfpb.gov'>HMDA Help</a>.
                </p>
              )}
            </Alert>
          ) : this.state.rateSpread ? (
            <Alert type='success' heading='Rate Spread'>
              <p>{this.state.rateSpread}</p>
            </Alert>
          ) : null}
        </div>
      </div>
    )
  }
}

export default Form
