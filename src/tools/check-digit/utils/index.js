export const isUliValid = uli => {
  let errors = []

  if (uli.length === 0) {
    errors.push('Please enter a valid ULI to validate.')
  }

  // a ULI is alphanumeric
  if (!!uli.match(/[^a-zA-Z0-9]/)) {
    errors.push('A valid ULI can only contain alphanumeric characters.')
  }

  /*
    LEI alone is 20 characters
    Check digit is 2 characters
    uli = LEI + check digit from the institution
    so the uli.length has to be >= 22
    */
  if (uli.length > 0 && uli.length < 23) {
    const characters = uli.length === 1 ? 'character' : 'characters'
    errors.push(
      'A valid ULI has a minimum of 23 characters. You have entered ' +
        uli.length +
        ' ' +
        characters +
        '.'
    )
  }

  /*
    maxlength for a ULI is 45 characters
    see page 20 of
    https://www.consumerfinance.gov/data-research/hmda/static/for-filers/2018/2018-HMDA-FIG.pdf
    */
  if (uli.length > 45) {
    errors.push(
      'A valid LEI and Loan/Application ID has a maximum of 45 characters. You have entered ' +
        uli.length +
        ' characters.'
    )
  }

  return errors
}

export const isLoanIdValid = loanId => {
  let errors = []

  if (loanId.length === 0) {
    errors.push(
      'Please enter a valid LEI and Loan/Application ID to generate the check digit.'
    )
  }

  // a LEI and Loan/Application ID is alphanumeric
  if (!!loanId.match(/[^a-zA-Z0-9]/)) {
    errors.push(
      'A valid LEI and Loan/Application ID can only contain alphanumeric characters.'
    )
  }

  /*
    LEI alone is 20 characters
    loanId = LEI + loan/application id from the institution
    so the loadId.length has to be >= 21
    */
  if (loanId.length > 0 && loanId.length < 21) {
    const characters = loanId.length === 1 ? 'character' : 'characters'
    errors.push(
      'A valid LEI and Loan/Application ID has a minimum of 21 characters. You have entered ' +
        loanId.length +
        ' ' +
        characters +
        '.'
    )
  }

  /*
    maxlength for a ULI is 45 characters
    a loanId is part of the ULI
    and removing the 2 characters for check digit
    the loanID.length !> 43
    */
  if (loanId.length > 43) {
    errors.push(
      'A valid LEI and Loan/Application ID has a maximum of 43 characters. You have entered ' +
        loanId.length +
        ' characters.'
    )
  }

  return errors
}
