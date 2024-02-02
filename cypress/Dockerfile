# ARG YARN_VERSION='1.22.19'
# ARG NODE_VERSION='20.8.0'
ARG NODE_VERSION='21.6.1'
# ARG CYPRESS_VERSION='13.3.1'

# https://hub.docker.com/r/cypress/factory/
FROM cypress/factory

# Update packages
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install curl unzip -y 
# RUN apt-get install vim -y 
RUN apt-get remove samba-libs -y
RUN apt-get clean autoclean 
RUN apt-get autoremove -y

# Update core packages via npm 
RUN npm install corepack@latest -g
RUN npm install npm@latest -g

# Prepare working directory
RUN mkdir -p hmda-frontend/cypress/downloads hmda-frontend/cypress/screenshots hmda-frontend/cypress/videos hmda-frontend/cypress/integration hmda-frontend/cypress/fixtures
WORKDIR /hmda-frontend/

# Copy Cypress support files
COPY cypress/support cypress/support
COPY cypress/plugins cypress/plugins
COPY cypress/docker-runner.sh cypress/
COPY ./cypress.config.js ./

# Copy HMDA helper functions
RUN mkdir -p src/common
COPY ../src/common/configUtils.js src/common/
COPY ../src/deriveConfig.js src/
COPY ../src/common/constants src/common/constants
COPY ../src/common/api/ src/common/
RUN mkdir -p src/filing/api/
COPY ../src/filing/api src/filing/api
RUN mkdir -p src/filing/utils/
COPY ../src/filing/utils src/filing/utils
RUN mkdir -p src/tools/larft/config/
COPY ../src/tools/larft/config/ src/tools/larft/config/

# Enable creation of screenshots/videos
RUN useradd -M -d /hmda-frontend -s /bin/bash hmda_cypress_user && \
chown -R hmda_cypress_user:hmda_cypress_user /hmda-frontend/
USER hmda_cypress_user
# USER root

# Uninstall prebuilt cypress if exists
# RUN npm uninstall cypress -g
# RUN rm -rf /root/.cache/Cypress/*

# Install Cypress + supporting libraries
COPY cypress/package.json ./
RUN yarn install

# Download fixtures
RUN mkdir -p cypress/downloads
RUN curl https://s3.amazonaws.com/cfpb-hmda-public/prod/cypress/fixtures.zip > ./cypress/downloads/fixtures.zip
RUN unzip -o cypress/downloads/fixtures.zip -d cypress/
RUN curl https://s3.amazonaws.com/cfpb-hmda-public/prod/cypress/e2e.zip > ./cypress/downloads/e2e.zip 
RUN unzip -o cypress/downloads/e2e.zip -d cypress/  
RUN mkdir -p cypress/e2e/docusaurus
RUN curl https://raw.githubusercontent.com/cfpb/hmda-combined-documentation/main/cypress/e2e/documentation.cy.js > cypress/e2e/docusaurus/documentation.cy.js

## Remove specific modules with critical CVEs from cypress cache
RUN rm -rf /root/.cache/Cypress/13.6.4/Cypress/resources/app/node_modules/loader-utils/
RUN rm -rf /root/.cache/Cypress/13.6.4/Cypress/resources/app/node_modules/underscore/
RUN rm -rf /root/.cache/Cypress/13.6.4/Cypress/resources/app/node_modules/mocha-7.0.1/node_modules/minimist/
RUN rm -rf /root/.cache/Cypress/13.6.4/Cypress/resources/app/node_modules/flat/
## find / -name execa > execalist
## for f1 in $(cat execalist) ; do grep version $f1/package.json ; done
RUN rm -rf /root/.cache/Cypress/13.6.4/Cypress/resources/app/node_modules/@sindresorhus/df/node_modules/execa
RUN rm -rf /root/.cache/Cypress/13.6.4/Cypress/resources/app/node_modules/execa
RUN rm -rf /root/.cache/Cypress/13.6.4/Cypress/resources/app/node_modules/run-applescript/node_modules/execa

## Addtional cache location for reference
# RUN rm -rf .cache/yarn/v6/*
# RUN rm -rf /usr/local/share/.cache/yarn/v6/
# RUN yarn cypress cache prune (do not run)

# Ignore punnycode warning
# https://github.com/yarnpkg/yarn/issues/9005

ENTRYPOINT ["/bin/bash"]
