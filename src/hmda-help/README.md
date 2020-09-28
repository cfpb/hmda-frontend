# HMDA Help

* [Overview](#overview)
* [Building and viewing](#building-and-viewing)
  + [1. package.json](#1-packagejson)
  + [2. keycloak.json](#2-keycloakjson)
  + [Start the development server](#start-the-development-server)
  + [Blank screen](#blank-screen)
* [Getting involved](#getting-involved)
* [Open source licensing info](#open-source-licensing-info)

## Overview
The HMDA Help application allows for management (create, update, delete) of HMDA institutions.

## Building and viewing

Due to the back-end API and authentication requirements there are 2 files changes required before building the UI:

### 1. package.json

Update [`package.json`](package.json) to add a `proxy`. This should be set to the development environment. For example:

```json
{
  "homepage": "/hmda-help",
  "proxy": "https://[devenv].cfpb.gov"
}
```

This will proxy all API requests to the `[devenv].cfpb.gov` environment. See the [CRA "Proxying API Requests in Development" documentation](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development) for more details.

### 2. keycloak.json

Update the [`"auth-server-url": "/auth"`](https://github.com/cfpb/hmda-help/blob/2a36dd2ce3e65d2e5fd42e3c849566aa30359596/public/keycloak.json#L3) property of the [`keycloak.json`](public/keycloak.json) file to use the `[devenv].cfpb.gov` environment.

For example:

```json
{
  "realm": "hmda2",
  "auth-server-url": "https://[devenv].cfpb.gov/auth",
  "ssl-required": "all",
  "resource": "hmda2-api",
  "public-client": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0
}
```

This will allow authentication using Keycloak.

### Start the development server

Now you can run `yarn start` to begin using the UI in development mode. See the [available scripts](https://facebook.github.io/create-react-app/docs/available-scripts) in the CRA documentation for more details.

### Blank screen
If you don't have your local keycloak/proxy setup correct, you will get a blank white screen when loading the app (no UI errors, no console errors, no network errors).  Previously, the app would go through a visible, rapid cycle of attempting to connect to the Auth server before eventually erroring out. 
