ARG NODE_VERSION='20.8.0'
ARG CYPRESS_VERSION='12.17.4'

FROM cypress/factory

RUN npm install -g npm@latest
RUN npm install yarn -g

# Resolves packageManager yarn issue in the package.json file
ENV SKIP_YARN_COREPACK_CHECK=0

# Using Yarn V4
RUN yarn set version 4.1.0

# Install necessary packages
RUN apt-get update && apt-get install -y curl unzip

# Set working directory
WORKDIR /hmda-frontend

# Prepare working directory
RUN mkdir -p cypress/downloads cypress/screenshots cypress/videos cypress/integration cypress/fixtures

# Copy Cypress support files
COPY cypress/support cypress/support
COPY cypress/plugins cypress/plugins
COPY cypress/docker-runner.sh cypress/
COPY ./cypress.config.js ./

# Copy HMDA helper functions
RUN mkdir -p src/common src/filing/api src/filing/utils src/tools/larft/config
COPY ../src/common/configUtils.js src/common/
COPY ../src/deriveConfig.js src/
COPY ../src/common/constants src/common/constants
COPY ../src/common/api/ src/common/api/
COPY ../src/filing/api src/filing/api
COPY ../src/filing/utils src/filing/utils
COPY ../src/tools/larft/config/ src/tools/larft/config/

# Copy package.json
COPY cypress/package.json ./

# Create an empty yarn.lock file
RUN touch yarn.lock

# Enable creation of screenshots/videos
RUN useradd -M -d /hmda-frontend -s /bin/bash hmda_cypress_user && \
  chown -R hmda_cypress_user:hmda_cypress_user /hmda-frontend/
USER hmda_cypress_user

# Install dependencies
RUN yarn install --mode=update-lockfile

# Set up the entrypoint
ENTRYPOINT ["yarn", "cypress", "run"]