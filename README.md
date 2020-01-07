# HMDA Frontend Projects

Collection of frontend code and configuration for the following projects:
 - [HMDA Homepage](https://ffiec.cfpb.gov/)
 - [HMDA Filing Platform UI](https://ffiec.cfpb.gov/filing/)
 - [HMDA Data Browser](https://ffiec.cfpb.gov/data-browser/)
 - [HMDA Platform Tools](https://ffiec.cfpb.gov/tools/)
 - [HMDA Documentation](https://ffiec.cfpb.gov/documentation/)
 - [HMDA Data Publication](https://ffiec.cfpb.gov/data-publication/)

## Dependencies
 - node.js
 - yarn

## Install
  - Clone repo
  - Run `yarn` from repo root

## Usage

For local development you can run:

```
yarn start
```

`yarn start` will run the application in development mode, opening a browser window to http://localhost:3000.

The page will automatically reload if you make changes to the code.
You will see the build errors and lint warnings in the console.

### Docker

To see the application running in a container you can run:

```
docker run -p 80:80 hmda/hmda-frontend
```
