# HMDA Frontend Projects

The HDMA Frontend monorepo hosts the public facing applications for the collection, publication, and navigation of millions of HMDA records per year.  This repository combines six, previously separate, React application repos in order to simplify component sharing, synchronize versioning of common dependencies, and improve rendering efficiency when navigating between apps. 

## Contents
- [HMDA Frontend Projects](#hmda-frontend-projects)
  * [Contents](#contents)
  * [Technical Overview](#technical-overview)
  * [Applications](#applications)
    + [HMDA Homepage](#hmda-homepage)
    + [HMDA Filing](#hmda-filing)
    + [HMDA Data Browser](#hmda-data-browser)
    + [HMDA Platform Tools](#hmda-platform-tools)
    + [HMDA Documentation](#hmda-documentation)
    + [HMDA Data Publication](#hmda-data-publication)
  * [Development](#development)
    + [Requirements](#requirements)
    + [Installation](#installation)
    + [Running Locally](#running-locally)
    + [Running via Docker](#running-via-docker)
  * [Testing](#testing)
    + [Unit Tests](#unit-tests)
    + [End-to-End Testing](#end-to-end-testing)

## Technical Overview
Each React application lives in it's own sub-directory of the `/src` folder, with shared assets and components housed in `/common`. All sub-applications are rendered as asynchronous components within an application shell `/App.jsx` that provides a common header.  This approach eliminates unneccesary reloading of the site-wide navigation, giving the separate apps a more connected feel.  [React Router](https://reacttraining.com/react-router/) is used for client side routing with [React Redux](https://redux.js.org/) integrated for state management of the more complex apps, such as Filing.  [Unit tests](#unit-tests) are developed using Enzyme and [end-to-end](#end-to-end-testing) testing performed with Cypress. Dependencies are managed with [yarn](https://classic.yarnpkg.com/en/).

## Applications

### HMDA Homepage
[HMDA Homepage](https://ffiec.cfpb.gov/) is a single-page app providing easy access to the HMDA applications, tools, data products, and documentation.

<a href='./readme-files/hmda-homepage.png' alt='HMDA Homepage'>
  <p align='center'>
    <img src='./readme-files/hmda-homepage.png' width='80%'  overflow='scroll'/>
  </p>
</a>

### HMDA Filing
The [HMDA Filing Platform UI](https://ffiec.cfpb.gov/filing/) allows lending institutions to submit HMDA records, resolve errors, verify edits, review submission status and history, and sign submissions.

<a href='./readme-files/hmda-filing.png' alt='HMDA Filing Overview'>
  <p align='center'>
    <img src='./readme-files/hmda-filing.png' width='80%'  overflow='scroll'/>
  </p>
</a>


### HMDA Data Browser
The [HMDA Data Browser](https://ffiec.cfpb.gov/data-browser/) enables users to easily filter and download aggregated HMDA datasets.  

<a href='./readme-files/hmda-data-browser.gif' alt='HMDA Data Browser'>
  <p align='center'>
    <img src='./readme-files/hmda-data-browser.gif' width='80%'  overflow='scroll'/>
  </p>
</a>

### HMDA Platform Tools
The [HMDA Platform Tools](https://ffiec.cfpb.gov/tools/) assist filers in the preparation of submission data, including calculation of Rate Spread, generation and validation of Check Digits, as well as submission file generation and format verification.

<a href='./readme-files/hmda-tools.png' alt='HMDA Platform Tools'>
  <p align='center'>
    <img src='./readme-files/hmda-tools.png' width='80%'  overflow='scroll'/>
  </p>
</a>

### HMDA Documentation
The [HMDA Documentation](https://ffiec.cfpb.gov/documentation/) site provides product FAQs, detailed Filing instructions, data publication schema and usage guides, as well as direction for using the HMDA Tools. Documentation content is hosted as easily editable Markdown files, loaded on-demand with the Fetch API, and rendered dynamically using the markdown-to-jsx library. This allows updates to be pushed to Production without a project redeployment. 

<a href='./readme-files/hmda-documentation.png' alt='HMDA Documentation'>
  <p align='center'>
    <img src='./readme-files/hmda-documentation.png' width='80%'  overflow='scroll'/>
  </p>
</a>

### HMDA Data Publication
[HMDA Data Publication](https://ffiec.cfpb.gov/data-publication/) provides datasets and reports of HMDA data collected in or after 2017 which, combined with [Census](https://www.ffiec.gov/censusproducts.htm) demographic data, can be used for data analysis purposes.

<a href='./readme-files/hmda-data-publication.png' alt='HMDA Data Publication'>
  <p align='center'>
    <img src='./readme-files/hmda-data-publication.png' width='80%'  overflow='scroll'/>
  </p>
</a>

## Development
### Requirements
 - Node >= v12.4.1 
 - Yarn

### Installation
  - Clone repo
  - Run `yarn` from repo root to install depencencies

### Running Locally

```
yarn start
```

`yarn start` will run the application in development mode, opening a browser window to http://localhost:3000.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

### Running via Docker

To see the application running in a container you can run:

```
docker build -t hmda/hmda-frontend .
docker run -p 8080:8080 hmda/hmda-frontend
```

To build using docker-compose:
```
docker-compose build
```

## Testing
### Unit Tests
```
yarn test
```

[Enzyme](https://enzymejs.github.io/enzyme/) enables isolated testing of React components. Unit tests providing verification of feature implementation while also serving as suite of regression tests.  

### End-to-End Testing
```
yarn run cypress run
```
[Cypress](https://www.cypress.io/) is used to perform end-to-end testing of the filing application, tools, data publication products, and data browser.  It mimicks a user's interaction with the site and allows for rapid, automated system validation of project deployments. 

![Cypress automated filing test](./readme-files/filing-2019-cypress.gif)
