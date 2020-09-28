const _hasContent = inputValue => {
  return inputValue.length > 0 || Number.isInteger(inputValue)
}

const _isCorrectLength = (number, inputValue) => {
  return inputValue.length === number
}

const _regexMatch = (pattern, inputValue) => {
  return inputValue.search(pattern)
}

const validateInput = (validation, inputValue) => {
  let message = null

  const validationLength = validation.length

  for (let i = 0; i < validationLength; i++) {
    if (validation[i].type === 'required') {
      if (!_hasContent(inputValue)) {
        message = 'Required field.'
        break
      }
    }

    if (validation[i].type === 'length') {
      if (!_isCorrectLength(validation[i].value, inputValue)) {
        message = `Must have ${validation[i].value} characters.`
        break
      }
    }

    if (validation[i].type === 'regex') {
      if (_regexMatch(validation[i].value, inputValue) === -1) {
        message = validation[i].message
        break
      }
    }
  }

  return message
}

const validateAll = (inputs, state) => {
  let error = false
  const inputLength = inputs.length

  for (let i = 0; i < inputLength; i++) {
    if (inputs[i].validation) {
      const currentValue = state[inputs[i].id]
      const currentValidation = inputs[i].validation
      const validationLength = currentValidation.length

      for (let n = 0; n < validationLength; n++) {
        if (currentValidation[n].type === 'required') {
          if (!_hasContent(currentValue)) {
            error = true
            break
          }
        }

        if (currentValidation[n].type === 'length') {
          if (!_isCorrectLength(currentValidation[n].value, currentValue)) {
            error = true
            break
          }
        }

        if (currentValidation[n].type === 'regex') {
          if (_regexMatch(currentValidation[n].value, currentValue) === -1) {
            error = true
            break
          }
        }
      }
    }
  }

  return error
}

export { validateInput, validateAll }
