# HMDA Frontend Projects

The HMDA Frontend monorepo hosts the public facing applications for the collection, publication, and navigation of millions of HMDA records per year.  This repository combines six, previously separate, React application repos in order to simplify component sharing, synchronize versioning of common dependencies, and improve rendering efficiency when navigating between apps. 

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
    + [HMDA Data Publication - Updates and Notes](#hmda-data-publication---updates-and-notes)
  * [Development](#development)
    + [Requirements](#requirements)
    + [Installation](#installation)
    + [Running Locally](#running-locally)
      - [Integrating with the Filing application](#integrating-with-the-filing-application)
        * [Create Institutions](#create-institutions)
        * [Bypass API Authentication](#bypass-api-authentication)
        * [Configure the UI](#configure-the-ui)
      - [Updating or Previewing Documentation](#updating-or-previewing-documentation)
    + [Running via Docker](#running-via-docker)
  + [Creating and editing Markdown](https://github.com/cfpb/hmda-frontend/wiki/Creating-and-updating-Markdown-files)
  * [Testing](#testing)
    + [Unit Tests](#unit-tests)
    + [End-to-End Testing](#end-to-end-testing)
    + [Running in TravisCI](#running-in-travisci)

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

### HMDA Data Publication - Updates and Notes
[Publication Updates and Notes](https://ffiec.cfpb.gov/data-publication/updates) provides a searchable change log of updates, releases, and corrections to published HMDA Data. Visit the [Updates and Notes FAQ](./src/data-publication/ChangeLog/README.md) for details.

<a href='./readme-files/hmda-data-publication-updates.png' alt='HMDA Data Publication'>
  <p align='center'>
    <img src='./readme-files/hmda-data-publication-updates.png' width='80%'  overflow='scroll'/>
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
Several components of the Frontend (ex. Filing, Data Browser) require a connection to the [HMDA Platform](https://github.com/cfpb/hmda-platform) in order to operate.  You can find instructions for the running the HMDA Platform locally [here](https://github.com/cfpb/hmda-platform#running-with-sbt).

HMDA Help requires a connection to the [HMDA Institutions API](https://github.com/cfpb/hmda-platform/tree/master/institutions-api) in order to operate.  You can find instructions for the running the HMDA Institutions API locally [in the README](https://github.com/cfpb/hmda-platform/blob/master/institutions-api/README.md).  Note that having the HMDA Platform running is a pre-requisite to starting the HDMA Institutions API. 

If your development does not require this integration, `yarn start` will run the development server, opening a browser window to http://localhost:3000.

#### Integrating with the Filing application
By default, the locally running [Frontend is configured to use the Filing API](https://github.com/cfpb/hmda-frontend/blob/master/package.json#L65) from the locally running Platform.  In order to go through the Filing process, there are a few elements that need to be completed first:
- Create Institutions (Platform)
- Bypass API authentication (Platform)
- Configure the UI (Frontend)

##### Create Institutions
Before you can submit a Filing you need to have an Institution created on the Platform for each year you want to test.  The following command will generate the required data for the default test Institution, for all currently available filing periods.  You need to have the HMDA Platform started before running this command:
```
yarn ci-data
```

To create data for an Institution other than the default `FRONTENDTESTBANK9999`, you can modify `cypress/ci/config/institutions.json` and rerun the above command.

This Institution loading needs to be done each time the HMDA Platform is restarted.

##### Bypass API Authentication
On the Platform, you will need to set an environment variable to prevent the API from requiring an authentication token for incoming requests.  If already running, you will need to restart the Platform.
```
export HMDA_RUNTIME_MODE=dev
```

##### Configure the UI

If you will be testing against an Institution that is not the default, you can configure this via a `REACT_APP_*` variable:
```
REACT_APP_LEIS=INSTITUTION1,INSTITUTION2
```

Second, you will need to bypass Frontend authentication.  This is most easily done by running the Frontend the way we do in a Continuous Integration environment:
```
yarn ci
```

To combine these configuration options
```
REACT_APP_LEIS=INSTITUTION1,INSTITUTION2 yarn ci
```

You can now visit the filing application at http://localhost:3000/filing.


#### Updating or Previewing Documentation
In production, Markdown files for documentation are served from Github and dynamically rendered in the application. This architecture makes it difficult to preview changes made locally. 

The script `yarn run dev-docs` will copy `/src/documentation/markdown` to `/public/markdown` for local preview. Files copied into the `/public/markdown` folder are ignored by git to avoid duplication.

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

![Cypress automated filing test](./readme-files/filing-2020-q1-cypress.gif)

### Running in TravisCI
[TravisCI](https://travis-ci.com/github/cfpb/hmda-frontend) is configured to automatically build and test each pull request to the Frontend repo.  This includes running the [HMDA Platform](https://github.com/cfpb/hmda-platform) within the TravisCI virtual machine to enable testing of the Filing application. All mandatory environment variables are configured in the [.travis.yml](https://github.com/cfpb/hmda-frontend/blob/master/.travis.yml) file.

Generation of video recordings is disabled by default using TravisCI environment variables.  
```
CONFIG="--config video=false"
```
In the event that you need to review video to help debug CI failures, update the environment configuration as follows.  This will save the video output to the [Cypress Dashboard](https://dashboard.cypress.io/projects/uk89dv/runs).
```
CONFIG="--config video=true"
RECORD="--record"
CYPRESS_RECORD_KEY=<Configured in TravisCI>
```
