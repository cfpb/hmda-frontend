// ***********************************************************
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import '@testing-library/cypress/add-commands'
import 'cypress-keycloak';

function urlExists(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) resolve({ url, status: xhr.status === 200 })
    }

    xhr.open('HEAD', url)
    xhr.send()
  })
}

Cypress.Commands.add("hasValidHref", { prevSubject: true }, anchor => {
  return urlExists(anchor.attr("href"))
})