# Insalling specific versions of required image dependencies 
ARG YARN_VERSION='1.22.19'
ARG NODE_VERSION='20.8.0'

# https://hub.docker.com/r/cypress/factory/
FROM cypress/factory

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install curl unzip -y
RUN apt-get clean autoclean
RUN apt-get autoremove --yes

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
RUN mkdir -p src/updates-notes/
COPY ../src/updates-notes/change-log-data.json src/updates-notes/

# Enable creation of screenshots/videos
RUN useradd -M -d /hmda-frontend -s /bin/bash hmda_cypress_user && \
  chown -R hmda_cypress_user:hmda_cypress_user /hmda-frontend/
USER hmda_cypress_user

# Install Cypress + supporting libraries
COPY cypress/package.json ./
RUN yarn install

# Cleanup vulnerabilities (as hmda_cypress_user)
RUN rm -rf /hmda-frontend/node_modules/public-encrypt/test/*
RUN rm -rf /hmda-frontend/.cache/Cypress/**/Cypress/resources/app/node_modules/public-encrypt/test/*
RUN rm -rf /hmda-frontend/.cache/Cypress/**/Cypress/resources/app/node_modules/http-proxy/test/*
RUN rm -rf /hmda-frontend/.cache/Cypress/**/Cypress/resources/app/node_modules/lazystream/secret

# ENTRYPOINT is used so the image/container doesn't automatically run
ENTRYPOINT [ "/bin/bash" ]