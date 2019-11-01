# HMDA Frontend Projects

Collection of frontend code and configuration for the following projects:
 - HMDA Platform UI
 - HMDA Data Browser
 - HMDA Platform Tools
 - HMDA Documentation
 - HMDA Homepage
 - HMDA Data Publication

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
